import React from 'react';
import './Autocomplete.css';
import Fuse from 'fuse.js';
import faker from 'faker';

// --------------- API START --------------

function simulateResponseTime({ min, max }) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Populates an array of fake names
 * @return {Array}
 */
const users = Array.from({ length: 100 }).map(() => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
});

/**
 * lightweight fuzzy-search
 */
const fuse = new Fuse(users, {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name"]
});

/**
 * Search users by name
 * @param {string} query - The query to search users by
 * @return {Promise<{ name: string; email: string; }[]>} Search result
 */
function searchUsersByName(query) {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(fuse.search(query));
    }, simulateResponseTime({ min: 200, max: 350 }));
  });
}

// ---------------- API END ---------------

export default class Autocomplete extends React.Component {
  state = {
    text:'',
    matches: []
  }

  /**
   * Updates input text
   * Searches database and sets the result to `this.state.matches`
   * @param  {Event} e    The onChange event from typing into the input
   */
  handleText = (e) => {
    this.setState({text: e.target.value})
    searchUsersByName(e.target.value).then(res => {
      if (res.length > 0) { console.log(res[0].item.name); }
      this.setState({matches: res})
    });
  }

  /**
   * Sets the input text to the selected name and clears the search results
   * @param  {String} name    The selected name
   */
  setName = (name) => {
    this.setState({
      text: name,
      matches: []
    })
  }

  /**
   * Maps over the search results and displays the names of each match
   * @return {Array}    JSX array displaying the names of each match
   */
  displayNames = () => {
    return this.state.matches.map((person, i) => {
      return <p key={`${person.item.name}${i}`} onClick={() => this.setName(person.item.name)} className="results__item">{person.item.name}</p>
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleText} value={this.state.text} className="input"/>
        <div className="container">
          { this.state.matches.length > 0 &&
            <div className="results">
              {this.displayNames()}
            </div>
          }
        </div>
      </div>
    );
  }
}
