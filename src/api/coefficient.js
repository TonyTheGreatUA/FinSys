import { setItem, getItem } from '../utils/local-storage'

const COEFFICIENT_KEY = 'coefficient'

export function updateCoefficient(value) {
  return setItem(COEFFICIENT_KEY, value)
}

export function getCoefficient() {
	return getItem(COEFFICIENT_KEY)
}