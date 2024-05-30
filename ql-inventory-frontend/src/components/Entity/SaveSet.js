import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function SaveSet({ set }) {
	const URL =
		'http://localhost:8080/api/sets' +
		(set != null ? '/' + set.id.toString() : '');
	const textStyle = { width: 350 };

	const buttonStyle = { width: 150 };

	const [photoSet, setPhotoSet] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const [identifier, setIdentifier] = useState();
	const [description, setDescription] = useState();

	useEffect(() => {
		setLoading(true);
		fetch(URL)
			.then((res) => {
				return res.json();
			})
			.then(setPhotoSet)
			.then(setIdentifier(''))
			.then(() => setLoading(false))
			.catch(setError);
	}, [set.identifier, URL]);

	if (loading) return <h3 align='center'>Loading...</h3>;
	if (error) return <h3 align='center'>Error!</h3>;
	if (!photoSet) return <h1>No such set</h1>;

	return (
		<>
			<h2 align='center'>
				{set === null ? 'Add a new Set' : 'Update Set ' + set.identifier}
			</h2>
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				align='center'>
				Enter a new set identifier:
				<br />
				<TextField
					required
					id='standard-basic'
					variant='outlined'
					style={textStyle}
					value={identifier}
					onChange={(event) => {
						setIdentifier(event.target.value);
					}}
				/>
				<br />
				Enter a new description:
				<br />
				<TextField
					required
					id='standard-basic'
					variant='outlined'
					style={textStyle}
					value={description}
					onChange={(event) => {
						setDescription(event.target.value);
					}}
				/>
				<br />
				<Button
					variant='contained'
					style={buttonStyle}
					onClick={(e) => {
						e.preventDefault();
						fetch(URL, {
							method: set != null ? 'PUT' : 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								identifier:
									identifier != null && identifier.length > 0
										? identifier
										: set.identifier,
								description: description,
							}),
						});
						setIdentifier('');
						setDescription('');
					}}>
					SAVE
				</Button>
			</Box>
		</>
	);
}

SaveSet.propTypes = {
	id: PropTypes.number,
};

export default SaveSet;
