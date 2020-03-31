import moment from 'moment'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

export function getProjectTimeFrame(dates) {
	let earliest = Math.min(...dates)
	let latest = Math.max(...dates)

	earliest = moment(earliest)
	latest = moment(latest)

	return (latest.diff(earliest, 'month') + 1) / 12
}

export function calculateSummaryProfit(profits) {
	return _reduce(profits, (prevValue, nextProfit) => {
		const { value } = nextProfit

		return prevValue + Number(value)
	}, 0)
}

export function applyChanges(capital = 0, profits = []) {
	const dates = _map(profits, profit => new Date(profit.date))

	const timeFrame = getProjectTimeFrame(dates)
	const summaryProfit = calculateSummaryProfit(profits)

	return (summaryProfit / timeFrame) / Number(capital)
}