import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import SaveSet from './SaveSet.js';
import DisplayAccordion from '../Layout/DisplayAccordion.js';
import BasicModal from '../Layout/BasicModal.js';
import NavBar from '../Layout/NavBar.js';

function Sets() {
	const paperStyle = {
		padding: '20px 20px',
		width: 600,
		margin: '20px auto',
	};

	const BASE_URL = 'http://localhost:8080/api';

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const [sets, setSets] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		try {
			fetch(`${BASE_URL}/sets`)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					setSets(result);
				});
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [sets]);

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
				key='Accordion'
				elevation={3}
				style={paperStyle}>
				<h2 align='center'>Sets</h2>
				{sets
					?.sort((a, b) => a.identifier - b.identifier)
					.map((set) => {
						return (
							<DisplayAccordion
								key={'accordion' + set.identifier}
								set={set}
								title={
									<>
										<b>SET {set.identifier}</b>&nbsp;
										{set.description != null && set.description.length > 0
											? ' (' + set.description + ')'
											: ''}
									</>
								}
								content={
									<>
										<table
											key={'table' + set.identifier}
											width='90%'
											align='center'>
											<tbody>
												{items?.map((item) => {
													if (
														item.photographySet != null &&
														set.id === item.photographySet.id &&
														!item.part.deprecated
													) {
														return (
															<tr key={item.part.identifier + item.identifier}>
																<td align='left'>
																	{item.part.identifier} {item.identifier}
																</td>
																<td align='right'>
																	<Button
																		size='small'
																		startIcon={<RemoveOutlinedIcon />}
																		onClick={(e) => {
																			e.preventDefault();
																			fetch(
																				`${BASE_URL}/items/remove-${item.id}`,
																				{
																					method: 'PUT',
																					headers: {
																						'Content-Type': 'application/json',
																					},
																				}
																			);
																		}}>
																		Remove
																	</Button>
																</td>
															</tr>
														);
													}
													return null;
												})}
											</tbody>
										</table>
									</>
								}
								actions={
									<>
										<table
											width='100%'
											key={'actions' + set.identifier}>
											<tbody>
												<tr>
													<td align='left'>
														<BasicModal
															buttonVariant='outlined'
															buttonSize='small'
															buttonStartIcon={<AddOutlinedIcon />}
															buttonText='ADD ITEMS'
															content={
																<>
																	<h2 align='center'>
																		Add Items to Set #{set.identifier}
																	</h2>
																	<table
																		width='100%'
																		key={'addTo' + set.identifier}>
																		<tbody>
																			{items?.map((item) => {
																				if (!item.photographySet) {
																					return (
																						<tr
																							key={
																								'add' +
																								item.part.identifier +
																								item.identifier
																							}>
																							<td align='left'>
																								{item.part.identifier +
																									' ' +
																									item.identifier}
																							</td>
																							<td align='right'>
																								<Button
																									size='small'
																									startIcon={
																										<AddOutlinedIcon />
																									}
																									onClick={(e) => {
																										e.preventDefault();
																										fetch(
																											`${BASE_URL}/items/${item.id}/add/${set.id}`,
																											{
																												method: 'PUT',
																												headers: {
																													'Content-Type':
																														'application/json',
																												},
																											}
																										);
																									}}>
																									ADD
																								</Button>
																							</td>
																						</tr>
																					);
																				}
																				return null;
																			})}
																		</tbody>
																	</table>
																</>
															}
														/>
														&nbsp;
														<BasicModal
															buttonVariant='outlined'
															buttonSize='small'
															buttonStartIcon={<CreateOutlinedIcon />}
															buttonText='EDIT SET'
															content={<SaveSet set={set} />}
														/>
													</td>
													<td align='right'>
														<Button
															size='small'
															variant='outlined'
															startIcon={<DeleteOutlineOutlinedIcon />}
															onClick={(e) => {
																e.preventDefault();
																fetch(`${BASE_URL}/sets/${set.id}`, {
																	method: 'DELETE',
																	headers: {
																		'Content-Type': 'application/json',
																	},
																});
															}}>
															DELETE SET
														</Button>
													</td>
												</tr>
											</tbody>
										</table>
									</>
								}
							/>
						);
					})}
				<p />
				<div align='center'>
					<BasicModal
						buttonVariant='contained'
						buttonSize='large'
						buttonStartIcon={<AddOutlinedIcon />}
						buttonText='NEW SET'
						content={<SaveSet set={null} />}
					/>
				</div>
			</Paper>
		</>
	);
}

export default Sets;
