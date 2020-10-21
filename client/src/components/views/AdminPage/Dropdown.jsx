import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import DropdownRow from './DropdownRow';
import SubmissionRow from './SubmissionRow';
import PlayerRow from './PlayerRow';
import ControlRow from './ControlRow';
import Text from '../../Text/Text';
import { teams, updateAppState, submissions, submitScore } from '../../../_actions/admin_actions';
import { getAppState } from '../../../_actions/state_actions';
import { useDispatch } from 'react-redux';

const dropdown = css`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 80vw;
`;

export default function Dropdown(props) {
	const dispatch = useDispatch();
	const [items, setItems] = useState(null);
	const [showMenuState, setMenu] = useState(false);
	const [selected, setSelected] = useState(null);
	const [state, setState] = useState(null);

	function showMenu(event, item) {
		event.preventDefault();
		setMenu(!showMenuState);
		setSelected(item);
	}

	function renderRow(item, type) {
		// the other rows will be added here with switch
		switch (type) {
		case 'Puzzles':
			return <SubmissionRow key={item.submission} item={item} score={scoreSubmission}/>;
		case 'Teams':
			return <PlayerRow key={item.discord} item={item}/>;
		default:
			return <ControlRow key={item.name} item={item} onClick={changeGameState}/>;
		}
	}

	function getDropdown(type) {
		switch (type) {
		case 'Puzzles':
			return getPuzzles();
		case 'Teams':
			return getTeams();
		default:
			return getControls();
		}
	}

	function getPuzzles() {
		return dispatch(submissions()).then(response => {
			const puzzles = [];
			Object.keys(response.payload.submissions).forEach(key => {
				puzzles.push({ name: key, items: response.payload.submissions[key] });
			});
			return puzzles;
		});
	}

	function getTeams() {
		return dispatch(teams()).then(response => {
			return response.payload.teams.map(team => {
				return { name: team.name, items: team.members };
			});
		});
	}

	function getControls() {
		return [
			{ name: 'Game controls',
				items: [
					{ name: 'Clear', description: 'Clear the game so no puzzles can be seen. Sets the game state to "before."' },
					{ name: 'Start', description: 'Start the game so puzzles can be seen. Sets the game state to "during."' },
					{ name: 'End', description: 'End the game so submissions are no longer accepted. Sets the game state to "after."' }
				] }
		];
	}

	function scoreSubmission(item, score) {
		const dataToSubmit = {
			teamId: item.teamId,
			puzzleId: item.puzzleId,
			score
		};
		dispatch(submitScore(dataToSubmit)).then(response => {
			return getPuzzles();
		}).then(newItems => {
			setItems(newItems);
			setSelected(newItems[0]);
		});
	}

	function changeGameState(actionName) {
		const dataToSubmit = {
			state: ''
		};
		switch (actionName) {
		case 'Clear':
			dataToSubmit.state = 'before';
			break;
		case 'Start':
			dataToSubmit.state = 'during';
			break;
		case 'End':
			dataToSubmit.state = 'after';
			break;
		}

		dispatch(updateAppState(dataToSubmit)).then(response => {
			setState(response.payload.state);
		});
	}

	useEffect(() => {
		dispatch(getAppState()).then(response => {
			setState(response.payload.state);
		});
	}, []);

	useEffect(() => {
		async function initDropdown() {
			try {
				const newItems = await getDropdown(props.type);
				setItems(newItems);
				setSelected(newItems.length > 0 ? newItems[0] : null);
			} catch (err) {
				// Handle err here. Either ignore the error, or surface the error up to the user somehow.
			}
		}
		initDropdown();
	}, [props.type]);

	if (items === null || selected === null) {
		return null;
	}
	return (
		<div className={dropdown}>
			<Text>Current state: {state}</Text>
			{props.type === 'Controls' ? null : <DropdownRow item={selected != undefined ? selected : 'None available'} changeSelection={showMenu} showTriangle={true}/>}
			{
				showMenuState && items.length > 0 ?
					<div className={dropdown}>
						{
							items.map(item =>
								<DropdownRow
									key={item.name}
									item={item}
									changeSelection={showMenu}
									showTriangle={false}
								/>)
						}
					</div> :
					null
			}
			{selected.items.map(item => renderRow(item, props.type))}
		</div>
	);
}
