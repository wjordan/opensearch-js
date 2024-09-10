/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 */

/*
 * This file was generated from the OpenSearch API Spec. Do NOT edit it
 * manually. If you want to make changes, either update the spec or
 * modify the API generator.
 */

'use strict';

const { normalizeArguments, parsePathParam, handleMissingParam } = require('../utils');

/**
 * Retrieves one role mapping.
 * <br/> See Also: {@link https://opensearch.org/docs/latest/security/access-control/api/#get-role-mapping - security.get_role_mapping}
 *
 * @memberOf API-Security
 *
 * @param {object} params
 * @param {string} params.role 
 *
 * @param {TransportRequestOptions} [options] - Options for {@link Transport#request}
 * @param {function} [callback] - Callback that handles errors and response
 *
 * @returns {{abort: function(), then: function(), catch: function()}|Promise<never>|*}
 */
function getRoleMappingFunc(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);
  if (params.role == null) return handleMissingParam('role', this, callback);

  let { body, role, ...querystring } = params;
  role = parsePathParam(role);

  const path = '/_plugins/_security/api/rolesmapping/' + role;
  const method = 'GET';
  body = body || '';

  return this.transport.request({ method, path, querystring, body }, options, callback);
}

module.exports = getRoleMappingFunc;
