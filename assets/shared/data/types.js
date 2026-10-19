/**
 * @typedef {Object} Service
 * @property {string} slug
 * @property {string} category        id from categories.js
 * @property {string} name
 * @property {string} priceDisplay    Human-readable indicative range.
 * @property {number} minPrice        INR, used for filtering and sorting.
 * @property {number} maxPrice
 * @property {string} shortDesc
 * @property {string} bestFor
 * @property {string[]} includes
 * @property {string[]} notIncluded
 * @property {string} timeline
 * @property {string[]} addons
 * @property {string} platform
 *
 * @typedef {Object} Goal
 * @property {string} key
 * @property {string} question        What a non-technical visitor would say.
 * @property {string} hint
 * @property {string} title
 * @property {string} badge
 * @property {string} priceEstimate
 * @property {string} summary
 * @property {string} timeline
 * @property {string[]} serviceIds    First entry is the primary match.
 * @property {string} category
 */
export {};
