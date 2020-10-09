import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import DropdownRow from './DropdownRow';
import SubmissionRow from './SubmissionRow';
import PlayerRow from './PlayerRow';
import ControlRow from './ControlRow';
import Text from '../../Text/Text';
import { updateAppState } from '../../../_actions/admin_actions';
import { getAppState } from '../../../_actions/state_actions';
import { useDispatch } from 'react-redux';

const dropdown = css`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 80vw;
`;

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
	// Mock data for now. This will be replaced with API call.
	return [
		{ id: '123', name: 'Puzzle 1', items: [{ link: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { link: 'aewe' }, { link: 'sd' }] },
		{ id: '123', name: 'Puzzle 2', items: [{ link: 'a' }, { link: '123' }, { link: 'ads' }] },
		{ id: '123', name: 'Puzzle 3', items: [{ link: 'a' }, { link: 'avv' }, { link: 'c' }] }
	];
}

function getTeams() {
	return [
		{ name: 'Team kookie', items: [{ playerName: 'cookie chan', discord: 'cookiemaster' }, { playerName: 'aewe', discord: 'cookiemaster' }, { playerName: 'sd', discord: 'cookiemaster' }] },
		{ name: 'Team bookie', items: [{ playerName: 'john smith', discord: 'wowzatree' }] },
		{ name: 'Team cookie', items: [{ playerName: 'jane doe', discord: 'cookie' }, { playerName: 'avv', discord: 'cookiemaster' }, { playerName: 'c', discord: 'cookiemaster' }] }
	];
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

function submitScore(item, score) {
	// Will need team id in the item in order to score
	// if success, rerender list and item will be removed? in case there are 2 ppl grading at same time
}

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
			return <SubmissionRow item={item} score={submitScore}/>;
		case 'Teams':
			return <PlayerRow item={item}/>;
		default:
			return <ControlRow item={item} onClick={changeGameState}/>;
		}
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
				setSelected(newItems[0]);
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
			{props.type === 'Controls' ? null : <DropdownRow item={selected} changeSelection={showMenu} showTriangle={true}/>}
			{
				showMenuState ?
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
