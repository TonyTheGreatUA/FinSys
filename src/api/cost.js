import { setItem, getItem } from '../utils/local-storage'
import { v4 as uuid } from 'uuid'

const COST_KEY = 'cost'

export function addCost(cost) {
	const costs = getCosts()

	const costId = uuid()
	const nextCosts = {
		...costs,
		[costId]: {
			id: [costId],
			...cost,
		}
	}

	setItem(COST_KEY, nextCosts)

	return getCosts()
}

export function getCosts() {
	return getItem(COST_KEY) || {}
}

export function getCostById(id) {
	const costs = getCosts()

	return costs[id]
}

export function deleteCostById(id) {
	const costs = getCosts()

	delete costs[id]

	setItem(COST_KEY, costs)

	return getCosts()
}