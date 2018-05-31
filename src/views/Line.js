import React from 'react'
import linePath from '../data/Data'
import { lineColor } from '../data/Data'

class Line extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const target = e.target.getAttribute('line');
    //点击后隐藏未点击的线路
    const lines = document.getElementsByClassName('line');
    const stations = document.getElementsByClassName('station');
    const labels = document.getElementsByClassName('label');

    for (let i = 0; i < lines.length; i++) {
      lines[i].style.display = "none";
      lines[i].getAttribute('line') == target ? lines[i].style.display = "inline" : false;
    };

    for (let i = 0; i < stations.length; i++) {
      stations[i].style.display = "none";
      stations[i].getAttribute('line') == target ? stations[i].style.display = "inline" : false;
    };

    for (let i = 0; i < labels.length; i++) {
      labels[i].style.display = "none";
      labels[i].getAttribute('line') == target ? labels[i].style.display = "inline" : false;
    };

  }
  render() {
    const linePaths = [];

    for (const key in linePath) {
      const line = key;
      const path = linePath[key];
      const lineNum = key.match(/\d+/)[0];
      const color = lineColor[lineNum];

      linePaths.push(
        <path className="line" line={key}
          d={path} fill="none" strokeWidth="12" stroke={color} key={key} onClick={this.handleClick}>
        </path>
      );
    }

    return (
      <g className="lines">{linePaths}</g>
    )
  }
}

export default Line;
