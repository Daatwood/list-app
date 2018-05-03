import React, { Component } from 'react';
import './App.css';
import ListsContainer from './components/ListsContainer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Just Lists</h1>
          <p>Rails + React</p>
        </header>
        <ListsContainer />
      </div>
    );
  }
}

export default App;
