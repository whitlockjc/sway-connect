/* eslint-env mocha */

/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var assert = require('assert');
var helpers = require('./helpers');
var middleware = require('../lib/matcher');
var request = require('supertest');
var Sway = require('sway');

describe('Request Matcher Middleware', function () {
  var swaggerApi;

  before(function (done) {
    Sway.create({
      definition: 'https://rawgit.com/apigee-127/sway/master/test/browser/documents/2.0/swagger.yaml'
    })
      .then(function (api) {
        swaggerApi = api;
      })
      .then(done, done);
  });

  describe('initialization', function () {
    describe('invalid values', function () {
      it('api is undefined', function () {
        try {
          middleware();

          assert.fail('The line above should had failed');
        } catch (err) {
          assert.equal(err.message, 'api is required');
        }
      });

      it('api is the wrong type', function () {
        try {
          middleware({});

          assert.fail('The line above should had failed');
        } catch (err) {
          assert.equal(err.message, 'api must be a SwaggerApi object');
        }
      });
    });

    it('valid values', function () {
      assert.ok(typeof middleware(swaggerApi) === 'function');
    });
  });

  describe('runtime', function () {
    var path = '/pet/findByStatus';
    var app;
    var expectedPath;
    var expectedOperation;

    before(function () {
      expectedPath = swaggerApi.getPath(path);
      expectedOperation = expectedPath.getOperation('GET');
      app = helpers.createServer([middleware(swaggerApi), function (req, res) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
          api: req.sway ? req.sway.api === swaggerApi : false,
          path: req.sway ? req.sway.path === expectedPath : false,
          operation: req.sway ? req.sway.operation === expectedOperation : false
        }));
      }]);
    });
    
    it('non-Swagger path', function (done) {
      request(app)
        .get('/v1' + path)
        .expect(200, {
          api: false,
          path: false,
          operation: false
        }, done);
    });

    it('Swagger path but no operation', function (done) {
      request(app)
        .post('/v2' + path)
        .expect(200, {
          api: true,
          path: true,
          operation: false
        }, done);
    });

    it('Swagger path and operation', function (done) {
      request(app)
        .get('/v2' + path)
        .expect(200, {
          api: true,
          path: true,
          operation: true
        }, done);
    });
  });
});
