/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

'use strict';

// We are using self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const { test } = require('tap');
const {
  Client,
  buildProxy: { createProxy, createSecureProxy, createServer, createSecureServer },
} = require('../utils');

test('http-http proxy support', async (t) => {
  const server = await createServer();
  const proxy = await createProxy();
  server.on('request', (req, res) => {
    t.equal(req.url, '/_cluster/health/');
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ hello: 'world' }));
  });

  const client = new Client({
    node: `http://${server.address().address}:${server.address().port}`,
    proxy: `http://${proxy.address().address}:${proxy.address().port}`,
  });

  const response = await client.cluster.health();
  t.same(response.body, { hello: 'world' });

  server.close();
  proxy.close();
});

test('http-https proxy support', async (t) => {
  const server = await createSecureServer();
  const proxy = await createProxy();
  server.on('request', (req, res) => {
    t.equal(req.url, '/_cluster/health/');
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ hello: 'world' }));
  });

  const client = new Client({
    node: `https://${server.address().address}:${server.address().port}`,
    proxy: `http://${proxy.address().address}:${proxy.address().port}`,
  });

  const response = await client.cluster.health();
  t.same(response.body, { hello: 'world' });

  server.close();
  proxy.close();
});

test('https-http proxy support', async (t) => {
  const server = await createServer();
  const proxy = await createSecureProxy();
  server.on('request', (req, res) => {
    t.equal(req.url, '/_cluster/health/');
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ hello: 'world' }));
  });

  const client = new Client({
    node: `http://${server.address().address}:${server.address().port}`,
    proxy: `https://${proxy.address().address}:${proxy.address().port}`,
  });

  const response = await client.cluster.health();
  t.same(response.body, { hello: 'world' });

  server.close();
  proxy.close();
});

test('https-https proxy support', async (t) => {
  const server = await createSecureServer();
  const proxy = await createSecureProxy();
  server.on('request', (req, res) => {
    t.equal(req.url, '/_cluster/health/');
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ hello: 'world' }));
  });

  const client = new Client({
    node: `https://${server.address().address}:${server.address().port}`,
    proxy: `https://${proxy.address().address}:${proxy.address().port}`,
  });

  const response = await client.cluster.health();
  t.same(response.body, { hello: 'world' });

  server.close();
  proxy.close();
});

test('http basic authentication', async (t) => {
  const server = await createServer();
  const proxy = await createProxy();
  server.on('request', (req, res) => {
    t.equal(req.url, '/_cluster/health/');
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ hello: 'world' }));
  });

  proxy.authenticate = function (req, fn) {
    fn(
      null,
      req.headers['proxy-authorization'] ===
        `Basic ${Buffer.from('hello:world').toString('base64')}`
    );
  };

  const client = new Client({
    node: `http://${server.address().address}:${server.address().port}`,
    proxy: `http://hello:world@${proxy.address().address}:${proxy.address().port}`,
  });

  const response = await client.cluster.health();
  t.same(response.body, { hello: 'world' });

  server.close();
  proxy.close();
});

test('https basic authentication', async (t) => {
  const server = await createSecureServer();
  const proxy = await createProxy();
  server.on('request', (req, res) => {
    t.equal(req.url, '/_cluster/health/');
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify({ hello: 'world' }));
  });

  proxy.authenticate = function (req, fn) {
    fn(
      null,
      req.headers['proxy-authorization'] ===
        `Basic ${Buffer.from('hello:world').toString('base64')}`
    );
  };

  const client = new Client({
    node: `https://${server.address().address}:${server.address().port}`,
    proxy: `http://hello:world@${proxy.address().address}:${proxy.address().port}`,
  });

  const response = await client.cluster.health();
  t.same(response.body, { hello: 'world' });

  server.close();
  proxy.close();
});
