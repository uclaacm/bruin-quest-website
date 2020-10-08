import React, { useState, useEffect } from "react";
import axios from "axios";
import { css } from "emotion";
import Text from "../../Text/Text";
import TextInput from "../../TextInput/TextInput";
import Button from "../../Button/Button";
import * as Colors from "../../../constants/Colors";
import { PUZZLE_SERVER, USER_SERVER } from "../../../components/Config";

function CorrectLabel() {
	return (
		<>
			{" "}
			<span role="img" aria-label="green check mark">
				✅
			</span>{" "}
			Correct
		</>
	);
}

function IncorrectLabel() {
	return (
		<>
			{" "}
			<span role="img" aria-label="red x mark">
				❌
			</span>{" "}
			Incorrect
		</>
	);
}

function PendingLabel() {
	return (
		<>
			{" "}
			<span role="img" aria-label="hourglass">
				⏳
			</span>{" "}
			Pending
		</>
	);
}

function getPuzzleData(id) {
	return axios.get(`${PUZZLE_SERVER}/${id}`);
}

function submit(submission, puzzleId) {
	return axios.post(`${USER_SERVER}/submitPuzzle/${puzzleId}`, { submission });
}

function PuzzlePage(props) {
	const [puzzleData, setPuzzleData] = useState();
	const [submission, setSubmission] = useState("");
	const [score, setScore] = useState(0);
	const [status, setStatus] = useState("no attempt");
	useEffect(() => {
		async function fetchData() {
			const { data } = await getPuzzleData(props.match.params.id);
			if (data) {
				setPuzzleData(data);
				setSubmission(data.submission);
				setScore(data.score);
				setStatus(data.status);
			}
		}
		fetchData();
	}, [props.match.params.id]);
	return puzzleData &&
		puzzleData.displayName &&
		puzzleData.description &&
		puzzleData.difficulty &&
		puzzleData.generalArea ? (
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
						style={{ fontStyle: "italic" }}
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
							onChange={(event) => {
								setSubmission(event.target.value);
							}}
						/>
						<Button
							style={{ marginLeft: "10px" }}
							onClick={async () => {
								const response = await submit(
									submission,
									props.match.params.id
								);
								const { data } = response;
								if (data) {
									setSubmission(data.submission);
									setScore(data.score);
									setStatus(data.status);
								}
							}}
						>
							SUBMIT
						</Button>
					</div>
					{status && status !== "no attempt" && (
						<Text color={Colors.White} weight="900">
							{status === "correct" && <CorrectLabel />}
							{status === "incorrect" && <IncorrectLabel />}
							{status === "pending" && <PendingLabel />}
						</Text>
					)}
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
		</div>
	) : (
		<div>Loading</div>
	);
}

export default PuzzlePage;
