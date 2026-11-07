import assert from 'node:assert/strict';
import { link, mkdtemp, mkdir, readFile, symlink, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { once } from 'node:events';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import fs from 'fs-extra';
import AdmZip from 'adm-zip';
import { downloadAndExtract, extractBundle } from '../src/services/extractor.js';

function archive(name, content) {
  const zip = new AdmZip();
  zip.addFile('placeholder.txt', Buffer.from(content));
  zip.getEntries()[0].entryName = name;
  return zip.toBuffer();
}

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'apm-extract-'));
  t.after(() => fs.remove(root));
  const project = path.join(root, 'project');
  const outside = path.join(root, 'outside');
  await mkdir(project);
  await mkdir(outside);
  return { project, outside };
}

test('extracts nested files in a normal project', async (t) => {
  const { project } = await fixture(t);
  const written = await extractBundle(archive('nested/file.txt', 'hello'), project);
  assert.deepEqual(written, ['nested/file.txt']);
  assert.equal(await readFile(path.join(project, 'nested/file.txt'), 'utf8'), 'hello');
});

test('keeps files inside the project when an existing directory is a link', async (t) => {
  const { project, outside } = await fixture(t);
  await symlink(outside, path.join(project, 'nested'));
  await assert.rejects(extractBundle(archive('nested/file.txt', 'changed'), project));
  assert.equal(await fs.pathExists(path.join(outside, 'file.txt')), false);
});

test('does not overwrite an existing linked file', async (t) => {
  const { project, outside } = await fixture(t);
  const target = path.join(outside, 'original.txt');
  await writeFile(target, 'original');
  await symlink(target, path.join(project, 'file.txt'));
  await assert.rejects(extractBundle(archive('file.txt', 'changed'), project));
  assert.equal(await readFile(target, 'utf8'), 'original');
});

test('does not overwrite a multiply linked file', async (t) => {
  const { project, outside } = await fixture(t);
  const target = path.join(outside, 'original.txt');
  await writeFile(target, 'original');
  await link(target, path.join(project, 'file.txt'));
  await assert.rejects(extractBundle(archive('file.txt', 'changed'), project));
  assert.equal(await readFile(target, 'utf8'), 'original');
});

test('rejects a linked destination root', async (t) => {
  const { project, outside } = await fixture(t);
  const linkedRoot = path.join(project, 'linked');
  await symlink(outside, linkedRoot);
  await assert.rejects(extractBundle(archive('file.txt', 'changed'), linkedRoot));
  assert.equal(await fs.pathExists(path.join(outside, 'file.txt')), false);
});

test('updates an ordinary existing file', async (t) => {
  const { project } = await fixture(t);
  await writeFile(path.join(project, 'file.txt'), 'old');
  assert.deepEqual(await extractBundle(archive('file.txt', 'new'), project), ['file.txt']);
  assert.equal(await readFile(path.join(project, 'file.txt'), 'utf8'), 'new');
});

test('downloads a redirected bundle and extracts it', async (t) => {
  const { project } = await fixture(t);
  const bundle = archive('nested/file.txt', 'downloaded');
  const server = createServer((request, response) => {
    if (request.url === '/redirect') {
      response.writeHead(302, { Location: '/bundle' }).end();
    } else {
      response.writeHead(200, { 'Content-Type': 'application/zip' }).end(bundle);
    }
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => server.close());
  const oldToken = process.env.GITHUB_TOKEN;
  process.env.GITHUB_TOKEN = 'fixture-token';
  try {
    const url = `http://127.0.0.1:${server.address().port}/redirect`;
    assert.deepEqual(await downloadAndExtract(url, project), ['nested/file.txt']);
    assert.equal(await readFile(path.join(project, 'nested/file.txt'), 'utf8'), 'downloaded');
  } finally {
    if (oldToken === undefined) delete process.env.GITHUB_TOKEN;
    else process.env.GITHUB_TOKEN = oldToken;
  }
});

test('skips paths above or at the project root', async (t) => {
  const { project } = await fixture(t);
  const above = await extractBundle(archive('../outside.txt', 'changed'), project);
  const atRoot = await extractBundle(archive('nested/..', 'changed'), project);
  assert.deepEqual(above, []);
  assert.deepEqual(atRoot, []);
  assert.equal(await fs.pathExists(path.join(project, '..', 'outside.txt')), false);
});
