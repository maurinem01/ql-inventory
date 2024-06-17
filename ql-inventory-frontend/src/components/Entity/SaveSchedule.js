import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function SaveSchedule({ startDate, endDate, item }) {
	const BASE_URL =
		'https://ql-inventory-backend-16f686f03873.herokuapp.com/api/schedules';
	const [destination, setDestination] = useState('');

	const textStyle = { width: 350 };
	const buttonStyle = { width: 150 };

	return (
		<>
			<h2 align='center'>Add Schedule</h2>
			<div align='center'>
				Vehicle {item.identifier}
				<br />
				{formatDate(startDate)} to {formatDate(endDate)}
			</div>
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				align='center'>
				Enter a destination:
				<br />
				<TextField
					required
					id='standard-basic'
					variant='outlined'
					style={textStyle}
					value={destination}
					onChange={(event) => {
						setDestination(event.target.value);
					}}
				/>
				<br />
				<Button
					variant='contained'
					style={buttonStyle}
					disabled={destination.length === 0}
					onClick={(e) => {
						e.preventDefault();
						fetch(BASE_URL, {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								destination: destination,
								startDate: formatDate(startDate),
								endDate: formatDate(endDate),
								item: item,
							}),
						});
						setDestination('');
					}}>
					SAVE
				</Button>
			</Box>
		</>
	);
}

function formatDate(date) {
	var d = new Date(date.year, date.month, date.day),
		month = '' + d.getMonth(),
		day = '' + d.getDate(),
		year = d.getFullYear();
	year = d.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export default SaveSchedule;
