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

/**
 * Sway metadata middleware.
 *
 * @module sway-connect/metadata
 */

var SwaggerApi = require('sway/lib/types/api');

/**
 * The Swagger API object provided by Sway.
 *
 * @external SwaggerApi
 *
 * @see {@link https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..SwaggerApi}
 */

/**
 * The Path object provided by Sway.
 *
 * @external Path
 *
 * @see {@link https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..Path}
 */

/**
 * The Operation object provided by Sway.
 *
 * @external Operation
 *
 * @see {@link https://github.com/apigee-127/sway/blob/master/docs/API.md#module_Sway..Operation}
 */

/**
 * Container for the pertinent Sway resources set at `req.sway`.
 *
 * @typedef {object} SwayContainer
 *
 * @property {external:SwaggerApi} api - The Swagger API object provided to the middleware initializer
 * @property {external:Path} path - The corresponding Path object provided by Sway
 * @property {external:Operation} operation - The corresponding Operation object provided by Sway
 */

/**
 * Middleware providing the base functionality for Swagger integrations.  This middleware will take a request and for
 * requests matching a path described in your Swagger document, `req.sway` will be set.  The structure for `req.sway`
 * is described at {@link SwayContainer}.
 *
 * @param {external:SwaggerApi} api - The SwaggerApi object created via `Sway#create`
 *
 * @returns {Function} The request handler
 */
module.exports = function (api) {
  // Validate the inputs
  if (typeof api === 'undefined') {
    throw new TypeError('api is required');
  } else if (!(api instanceof SwaggerApi)) {
    throw new TypeError('api must be a SwaggerApi object');
  }

  return function metadataMiddleware (req, res, next) {
    var path = api.getPath(req);

    // This is a Swagger request
    if (typeof path !== 'undefined') {
      req.sway = {
        api: api, // The SwaggerApi object
        path: path, // The Path object
        operation: path.getOperation(req.method) // The Operation object (if available)
      };
    }

    // Send the request downstream
    next();
  };
};
