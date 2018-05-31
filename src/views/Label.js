import React from 'react'
import labels from '../data/labels.json'


export default function asyncLabel(importComponet) {
  class Label extends React.Component {
    constructor() {
      super();
      this.state = {
        component: null
      }
    }

    componentDidMount() {
      const { default: component } = importComponet();
      this.setState({
        component: component
      })
    }

    render() {
      const labelElements = [];
      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        labelElements.push(<text className="label" line={label.line} x={label.x} y={label.y} key={label.text + i}>{label.text}</text>);
      }
      return (
        <g>{labelElements}</g>
      )
    }
  }
  return Label;
}