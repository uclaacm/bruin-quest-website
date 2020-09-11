import React, { Component } from 'react';
import './styles.css'

export default class DropdownRow extends Component {

  onClick = (event) => {
    this.props.changeSelection(event, this.props.item);
  }

  render() {
    return (
      <div className="selector" onClick={this.onClick}>
        <span className="middle-text">{this.props.item.name}</span>
        {this.props.showTriangle ? <img src={require('./assets/triangle.png')} /> : null}
      </div>
    );
  }
}