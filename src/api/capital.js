import { setItem, getItem } from '../utils/local-storage'

const CAPITAL_KEY = 'capital'

export function getCapital() {
	return getItem(CAPITAL_KEY) || 0
}

export function updateCapital(value) {
	return setItem(CAPITAL_KEY, value)
}