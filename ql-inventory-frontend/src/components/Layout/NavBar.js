import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed'>
				<Toolbar>
					<Link to='/'>
						<Button
							variant='contained'
							startIcon={<HomeIcon />}
							disableElevation>
							<b>QL Inventory</b>
						</Button>
					</Link>
					<Link to='/parts'>
						<Button
							variant='contained'
							disableElevation>
							Parts
						</Button>
					</Link>
					<Link to='/items'>
						<Button
							variant='contained'
							disableElevation>
							Items
						</Button>
					</Link>
					<Link to='/sets'>
						<Button
							variant='contained'
							disableElevation>
							Sets
						</Button>
					</Link>
					<Link to='/schedules'>
						<Button
							variant='contained'
							disableElevation>
							Vehicle Schedule
						</Button>
					</Link>
					{/* <Button
						variant='contained'
						disableElevation>
						Photographers
					</Button> */}
				</Toolbar>
			</AppBar>
			<div
				width='100%'
				height='100px'>
				<p />
				&nbsp;
				<p />
				&nbsp;
			</div>
		</Box>
	);
}

export default NavBar;
