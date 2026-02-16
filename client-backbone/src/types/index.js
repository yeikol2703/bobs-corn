/**
 * @typedef {'idle'|'loading'|'success'|'rateLimited'|'error'} BuyStatus
 */

/**
 * @typedef {Object} BuyCornSuccessData
 * @property {string} corn
 * @property {string} message
 */

/**
 * @typedef {Object} BuyCornErrorData
 * @property {string} error
 * @property {string} [message]
 * @property {number} [retryAfterSeconds]
 */

/**
 * @typedef {Object} BuyCornSuccessResult
 * @property {true} success
 * @property {BuyCornSuccessData} data
 */

/**
 * @typedef {Object} BuyCornErrorResult
 * @property {false} success
 * @property {string} error
 * @property {number} [retryAfterSeconds]
 */

/**
 * @typedef {BuyCornSuccessResult|BuyCornErrorResult} BuyCornResult
 */
