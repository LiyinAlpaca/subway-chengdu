import React, { Component } from 'react';
import Map from './views/Map';
import './styles/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    //禁用移动设备滚动
    // document.body.addEventListener('touchmove', function (event) {
    //   event.preventDefault();
    // }, false); 
  }
  render() {

    return (
      <div className="App">    
        <Map />
      </div>
    );
  }
}

export default App;
