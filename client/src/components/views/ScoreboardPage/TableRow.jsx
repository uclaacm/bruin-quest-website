import React, { Component } from 'react';
import './styles.css';

export default class TableRow extends Component {
  render() {
    return(
      <div className="table-row-container">
        <span className="table-text">{this.props.name}</span>
        <span className="table-text">{this.props.score}</span>
      </div>
    )
  }
}