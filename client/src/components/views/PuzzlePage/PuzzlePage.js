import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import BarMessage from '../../BarMessage/BarMessage';
import * as Colors from '../../../constants/Colors';
import { PUZZLE_SERVER, USER_SERVER } from '../../../components/Config';

function CorrectLabel() {
	return (
		<>
			<span role="img" aria-label="green check mark">
				✅
			</span>{' '}
			Correct
		</>
	);
}

function IncorrectLabel() {
	return (
		<>
			<span role="img" aria-label="red x mark">
				❌
			</span>{' '}
			Incorrect
		</>
	);
}

function PendingLabel() {
	return (
		<>
			<span role="img" aria-label="hourglass">
				⏳
			</span>{' '}
			Pending
		</>
	);
}

function getPuzzleData(id) {
	return axios.get(`${PUZZLE_SERVER}/${id}`);
}

function PuzzlePage(props) {
	const [puzzleData, setPuzzleData] = useState();
	const [submission, setSubmission] = useState('');
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState('no attempt');
	const [errorMessage, setErrorMessage] = useState('');
	const puzzleId = props.match.params.id;

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await getPuzzleData(puzzleId);
				if (data) {
					setPuzzleData(data);
					setSubmission(data.submission);
					setScore(data.score);
					setStatus(data.status);
				}
			} catch {
				setErrorMessage('Puzzle information could not be loaded');
			}
		}
		fetchData();
	}, [puzzleId]);

	const submit = async () => {
		try {
			const response = await axios.post(
				`${USER_SERVER}/submitPuzzle/${puzzleId}`,
				{ submission }
			);
			const { data } = response;
			if (data) {
				setSubmission(data.submission);
				setScore(data.score);
				setStatus(data.status);
			}
		} catch {
			setErrorMessage('Unable to submit puzzle');
			setTimeout(() => {
				setErrorMessage('');
			}, 5000);
		}
	};

	return puzzleData &&
		puzzleData.displayName &&
		puzzleData.description &&
		puzzleData.difficulty &&
		puzzleData.generalAreaId &&
		puzzleData.generalAreaDisplayName ?
		<div
			className={css`
				background-color: ${Colors.BrightBlue};
				height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
			`}
		>
			<div
				className={css`
					display: flex;
				`}
			>
				<div
					className={css`
						margin: 30px;
					`}
				>
					<Link to={`/area/${puzzleData.generalAreaId}`}>
						<div
							className={css`
								background-color: ${Colors.LightBlue};
								padding: 6px 10px;
								border-radius: 8px;
								display: flex;
								align-items: center;
								cursor: pointer;
								&:hover {
									background-color: ${Colors.MediumBlue};
									transition: 0.3s;
								}
								max-width: 160px;
							`}
						>
							{/* triangle */}
							<div
								className={css`
									width: 0;
									height: 0;
									border-top: 5px solid transparent;
									border-right: 10px solid white;
									border-bottom: 5px solid transparent;
									margin-right: 8px;
								`}
							></div>
							<Text color={Colors.White} weight="900">
								{puzzleData.generalAreaDisplayName.toUpperCase()}
							</Text>
						</div>
					</Link>
				</div>
				<div
					className={css`
						max-width: 450px;
						& > * {
							margin: 10px;
							box-sizing: border-box;
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
					<div
						className={css`
							display: flex;
							align-items: center;
						`}
					>
						<TextInput
							style={{ flex: 1 }}
							value={submission}
							onChange={event => {
								setSubmission(event.target.value);
							}}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									submit();
								}
							}}
						/>
						<Button style={{ marginLeft: '10px' }} onClick={submit}>
							SUBMIT
						</Button>
					</div>
					{status && status !== 'no attempt' &&
						<Text color={Colors.White} weight="900">
							{status === 'correct' && <CorrectLabel />}
							{status === 'incorrect' && <IncorrectLabel />}
							{status === 'pending' && <PendingLabel />}
						</Text>
					}
					{errorMessage && <Text error>{errorMessage}</Text>}
				</div>
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
						{score ? score : 0}
					</Text>
				</div>
			</div>
		</div>	 :
		<div>
			{errorMessage && <BarMessage fontSize="1rem"> {errorMessage} </BarMessage>}
      Loading
		</div>;
}

export default PuzzlePage;
