import React, { Component } from 'react';
import { css } from 'emotion';
import Text from '../../Text/Text';

export default class DropdownRow extends Component {

  onClick = (event) => {
    this.props.changeSelection(event, this.props.item);
  }

  render() {
    return (
      <div 
        className={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 7px solid #005587;
          width: 80vw;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={this.onClick}>
        <Text 
          className={css`
            text-align: center;
            font-size: 2.5rem;
            font-family: Poppins; 
          `}
        >
          {this.props.item.name}
        </Text>
        {this.props.showTriangle ? <img src={require('./assets/triangle.png')} /> : null}
      </div>
    );
  }
}