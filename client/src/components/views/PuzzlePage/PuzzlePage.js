import React from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import * as Colors from '../../../constants/Colors';

function getPuzzleData(id) {
	return {
		name: id,
		link: '/',
		description: `puzzle blurb Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		Mauris faucibus finibus mauris. Pellentesque tempor lacus sit amet
		consectetur malesuada.`,
		difficulty: 'Super Senior'
	};
}

function PuzzlePage(props) {
	const [puzzleData, setPuzzleData] = React.useState();
	React.useEffect(() => {
		const { id } = props.match.params;
		async function fetchData() {
			const puzzleData = await getPuzzleData(id);
			setPuzzleData(puzzleData);
		}
		fetchData();
	}, [props.match.params]);
	return puzzleData &&
		puzzleData.name &&
		puzzleData.description &&
		puzzleData.difficulty ?
		<div
			className={css`
				margin: 20px;
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
		</div>	 :
		<div>Loading</div>;
}

export default PuzzlePage;
