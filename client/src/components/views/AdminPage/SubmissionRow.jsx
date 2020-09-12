import React, { Component } from 'react';
import { css } from 'emotion';
import * as Colors from '../../../constants/Colors';
import Text from '../../Text/Text';
import TextInput from '../../TextInput/TextInput';
import Button from '../../Button/Button';

export default class SubmissionRow extends Component {
	render() {
		return (
			<div
				className={css`
          display: flex;
          justify-content: space-between;
          width: 80vw;
        `}
			>
				<a
					href={this.props.submission.link}
					className={css`
						color: ${Colors.Blue};
						font-size: 1rem;
            text-decoration: underline;
            width: 30vw;
					`}
				>
					{this.props.submission.link}
				</a>
				<TextInput />
				<Button>Score!</Button>
			</div>
		);
	}
}
