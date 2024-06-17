import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import NavBar from '../Layout/NavBar.js';
import ChooseDateCalendar from '../Layout/ChooseDateCalendar.js';
import DisplayAccordion from '../Layout/DisplayAccordion.js';

function Schedules() {
	const paperStyle = {
		padding: '20px 20px',
		width: 600,
		margin: '20px auto',
	};

	const BASE_URL =
		'https://ql-inventory-backend-16f686f03873.herokuapp.com/api';

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const [items, setItems] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		try {
			fetch(`${BASE_URL}/items`)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					setItems(result);
				});
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [items]);

	const [schedules, setSchedules] = useState();
	useEffect(() => {
		setIsLoading(true);
		try {
			fetch(`${BASE_URL}/schedules`)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					setSchedules(result);
				});
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [schedules]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong! Please try again.</div>;
	}

	return (
		<>
			<NavBar />
			<Paper
				key='itemList'
				elevation={3}
				style={paperStyle}>
				<h2 align='center'>Vehicle Schedule</h2>
				{items?.map((item) => {
					if (item.part.identifier === 'VEHICLE') {
						var unavailableDays = [];

						// item.schedules?.map((schedule) => {
						// 	const startDate = convertDate(schedule.startDate);
						// 	const endDate = convertDate(schedule.endDate);

						// 	for (
						// 		var d = startDate;
						// 		d <= endDate;
						// 		d.setDate(d.getDate() + 1)
						// 	) {
						// 		unavailableDays.push(dateShape(formatDate(d)));
						// 	}

						// 	return null;
						// });

						return (
							<>
								<DisplayAccordion
									title={
										<>
											{item.identifier}
											{item.alias ? ' (' + item.alias + ')' : ''}
										</>
									}
									content={
										<>
											<table width='100%'>
												<tbody>
													{item.schedules
														?.sort((a, b) => {
															return (
																new Date(a.startDate) - new Date(b.startDate)
															);
														})
														.map((schedule) => {
															const startDate = convertDate(schedule.startDate);
															const endDate = convertDate(schedule.endDate);

															for (
																var d = startDate;
																d <= endDate;
																d.setDate(d.getDate() + 1)
															) {
																unavailableDays.push(dateShape(formatDate(d)));
															}
															return (
																<tr>
																	<td>
																		{schedule.startDate} - {schedule.endDate} :{' '}
																		{schedule.destination}
																	</td>
																	<td align='right'>
																		<Button
																			size='small'
																			variant='outlined'
																			startIcon={<DeleteOutlineOutlinedIcon />}
																			onClick={(e) => {
																				e.preventDefault();
																				fetch(
																					`${BASE_URL}/schedules/${schedule.id}`,
																					{
																						method: 'DELETE',
																						headers: {
																							'Content-Type':
																								'application/json',
																						},
																					}
																				);
																			}}>
																			Delete
																		</Button>
																	</td>
																</tr>
															);
														})}
												</tbody>
											</table>
											<br />
											<>
												<ChooseDateCalendar
													item={item}
													unavailableDays={unavailableDays}
												/>
											</>
										</>
									}
								/>
							</>
						);
					}
					return null;
				})}
			</Paper>
		</>
	);
}

function dateShape(date) {
	const dateParts = date.toString().split('-');
	return {
		year: parseInt(dateParts[0]),
		month: parseInt(dateParts[1]),
		day: parseInt(dateParts[2]),
	};
}

function convertDate(date) {
	const dateParts = date.toString().split('-');
	return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
}

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}

export { formatDate };
export default Schedules;
