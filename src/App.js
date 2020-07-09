import React from 'react';
import Autocomplete from './Components/Autocomplete/Autocomplete'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Search me!</h1>
        <Autocomplete />
      </header>
    </div>
  );
}

export default App;
