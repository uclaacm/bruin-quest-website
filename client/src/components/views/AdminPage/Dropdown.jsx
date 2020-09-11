import React, { Component } from 'react';
import DropdownRow from './DropdownRow'
import SubmissionRow from './SubmissionRow'
import './styles.css'

export default class Dropdown extends Component {
  constructor() {
    super();
        
    this.getPuzzles();
    
    this.state = {
      showMenu: false,
      selected: this.puzzles[0]
    };

  }

  renderDropdownRow = (item) => {
    return(
      <DropdownRow item={item} changeSelection={this.showMenu} showTriangle={false}/>
    );
  }

  renderSubmissionRow = (item) => {
    return(
      <SubmissionRow submission={item}/>
    );
  }

  getPuzzles() {
    // Mock data for now. This will be replaced with API call.
    this.puzzles = [
      { "name": "Puzzle 1", "submissions": [{"link": "a"}, {"link": "aewe"}, {"link": "sd"}] },
      { "name": "Puzzle 2", "submissions": [{"link": "a"}, {"link": "123"}, {"link": "ads"}] },
      { "name": "Puzzle 3", "submissions": [{"link": "a"}, {"link": "avv"}, {"link": "c"}] },

    ];
  }
  
  showMenu = (event, item) => {
    event.preventDefault();
    
    this.setState({ showMenu: true, selected: item }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu = (event) => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
    }
  }

  render() {
    return (
      <div className="dropdown">
        <DropdownRow item={this.state.selected} changeSelection={this.showMenu} showTriangle={true}>
        </DropdownRow>
        {
          this.state.showMenu
            ? (
              <div
                className="dropdown"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                {this.puzzles.map(this.renderDropdownRow)}
              </div>
            )
            : (
              this.state.selected.submissions.map(this.renderSubmissionRow)
            )
        }
      </div>
    );
  }
}