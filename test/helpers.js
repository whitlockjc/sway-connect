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

var connect = require('connect');

/**
 * Creates a connect server.
 *
 * @param {function[]} middlewares - The middlewares to register, in the provided order
 * @param {object} [options] - The server options
 *
 * @returns {object} The connect server
 */
module.exports.createServer = function (middlewares, options) {
  var app = connect();

  // Options is optional so handle this scenario
  if (typeof options === 'undefined') {
    options = {};
  }

  // Register each middleware
  middlewares.forEach(function (middleware) {
    app.use(middleware);
  });

  // Register an error handler
  app.use(function (err, req, res, next) {
    if (err) {
      if (res.statusCode < 400) {
        res.statusCode = 500;
      }

      // Useful for debugging
      // console.log(err);
      // console.log(err.stack);

      // if (err.results) {
      //   console.log(JSON.stringify(err.results, null, 2));
      // }

      res.end(err.message);

      return next();
    } else {
      return next();
    }
  });

  return app;
};
