import React from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import * as Colors from '../../../constants/Colors';

function PuzzlePage() {
	return (
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
			<Text size="3rem">Puzzle Title</Text>
			<Text size="1rem" weight="600">
				Difficulty: Super Senior
			</Text>
			<Text
				size="1rem"
				className={css`
					text-align: center;
					width: 300px;
				`}
			>
				puzzle blurb Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris faucibus finibus mauris. Pellentesque tempor lacus sit amet
				consectetur malesuada.
			</Text>
			<a
				href=""
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
	);
}

export default PuzzlePage;
