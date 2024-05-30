import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function SavePart(props) {
	const URL =
		'http://localhost:8080/api/parts' +
		(props.id > 0 ? '/' + props.id.toString() : '');
	const textStyle = { width: 350 };

	const buttonStyle = { width: 150 };

	const [part, setPart] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	const [identifier, setIdentifier] = useState('');

	useEffect(() => {
		setLoading(true);
		if (props.id > 0) {
			fetch(URL)
				.then((res) => {
					return res.json();
				})
				// .then(result => { setPart(result) })
				.then(setPart)
				.then(setIdentifier(''))
				.then(() => setLoading(false))
				.catch(setError);
		} else {
			setLoading(false);
		}
	}, [props.id, URL]);

	if (loading) return <h3 align='center'>Loading...</h3>;
	if (error) return <pre>{JSON.stringify(error)}</pre>;
	if (!part) return <h1>No such part</h1>;
	return (
		<>
			<h2 align='center'>{props.id === 0 ? 'Add' : 'Update'} Part</h2>
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				align='center'>
				Enter a new name{props.id > 0 ? ' for ' + part.identifier : ''}:<br />
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
				<Button
					variant='contained'
					style={buttonStyle}
					disabled={identifier.length === 0}
					onClick={(e) => {
						e.preventDefault();
						fetch(URL, {
							method: props.id > 0 ? 'PUT' : 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ identifier }),
						});
						setIdentifier('');
					}}>
					SAVE
				</Button>
			</Box>
		</>
	);
}

SavePart.propTypes = {
	id: PropTypes.number,
};

export default SavePart;
