import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from 'emotion';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import * as Colors from '../../../constants/Colors';
import { PUZZLE_SERVER } from '../../../components/Config';

function getPuzzleData(id) {
	return axios.get(`${PUZZLE_SERVER}/${id}`);
}

function PuzzlePage(props) {
	const [puzzleData, setPuzzleData] = useState();
	const [submission, setSubmission] = useState('');
	useEffect(() => {
		async function fetchData() {
			const { data } = await getPuzzleData(props.match.params.id);
			setPuzzleData(data);
			setSubmission(data && data.submission);
		}
		fetchData();
	}, [props.match.params.id]);
	return puzzleData &&
		puzzleData.displayName &&
		puzzleData.description &&
		puzzleData.difficulty &&
		puzzleData.generalArea ?
		<div
			className={css`
				background-color: ${Colors.BrightBlue};
				height: 100vh;
			`}
		>
			<div
				className={css`
					display: flex;
					justify-content: center;
					align-items: center;
				`}
			>
				<div
					className={css`
						max-width: 450px;
						& > * {
							margin: 10px;
						}
						display: flex;
						flex-direction: column;
					`}
				>
					<Text size="3rem" weight="800" color={Colors.White}>
						{puzzleData.displayName}
					</Text>
					<Text
						size="1rem"
						weight="900"
						color={Colors.White}
						style={{ fontStyle: 'italic' }}
					>
						Difficulty: {puzzleData.difficulty}
					</Text>
					<Text size="1rem" color={Colors.White}>
						{puzzleData.description}
					</Text>
					<Button
						onClick={() => {
							window.open(puzzleData.link);
						}}
						width="80px"
					>
						CLUE
					</Button>
					<TextInput
						width="100%"
						value={submission}
						onChange={event => {
							setSubmission(event.target.value);
						}}
					/>
					<Button style={{ alignSelf: 'flex-end' }}>SUBMIT</Button>
				</div>
				{puzzleData && puzzleData.score &&
					<div
						className={css`
							background-color: ${Colors.LightBlue};
							border-radius: 10px;
							padding: 8px;
							height: 100px;
							width: 100px;
							display: flex;
							justify-content: center;
							flex-direction: column;
							align-items: center;
							align-self: flex-start;
							margin: 30px;
						`}
					>
						<Text weight="900" color={Colors.White}>
							SCORE
						</Text>
						<Text weight="900" color={Colors.White} size="30px">
							{puzzleData.score}
						</Text>
					</div>
				}
			</div>
		</div>	 :
		<div>Loading</div>;
}

export default PuzzlePage;
