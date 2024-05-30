import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Parts from './components/Entity/Parts.js';
import Items from './components/Entity/Items.js';
import Sets from './components/Entity/Sets.js';
import Schedules from './components/Entity/Schedules.js';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<App />}
				/>
				<Route
					path='/parts'
					element={<Parts />}
				/>
				<Route
					path='/items'
					element={<Items />}
				/>
				<Route
					path='/sets'
					element={<Sets />}
				/>
				<Route
					path='/schedules'
					element={<Schedules />}
				/>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
