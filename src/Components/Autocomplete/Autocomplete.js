import React from 'react';
import './Autocomplete.css';

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
    this.setState({text: e.target.value});
    this.props.names.search(e.target.value);
    this.setState({matches: this.props.names.matches});
    console.log('matches', this.props.names.matches)
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
    return this.state.matches.map((name, i) => {
      return <p key={`${name}${i}`} onClick={() => this.setName(name)} className="results__item">{name}</p>
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
