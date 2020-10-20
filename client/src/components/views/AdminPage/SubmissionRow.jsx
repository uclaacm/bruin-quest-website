import React, { useState } from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';

export default function SubmissionRow(props) {
  const [score, setScore] = useState();
	return (
		<div
			className={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 80vw;
        padding: 20px;
      `}
		>
			<a
				href={props.item.submission}
				className={css`
          color: ${Colors.Blue};
          font-size: 1rem;
          text-decoration: underline;
          width: 30vw;
				`}
			>
				{props.item.submission}
			</a>
			<Text> {props.item.score} </Text>
			<TextInput onChange={event => setScore(event.target.value)}/>
			<Button onClick={() => props.score(props.item, score)}>Score!</Button>
		</div>
	);
}
