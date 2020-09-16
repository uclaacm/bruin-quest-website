import React, { Component } from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';

export default function SubmissionRow(props) {
	return (
		<div
			className={css`
        display: flex;
        justify-content: space-between;
        width: 80vw;
        padding: 20px;
      `}
		>
			<a
				href={props.item.link}
				className={css`
          color: ${Colors.Blue};
          font-size: 1rem;
          text-decoration: underline;
          width: 30vw;
				`}
			>
				{props.item.link}
			</a>
			<TextInput />
			<Button onClick={() => props.score(props.item)}>Score!</Button>
		</div>
	);
}
