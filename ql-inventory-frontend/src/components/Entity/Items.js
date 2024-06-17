import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Button } from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import PropTypes from 'prop-types';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';

import NavBar from '../Layout/NavBar.js';
import SaveItem from './SaveItem.js';
import BasicModal from '../Layout/BasicModal.js';

function Items() {
	const paperStyle = {
		padding: '20px 20px',
		width: 600,
		margin: '20px auto',
	};

	const BASE_URL =
		'https://ql-inventory-backend-16f686f03873.herokuapp.com/api';

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [partFilter, setPartFilter] = useState(null);

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

	const [parts, setParts] = useState([]);
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
				key='itemList'
				elevation={3}
				style={paperStyle}>
				<h2 align='center'>Items</h2>
				<div align='center'>
					<Dropdown>
						<MenuButton key='partFilterMenuButton'>Part Type</MenuButton>
						<Menu
							key='partFilterMenu'
							slots={{ listbox: AnimatedListbox }}>
							<MenuItem
								key='noFilter'
								onClick={() => {
									setPartFilter(null);
								}}>
								NONE
							</MenuItem>
							{parts?.map((part) => {
								if (!part.deprecated) {
									return (
										<MenuItem
											key={part.identifier}
											onClick={() => {
												setPartFilter(part);
											}}>
											{part.identifier}
										</MenuItem>
									);
								}
								return null;
							})}
						</Menu>
					</Dropdown>
					&nbsp;{partFilter != null ? partFilter.identifier : ''}
					<p />
				</div>
				<table
					key='itemsTable'
					width='90%'
					align='center'>
					<tbody>
						{items?.map((item) => {
							if (partFilter != null && partFilter.id === item.part.id) {
								return (
									<tr key={item.id}>
										<td align='left'>
											{item.identifier}{' '}
											{item.alias ? '(' + item.alias + ')' : ''}{' '}
											{item.photographySet
												? ' - Set ' + item.photographySet.identifier
												: ''}
										</td>
										<td align='right'>
											<BasicModal
												buttonVariant='outlined'
												buttonSize='small'
												buttonStartIcon={<CreateOutlinedIcon />}
												buttonText='Edit'
												content={
													<SaveItem
														id={item.id}
														partType={partFilter}
													/>
												}
											/>
											&nbsp;
											<Button
												size='small'
												variant='outlined'
												startIcon={<DeleteOutlineOutlinedIcon />}
												onClick={(e) => {
													e.preventDefault();
													fetch(`${BASE_URL}/items/${item.id}`, {
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
					{partFilter != null ? (
						<BasicModal
							buttonVariant='contained'
							buttonSize='large'
							buttonStartIcon={<AddOutlinedIcon />}
							buttonText={'NEW ' + partFilter.identifier}
							content={
								<SaveItem
									id={0}
									partType={partFilter}
								/>
							}
						/>
					) : (
						<>
							Select a part type to continue.
							<br />
							&nbsp;
						</>
					)}
					<br />
				</div>
			</Paper>
		</>
	);
}

const blue = {
	50: '#F0F7FF',
	100: '#C2E0FF',
	200: '#99CCF3',
	300: '#66B2FF',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E6',
	700: '#0059B3',
	800: '#004C99',
	900: '#003A75',
};

const grey = {
	50: '#F3F6F9',
	100: '#E5EAF2',
	200: '#DAE2ED',
	300: '#C7D0DD',
	400: '#B0B8C4',
	500: '#9DA8B7',
	600: '#6B7A90',
	700: '#434D5B',
	800: '#303740',
	900: '#1C2025',
};

const Listbox = styled('ul')(
	({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${
			theme.palette.mode === 'dark' ? grey[900] : grey[200]
		};
    z-index: 1;
  
    .closed & {
      opacity: 0;
      transform: scale(0.95, 0.8);
      transition: opacity 200ms ease-in, transform 200ms ease-in;
    }
    
    .open & {
      opacity: 1;
      transform: scale(1, 1);
      transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
    }
  
    .placement-top & {
      transform-origin: bottom;
    }
  
    .placement-bottom & {
      transform-origin: top;
    }
    `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
	const { ownerState, ...other } = props;
	const popupContext = React.useContext(PopupContext);

	if (popupContext == null) {
		throw new Error(
			'The `AnimatedListbox` component cannot be rendered outside a `Popup` component'
		);
	}

	const verticalPlacement = popupContext.placement.split('-')[0];

	return (
		<CssTransition
			className={`placement-${verticalPlacement}`}
			enterClassName='open'
			exitClassName='closed'>
			<Listbox
				{...other}
				ref={ref}
			/>
		</CssTransition>
	);
});

AnimatedListbox.propTypes = {
	ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
	({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${
				theme.palette.mode === 'dark' ? blue[600] : blue[200]
			};
      background-color: ${
				theme.palette.mode === 'dark' ? grey[800] : grey[100]
			};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
    `
);

const MenuButton = styled(BaseMenuButton)(
	({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${
				theme.palette.mode === 'dark' ? blue[300] : blue[200]
			};
      outline: none;
    }
    `
);

export default Items;
