import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SavePart from './SavePart.js';
import NavBar from '../Layout/NavBar.js';
import BasicModal from '../Layout/BasicModal.js';

function Parts() {
	const paperStyle = {
		padding: '20px 20px',
		width: 600,
		margin: '20px auto',
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 600,
		bgcolor: 'background.paper',
		border: '1px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const BASE_URL =
		'https://ql-inventory-backend-16f686f03873.herokuapp.com/api';

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [parts, setParts] = useState([]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		setIsLoading(true);
		try {
			fetch(`${BASE_URL}/parts`)
				.then((res) => {
					return res.json();
				})
				.then((result) => {
					setParts(result);
				});
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	}, [parts]);

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
				key='partsList'
				elevation={3}
				style={paperStyle}>
				<h2 align='center'>Parts</h2>
				<table
					key='partsTable'
					width='90%'
					align='center'>
					<tbody>
						{parts
							?.sort((a, b) => a.identifier.localeCompare(b.identifier))
							.map((part) => {
								if (!part.deprecated) {
									return (
										<tr key={part.id}>
											<td align='left'>{part.identifier}</td>
											<td align='right'>
												<BasicModal
													buttonVariant='outlined'
													buttonSize='small'
													buttonStartIcon={<CreateOutlinedIcon />}
													disabled={part.identifier === 'VEHICLE'}
													buttonText='Edit'
													content={<SavePart id={part.id} />}
												/>
												&nbsp;
												<Button
													size='small'
													variant='outlined'
													startIcon={<DeleteOutlineOutlinedIcon />}
													disabled={part.identifier === 'VEHICLE'}
													onClick={(e) => {
														e.preventDefault();
														fetch(`${BASE_URL}/parts/${part.id}`, {
															method: 'DELETE',
															headers: { 'Content-Type': 'application/json' },
														});
													}}>
													Delete
												</Button>
											</td>
										</tr>
									);
								}
								return null;
							})}
					</tbody>
				</table>
				<br />
				<div align='center'>
					<BasicModal
						buttonVariant='contained'
						buttonSize='large'
						buttonStartIcon={<AddOutlinedIcon />}
						buttonText='NEW PART'
						content={<SavePart id={0} />}
					/>
					&nbsp;
					<Button
						variant='outlined'
						size='large'
						onClick={handleOpen}>
						SHOW DELETED PARTS
					</Button>
				</div>
			</Paper>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<h2 align='center'>Deleted Parts</h2>
					<table
						width='90%'
						align='center'
						key='deletedParts'>
						<tbody>
							{parts?.map((part) => {
								if (part.deprecated) {
									return (
										<tr key={'deletedPart' + part.identifier}>
											<td align='left'>{part.identifier}</td>
											<td align='right'>
												<Button
													size='small'
													variant='outlined'
													startIcon={<DeleteOutlineOutlinedIcon />}
													onClick={(e) => {
														e.preventDefault();
														fetch(`${BASE_URL}/parts/undelete-${part.id}`, {
															method: 'PUT',
															headers: { 'Content-Type': 'application/json' },
														});
													}}>
													Undelete
												</Button>
											</td>
										</tr>
									);
								}
								return null;
							})}
						</tbody>
					</table>
				</Box>
			</Modal>
		</>
	);
}

export default Parts;
