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
 * Delete a workflow.
 * <br/> See Also: {@link https://opensearch.org/docs/latest/automating-configurations/api/delete-workflow/ - flow_framework.delete}
 *
 * @memberOf API-Flow-Framework
 *
 * @param {object} params
 * @param {boolean} [params.clear_status=false] - Delete the workflow state (without deprovisioning resources) after deleting the template. OpenSearch deletes the workflow state only if the provisioning status is not IN_PROGRESS. Default is false.
 * @param {string} params.workflow_id 
 *
 * @param {TransportRequestOptions} [options] - Options for {@link Transport#request}
 * @param {function} [callback] - Callback that handles errors and response
 *
 * @returns {{abort: function(), then: function(), catch: function()}|Promise<never>|*}
 */
function deleteFunc(params, options, callback) {
  [params, options, callback] = normalizeArguments(params, options, callback);
  if (params.workflow_id == null) return handleMissingParam('workflow_id', this, callback);

  let { body, workflow_id, ...querystring } = params;
  workflow_id = parsePathParam(workflow_id);

  const path = '/_plugins/_flow_framework/workflow/' + workflow_id;
  const method = 'DELETE';
  body = body || '';

  return this.transport.request({ method, path, querystring, body }, options, callback);
}

module.exports = deleteFunc;
