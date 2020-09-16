import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import Tab from './Tab';

export default class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    return (
      <div>
        <ol 
          className={css`
            display: flex;
          `}
        >
          {this.props.children.map((child) => {
            return (
              <Tab
                activeTab={this.state.activeTab}
                key={child.props.label}
                label={child.props.label}
                onClick={this.onClickTabItem}
              />
            );
          })}
        </ol>
        <div>
          {this.props.children.map((child) => {
            return child.props.label !== this.state.activeTab ? undefined : child.props.children;
          })}
        </div>
      </div>
    );
  }
}