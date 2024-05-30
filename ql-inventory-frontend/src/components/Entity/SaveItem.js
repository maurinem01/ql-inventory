import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function SaveItem(props) {
	const URL =
		'http://localhost:8080/api/items' +
		(props.id > 0 ? '/' + props.id.toString() : '');
	const textStyle = { width: 350 };

	const buttonStyle = { width: 150 };

	const [item, setItem] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);

	const [identifier, setIdentifier] = useState();
	const [alias, setAlias] = useState();

	useEffect(() => {
		setLoading(true);
		if (props.id > 0) {
			fetch(URL)
				.then((res) => {
					return res.json();
				})
				.then(setItem)
				.then(setIdentifier(''))
				.then(() => setLoading(false))
				.catch(setError);
		} else {
			setLoading(false);
		}
	}, [props.id, URL, item.identifier]);

	if (loading) return <h3 align='center'>Loading...</h3>;
	if (error) return <h3 align='center'>Error!</h3>;
	if (!item) return <h1>No such item</h1>;

	return (
		<>
			{/* <Paper elevation={3} style={paperStyle}> */}
			<h2 align='center'>
				{props.id === 0
					? 'Add a new ' + props.partType.identifier.toLowerCase()
					: 'Update ' +
					  props.partType.identifier.toLowerCase() +
					  ' #' +
					  item.identifier}
			</h2>
			<Box
				component='form'
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				noValidate
				autoComplete='off'
				align='center'>
				Enter a new serial number:
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
				Enter a new alias:
				<br />
				<TextField
					required
					id='standard-basic'
					variant='outlined'
					style={textStyle}
					value={alias}
					onChange={(event) => {
						setAlias(event.target.value);
					}}
				/>
				<br />
				<Button
					variant='contained'
					style={buttonStyle}
					onClick={(e) => {
						e.preventDefault();
						fetch(URL, {
							method: props.id > 0 ? 'PUT' : 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								identifier:
									identifier.length > 0 ? identifier : item.identifier,
								alias: alias,
								part: props.partType,
								photographySet: item.photographySet,
							}),
						});
						setIdentifier('');
						setAlias('');
					}}>
					SAVE
				</Button>
			</Box>
			{/* </Paper> */}
			{/* <Paper style={paperStyle} key='info'>
            <h3 align='center'>Item</h3>{JSON.stringify(item)}
            <br />
            <h3 align='centner'>Thing being sent</h3>
            {
                JSON.stringify({
                    identifier: identifier,
                    alias: alias,
                    part: props.partType,
                    photographySet: item.photographySet
                })
            }
            </Paper> */}
		</>
	);
}

SaveItem.propTypes = {
	id: PropTypes.number,
};

export default SaveItem;
