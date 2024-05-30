import React, { useState } from 'react';

import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import SaveSchedule from '../Entity/SaveSchedule.js';
import BasicModal from './BasicModal.js';

function ChooseDateCalendar({ item, unavailableDays }) {
	const [selectedDayRange, setSelectedDayRange] = useState({
		from: null,
		to: null,
	});

	const handleDisabledSelect = (disabledDay) => {
		console.log('Tried including a disabled day', disabledDay);
	};

	return (
		<div align='center'>
			<Calendar
				value={selectedDayRange}
				onChange={setSelectedDayRange}
				disabledDays={unavailableDays}
				onDisabledDayError={handleDisabledSelect}
				// minimumDate={utils().getToday()}
				shouldHighlightWeekends
			/>
			<br />
			<BasicModal
				buttonVariant='contained'
				buttonSize='large'
				disabled={!selectedDayRange.from || !selectedDayRange.to}
				buttonStartIcon={<AddOutlinedIcon />}
				buttonText={'NEW SCHEDULE'}
				content={
					<SaveSchedule
						item={item}
						startDate={selectedDayRange.from}
						endDate={selectedDayRange.to}
					/>
				}
			/>
		</div>
	);
}

export default ChooseDateCalendar;
