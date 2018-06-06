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

    const fadeStyle = "opacity : .1; pointer-events : none;";
    const fcousStyle = "opacity : 1";

    for (let i = 0; i < lines.length; i++) {
      lines[i].style.cssText = fadeStyle;
      lines[i].getAttribute('line') == target ? lines[i].style=fcousStyle : false;
    };

    for (let i = 0; i < stations.length; i++) {
      stations[i].style.cssText = fadeStyle;
      stations[i].getAttribute('line') == target ? stations[i].style=fcousStyle : false;
    };

    for (let i = 0; i < labels.length; i++) {
      labels[i].style.cssText = fadeStyle;
      labels[i].getAttribute('line') == target ? labels[i].style=fcousStyle : false;
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
          d={path} fill="none" strokeWidth="24" stroke={color} key={key} onClick={this.handleClick}>
        </path>
      );
    }

    return (
      <g className="lines">{linePaths}</g>
    )
  }
}

export default Line;
