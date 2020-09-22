import React, { useEffect, useState } from 'react';
import DropdownRow from './DropdownRow';
import SubmissionRow from './SubmissionRow';
import { css } from 'emotion';

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
		{ name: 'Team kookie', items: [{ playerName: 'cookie', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { playerName: 'aewe', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { playerName: 'sd', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }] },
		{ name: 'Team bookie', items: [{ playerName: 'a', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { playerName: '123', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { playerName: 'ads', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }] },
		{ name: 'Team cookie', items: [{ playerName: 'a', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { playerName: 'avv', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }, { playerName: 'c', discord: 'https://github.com/uclaacm/bruin-quest-website/tree/master/client' }] }
	];
}

function getControls() {
	return [{ name: 'Stop game', items: [] }];
}

function submitScore(item, score) {
	// Will need team id in the item in order to score
	// if success, rerender list and item will be removed? in case there are 2 ppl grading at same time
}

function renderRow(item) {
	// the other rows will be added here with switch
	return (
		<SubmissionRow item={item} score={submitScore}/>
	);
}

export default function Dropdown(props) {
	const [items, setItems] = useState(null);
	const [showMenuState, setMenu] = useState(false);
	const [selected, setSelected] = useState(null);

	function showMenu(event, item) {
		event.preventDefault();
		setMenu(!showMenuState);
		setSelected(item);
	}

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
			<DropdownRow item={selected} changeSelection={showMenu} showTriangle={true}/>
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
			{selected.items.map(renderRow)}
		</div>
	);
}
