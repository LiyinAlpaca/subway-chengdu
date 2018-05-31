import React, { Component } from 'react';
import Map from './views/Map';
import './styles/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">    
        <Map />
      </div>
    );
  }
}

export default App;
