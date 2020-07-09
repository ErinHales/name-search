import React from 'react';
import './Autocomplete.css';
import Fuse from 'fuse.js';
import faker from 'faker';

// --------------- API START --------------

function simulateResponseTime({ min, max }) {
  return Math.floor(Math.random() * (max - min) + min);
}

const users = Array.from({ length: 100 }).map(() => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
});

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

  handleText = (e) => {
    this.setState({text: e.target.value})
    searchUsersByName(e.target.value).then(res => {
      if (res.length > 0) { console.log(res[0].item.name); }
      this.setState({matches: res})
    });
  }

  setName = (name) => {
    this.setState({
      text: name,
      matches: []
    })
  }

  displayNames = (array) => {
    return array.map((person, i) => {
      return <p key={i} onClick={() => this.setName(person.item.name)} className="results__item">{person.item.name}</p>
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleText} value={this.state.text} className="input"/>
        <div className="container">
          { this.state.matches.length > 0 &&
            <div className="results">
              {this.displayNames(this.state.matches)}
            </div>
          }
        </div>
      </div>
    );
  }
}
