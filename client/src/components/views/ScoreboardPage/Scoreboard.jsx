import React, { Component } from 'react';
import './styles.css';
import TableRow from './TableRow'

export default class Scoreboard extends Component {
  renderTableRow = score => (
    <tr>
      <td>
        <TableRow name={score.name} score={score.score}/>
      </td>
    </tr>
  )

  render() {
    return(
      <div className="table-container">
        <span className="table-text">{this.props.title}</span>
        <table>
          {this.props.scores.map(this.renderTableRow)}
        </table>
      </div>
    )
  }
}