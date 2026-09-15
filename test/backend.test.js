const test = require('node:test');
const assert = require('node:assert/strict');
const { startServer } = require('../server');

let server;

test.before(async () => {
  server = await startServer(0);
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('health endpoint reports service status', async () => {
  const res = await fetch(`http://127.0.0.1:${server.address().port}/api/health`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.service, 'med-backend');
  assert.ok(body.productsCount >= 4);
});

test('featured products endpoint returns curated items', async () => {
  const res = await fetch(`http://127.0.0.1:${server.address().port}/api/featured`);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.ok(Array.isArray(body));
  assert.ok(body.length >= 2);
  assert.ok(body[0].name);
});
