import React, { useState, useEffect } from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import * as Colors from '../../../constants/Colors';
import { Link } from 'react-router-dom';

function getPuzzleData(id) {
	return {
		name: id,
		link: '/',
		description: `puzzle blurb Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		Mauris faucibus finibus mauris. Pellentesque tempor lacus sit amet
		consectetur malesuada.`,
		difficulty: 'Super Senior',
		generalArea: 'The Hill'
	};
}

function PuzzlePage(props) {
	const [puzzleData, setPuzzleData] = useState();
	useEffect(() => {
		async function fetchData() {
			setPuzzleData(await getPuzzleData(props.match.params.id));
		}
		fetchData();
	}, [props.match.params.id]);
	return puzzleData &&
		puzzleData.name &&
		puzzleData.description &&
		puzzleData.difficulty &&
		puzzleData.generalArea ?
		<>
			{/* TODO: Change link to go back to general area */}
			<Link
				to="/"
				className={css`
					display: inline-block;
					margin: 20px;
					color: ${Colors.Blue};
				`}
			>
				Return to {puzzleData.generalArea}
			</Link>
			<div
				className={css`
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					& > * {
						margin: 6px;
					}
				`}
			>
				<Text size="3rem">{puzzleData.name}</Text>
				<Text size="1rem" weight="600">
					Difficulty: {puzzleData.difficulty}
				</Text>
				<Text
					size="1rem"
					className={css`
						text-align: center;
						width: 300px;
					`}
				>
					{puzzleData.description}
				</Text>
				<a
					href={puzzleData.link}
					className={css`
						color: ${Colors.Blue};
						font-size: 2rem;
						text-decoration: underline;
					`}
				>
					Clue
				</a>
				<TextInput />
				<Button>Submit</Button>
			</div>
		</>	 :
		<div>Loading</div>;
}

export default PuzzlePage;
