import React from 'react';
import linelist from '../data/linelist.json';
import edgesData from '../data/distance.json';
import dijkstra from '../dijkstra';

dijkstra.addEdges(edgesData);

class SelcetLine extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onLineChange(e);
    }

    render() {
        const options = linelist.map(
            (line) =>
                <option value={line.id} key={line.id}>{line.chinese} </option>
        );
        return (
            <select className="form-control" name={this.props.name} value={this.props.line} onChange={this.handleChange}>{options}</select>
        )
    }
}
class SelcetStation extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onStaionChange(e);
    }

    render() {
        const options = this.props.stations.map((station, index) => <option value={station} key={index}>{station}</option>);
        return (
            <select className="form-control" name={this.props.name} value={this.props.station} onChange={this.handleChange}>
                {options}
            </select>
        )
    }
}
export default class SubwayForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleLineStartChange = this.handleLineStartChange.bind(this);
        this.handleLineEndChange = this.handleLineEndChange.bind(this);
        this.handleStaionStartChange = this.handleStaionStartChange.bind(this);
        this.handleStaionEndChange = this.handleStaionEndChange.bind(this);
    }

    handleLineStartChange(e) {
        this.props.onLineStartChange(e);
    }

    handleLineEndChange(e) {
        this.props.onLineEndChange(e);
    }

    handleStaionStartChange(e) {
        this.props.onStaionStartChange(e);
    }

    handleStaionEndChange(e) {
        this.props.onStaionEndChange(e);
    }
    render() {
        //查询特定线路的staions
        let lineStartStations = linelist.find((line) => {
            return line.id == this.props.lineStart;
        }).stations;

        let lineEndStaions = linelist.find((line) => {
            return line.id == this.props.lineEnd;
        }).stations;

        let start = this.props.stationStart;
        let end = this.props.stationEnd;

        //返回最短路径并向上取整
        let text = <span>{start}到{end}的最短路径:{Math.ceil(dijkstra.shortestPath(start, end))}KM</span>

        return (
            <div className="form-subway">
                <form className=" form-inline bg-info" action="index.html" method="get">
                    <label>起始站</label>
                    <SelcetLine onLineChange={this.handleLineStartChange} name="lineStart" line={this.props.lineStart} />
                    <SelcetStation onStaionChange={this.handleStaionStartChange} name="stationStart" stations={lineStartStations} station={this.props.stationStart} />
                    <br />
                    <label>终点站</label>
                    <SelcetLine onLineChange={this.handleLineEndChange} name="lineEnd" line={this.props.lineEnd} />
                    <SelcetStation onStaionChange={this.handleStaionEndChange} name="stationEnd" stations={lineEndStaions} station={this.props.stationEnd} />
                    <br />
                    {text}
                    <input className="btn btn-info" type="submit" />
                </form>
            </div>
        )
    }

}
