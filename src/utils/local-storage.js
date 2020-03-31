const STORAGE_KEY = 'google-analytics'

/**
 *
 * @param {string} json
 * @return {Object}
 */
function parseJson(json) {
	return JSON.parse(json) || {}
}

/**
 *
 * @param {string} key
 * @param {any} value
 */
export function setItem(key, value) {
	const json = localStorage.getItem(STORAGE_KEY)
	const values = parseJson(json)

	const nextValues = {
		...values,
		[key]: value,
	}

	const nextJson = JSON.stringify(nextValues)

	localStorage.setItem(STORAGE_KEY, nextJson)

	return getItem(key)
}

/**
 *
 * @param {string} key
 * @return {any}
 */
export function getItem(key) {
	const json = localStorage.getItem(STORAGE_KEY)
	const values = parseJson(json)

	return values[key]
}