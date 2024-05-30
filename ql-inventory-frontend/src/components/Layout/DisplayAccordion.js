import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DisplayAccordion({ title, content, actions }) {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1-content'
				id='panel1-header'>
				{title}
			</AccordionSummary>
			<AccordionDetails>{content}</AccordionDetails>
			<AccordionActions>{actions}</AccordionActions>
		</Accordion>
	);
}

export default DisplayAccordion;
