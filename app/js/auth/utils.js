
import log4js from 'log4js'
import { isLaterVersion } from 'blockstack'

const logger = log4js.getLogger(__filename)

const VALID_SCOPES = {
  store_write: true,
  email: true,
  publish_data: true
}

/**
 * @param {Object} requestPayload 
 * @returns {boolean}
 */
export function appRequestSupportsDirectHub(requestPayload) {
  let version = '0'
  let supportsHubUrl = false
  if (requestPayload.hasOwnProperty('version')) {
    version = requestPayload.version
  }
  if (requestPayload.hasOwnProperty('supports_hub_url')) {
    supportsHubUrl = requestPayload.supports_hub_url
  }

  return isLaterVersion(version, '1.2.0') || !!supportsHubUrl
}

/**
 * @param {string[]} scopes
 * @returns {boolean}
 */
export function validateScopes(scopes) {
  logger.info('validateScopes')

  if (!scopes) {
    logger.error('validateScopes: no scopes provided')
    return false
  }

  if (scopes.length === 0) {
    return true
  }

  let valid = true
  for (let i = 0; i < scopes.length; i++) {
    const scope = scopes[i]
    const isCollectionScope = scope.indexOf('collection.') === 0
    if (!isCollectionScope && VALID_SCOPES[scope] !== true) {
      valid = false
    }
  }
  return valid
}
