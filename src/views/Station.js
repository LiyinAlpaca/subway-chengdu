import React from 'react'
import stations from '../data/stations.json'
// import transfers from '../data/transfers.json'
// import transferPath from '../imgs/transfer.png'

export default function asyncStation(importComponent) {
  class Station extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
      this.props.onStaionFocusChange(e);
    }
    render() {
      const stationEles = [];
      const transferEles = [];


      for (let i = 0; i < stations.length; i++) {
        const station = stations[i];
        stationEles.push(
          <circle
            onClick={this.handleClick}
            className="station" line={station.line}
            cx={station.cx} cy={station.cy} r="8" fill="white"
            stroke={station.stroke} id={station.id} statid={station.statid}
            key={station.id + i}
          />
        )
      }

      return (
        <g>
          {stationEles}
          {/* {transferEles} */}
        </g>
      )
    }
  }
  return Station;
}
