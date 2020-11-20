import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';
import BarMessage from '../../BarMessage/BarMessage';
import * as Colors from '../../../constants/Colors';
import * as Screens from '../../../constants/Screens';
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
			if (puzzleData.type == 'Gold') {
				try {
					const _ = new URL(submission);
				} catch {
					setErrorMessage('Unable to parse URL. Make sure it starts with http or https.');
					setTimeout(() => {
						setErrorMessage('');
					}, 5000);
					return;
				}
			}
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
		puzzleData.generalAreaDisplayName &&
		puzzleData.type ?
		<div
			className={css`
				background-color: ${Colors.BrightBlue};
				height: 100vh;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 16px;
			`}
		>
			<div
				id='puzzle-wrapper'
				className={css`
					display: flex;
					@media screen and (max-width: ${Screens.small}px) {
						justify-content: space-around;
						flex-wrap: wrap;
					}
				`}
			>
				<div
					id='back-to-area'
					className={css`
						@media screen and (max-width: ${Screens.small}px) {
							order: -1;
						}
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
							<Text color={Colors.White} weight="700">
								{puzzleData.generalAreaDisplayName.toUpperCase()}
							</Text>
						</div>
					</Link>
				</div>
				<div
					id='puzzle-content'
					className={css`
						width: 450px;
						margin: 0 24px;
						& > * {
							margin: 10px;
							box-sizing: border-box;
						}
						display: flex;
						flex-direction: column;
						@media screen and (max-width: ${Screens.small}px) {
							width: unset;
							max-width: 450px;
							flex: 1 0 100%;
						}
					`}
				>
					<Text
						weight="800"
						className={css`
							font-size: 3rem;
							color: ${Colors.White};
							@media screen and (max-width: ${Screens.xsmall}px) {
								font-size: 2rem;
							}`
						}
					>
						{puzzleData.displayName}
					</Text>
					<Text
						size="1rem"
						weight="700"
						color={Colors.White}
					>
						Difficulty: {puzzleData.difficulty}
						<br/>
						Type: <span className={css`
							color: ${puzzleData.type.toUpperCase() === 'GOLD' ? '#FFD100' : '#2774AE'}
						`}>{puzzleData.type}</span>
					</Text>
					<Text size="1rem" color={Colors.White}>
						{puzzleData.description}
					</Text>
					<Button
						onClick={() => {
							window.open(puzzleData.link);
						}}
						width="100px"
					>
						PUZZLE
					</Button>
					<div
						id='answer-submission-container'
						className={css`
							display: flex;
							align-items: flex-end;
							flex-wrap: wrap;
						`}
					>
						<TextInput
							style={{
								flex: '2 1',
								marginRight: '16px'
							}}
							width='unset'
							value={submission || ''}
							disabled={status === 'correct'}
							onChange={event => {
								setSubmission(event.target.value);
							}}
							onKeyDown={event => {
								if (event.key === 'Enter') {
									submit();
								}
							}}
						/>
						<Button width='unset'
							style={{
								flex: '1 2',
								marginTop: '16px',
								maxWidth: '150px'
							}}
							disabled={status === 'correct'}
							onClick={submit}>
							SUBMIT
						</Button>
					</div>
					{status && status !== 'no attempt' &&
						<Text color={Colors.White} weight="700">
							{status === 'correct' && <CorrectLabel />}
							{status === 'incorrect' && <IncorrectLabel />}
							{status === 'pending' && <PendingLabel />}
						</Text>
					}
					{errorMessage && <Text error>{errorMessage}</Text>}
				</div>
				<div
					id='score-box'
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
						@media screen and (max-width: ${Screens.small}px) {
							order: -1;
						}
					`}
				>
					<Text weight="700" color={Colors.White}>
						SCORE
					</Text>
					<Text weight="700" color={Colors.White} size="30px">
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
