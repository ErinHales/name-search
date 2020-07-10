import React from 'react';
import faker from 'faker';
import Names from './Utils/index.js';
import Autocomplete from './Components/Autocomplete/Autocomplete.js';
import Loader from './Components/Loader/Loader.js';
import './App.css';

/**
 * Populates an array of fake names
 * @return {Array}
 */
const users = Array.from({ length: 5000 }).map(() => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email()
  };
});

/**
 * Gets data from an "API" and populates a trie graph with all the names
 */

// function App() {
export default class App extends React.Component {
  state = {
    names: null,
    loading: true
  }

  /**
   * Gets data from an "API" and populates a trie graph with all the names
   */
  componentDidMount() {
    let names = new Names();
    names.init(users).then(() => {
      console.log('ready');
      this.setState({
        names,
        loading: false
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loading !== nextState.loading;
  }

  /**
   * Conditionally renders loader
   */
  toggleLoader() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <div>
        <h1 className="App-title">Search me!</h1>
        <Autocomplete names={this.state.names} />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          { this.toggleLoader() }
        </header>
      </div>
    )
  }
}
