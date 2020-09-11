import React, { Component } from 'react';
import './styles.css';

export default class SubmissionRow extends Component {
  render() {
    return (
      <div className="submission-row">
        <span className="middle-text"> {this.props.submission.link} </span>
        <input type="text" name="score" />
        <button>Score!</button>
      </div>
    );
  }
}