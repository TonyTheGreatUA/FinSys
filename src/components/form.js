import React, { useState } from 'react'

import DatePicker from 'react-date-picker'

const DefaultValue = 0

export function Form(props) {
	const [date, setDate] = useState(new Date())
	const [value, setValue] = useState(DefaultValue)

	function onDateChange(date) {
		setDate(date)
	}

	function onValueChange(event) {
		const value = event.target.value

		setValue(value)
	}

	function onSubmit() {
		if (date && value) {
			props.onSubmit({date, value})
		}

		resetValues()
	}

	function resetValues() {
		setDate(new Date())
		setValue(DefaultValue)
	}

	return (
		<div className="section costs-form">
			<DatePicker
				onChange={ onDateChange }
				value={ date }
				format="dd.MM.yyyy"
			/>
			<input
				type="number"
				value={ value }
				onChange={ onValueChange }
				placeholder="Profit"
			/>
			<button
				className="btn"
				onClick={ onSubmit }
			>
				Add
			</button>
		</div>
	)
}