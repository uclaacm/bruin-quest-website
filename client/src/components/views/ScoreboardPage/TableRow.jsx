import React from 'react';
import './styles.css';

export default function TableRow(props) {
    return(
      <div className="table-row-container">
        <span className="table-text">{props.name}</span>
        <span className="table-text">{props.score}</span>
      </div>
    );
}
