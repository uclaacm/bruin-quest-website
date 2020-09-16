import React, { Component } from 'react';
import DropdownRow from './DropdownRow'
import SubmissionRow from './SubmissionRow'
import { css } from 'emotion';

const dropdown = css`
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 80vw;
`;

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
        
    this.getDropdown(this.props.type);
    
    this.state = {
      showMenu: false,
      selected: this.items[0]
    };

  }

  renderRow = (item) => {
    return(
      <SubmissionRow item={item} score={this.score}/>
    );
  }

  getDropdown(type) {
    switch (type) {
      case "puzzles": 
        this.getPuzzles();
        break;
      case "teams":
        this.getTeams();
        break;
      case "controls":
        this.getControls();
        break;
    }
  }

  getPuzzles() {
    // Mock data for now. This will be replaced with API call.
    this.items = [
      { "id": "123", "name": "Puzzle 1", "items": [{"link": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"link": "aewe"}, {"link": "sd"}] },
      { "id": "123", "name": "Puzzle 2", "items": [{"link": "a"}, {"link": "123"}, {"link": "ads"}] },
      { "id": "123", "name": "Puzzle 3", "items": [{"link": "a"}, {"link": "avv"}, {"link": "c"}] },
    ];
  }

  getTeams() {
    this.items = [
      { "name": "Team kookie", "items": [{"playerName": "cookie", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"playerName": "aewe", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"playerName": "sd", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}] },
      { "name": "Team bookie", "items": [{"playerName": "a", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"playerName": "123", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"playerName": "ads", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}] },
      { "name": "Team cookie", "items": [{"playerName": "a", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"playerName": "avv", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}, {"playerName": "c", "discord": "https://github.com/uclaacm/bruin-quest-website/tree/master/client"}] },
    ];
  }

  getControls() {
    this.items = [
      {"name": "Stop game", "items": []}
    ]
  }

  score(item) {
    // Will need team id in the item in order to score
  }
  
  showMenu = (event, item) => {
    event.preventDefault();
    
    this.setState({ showMenu: true, selected: item }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu = (event) => {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
  }

  render() {
    return (
      <div className={dropdown}>
        <DropdownRow item={this.state.selected} changeSelection={this.showMenu} showTriangle={true}/>
        {
          this.state.showMenu
            ? (
              <div className={dropdown}>
                {
                  this.items.map(item => 
                    <DropdownRow 
                      item={item}
                      changeSelection={this.showMenu}
                      showTriangle={false}
                    />
                  )
                }
              </div>
            )
            : (
              null
            )
        }
        {this.state.selected.items.map(this.renderRow)}
      </div>
    );
  }
}