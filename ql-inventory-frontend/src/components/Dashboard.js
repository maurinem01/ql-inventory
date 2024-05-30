import DisplayAccordion from './Layout/DisplayAccordion.js';
import NavBar from './Layout/NavBar.js';
import { Paper } from '@mui/material';

function Dashboard() {
	const paperStyle = {
		padding: '20px 20px',
		width: 600,
		margin: '20px auto',
	};

	return (
		<>
			<NavBar />
			<Paper
				key='filter'
				elevation={3}
				style={paperStyle}>
				<DisplayAccordion
					title={<b>Parts</b>}
					content={
						<p align='left'>
							Parts are item categories.
							<ul>
								<li>
									<b>Edit</b> allows you to change the Part name.
								</li>
								<li>
									<b>Delete</b> deprecates a Part. &nbsp;A full Delete is
									currently not permitted to prevent unexpected effects on Sets.
									&nbsp;To undo an accidental Delete, click on{' '}
									<b>Show Deleted Parts</b> and click <b>Undelete</b> on the
									appropriate Part.
								</li>
								<li>
									<b>New Part</b> allows you to create a new Item category.
									&nbsp;Please remember that Parts cannot be fully deleted so
									avoid creating unnecessary Parts.
								</li>
							</ul>
						</p>
					}></DisplayAccordion>
				<DisplayAccordion
					title={<b>Items</b>}
					content={
						<>
							<p align='left'>
								Items are individual pieces of equipment. &nbsp;A part type must
								be selected before viewing items of tha part.
								<ul>
									<li>
										<b>Edit</b> allows you to change the item properties.
										<ul>
											<li>
												The <b>Serial Number</b> is the item's unique
												identifier. &nbsp;This field is required, but you can
												choose a generic identifier for non-serialized items.
											</li>
											<li>
												The <b>Alias</b> is a unique name given to items whose
												serial number may be difficult to remember. &nbsp;For
												example, a vehicle may have a nickname.
											</li>
										</ul>
									</li>
									<li>
										<b>Delete</b> permanently deletes an Item. &nbsp;This will
										also remove this item from any Sets it's a part of. &nbsp;In
										the case of Vehicles, deleting a Vehicle will delete all
										associated Schedules.
									</li>
								</ul>
							</p>
						</>
					}></DisplayAccordion>
				<DisplayAccordion
					title={<b>Sets</b>}
					content={
						<>
							<p align='left'>
								Sets represent photography sets. Click on a Set to expand its
								associated Items.
								<ul>
									<li>
										<b>Remove</b> removes an Item from a Set but does not delete
										it.
									</li>
									<li>
										<b>Add Items</b> creates a popup of unassigned Items that
										can be added to a Set.
									</li>
									<li>
										<b>Edit</b> allows you to change set details.
										<ul>
											<li>
												<b>Identifier</b> must be an integer.
											</li>
											<li>
												<b>Description</b> is an optional field that describes
												the set marker tapes.
											</li>
										</ul>
									</li>
									<li>
										<b>Delete Set</b> permanently deletes a Set. However, a Set
										must be empty before it can be Deleted.
									</li>
								</ul>
							</p>
						</>
					}></DisplayAccordion>
				<DisplayAccordion
					title={<b>Vehicle Schedule</b>}
					content={
						<>
							<p align='left'>
								Items of type Vehicle can be assigned a schedule. &nbsp;Click on
								a vehicle's name to expand its schedule.
								<ul>
									<li>
										<b>Delete</b> will delete the vehicle schedule.
									</li>
									<li>
										To assign a new Schedule, click on a date range in the
										calendar and click <b>New Schedule</b>. &nbsp;A popup will
										appear with vehicle and the date range selected. &nbsp;The{' '}
										<b>Destination</b> can be the job the Vehicle is assigned to
										or any maintenance it is scheduled for.
									</li>
								</ul>
								<b>
									Note: Deleting a Vehicle will delete all of its associated
									schedules!
								</b>
							</p>
						</>
					}></DisplayAccordion>
			</Paper>
		</>
	);
}

export default Dashboard;
