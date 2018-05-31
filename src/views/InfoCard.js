import React from 'react';

export default class InfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleStaionStartChange = this.handleStaionStartChange.bind(this);
        this.handleStaionEndChange = this.handleStaionEndChange.bind(this);
    }

    handleClose(e) {
        this.props.onToDefault(e);
    }

    handleStaionStartChange(e) {
        this.props.onStaionStartChange(e);
    }

    handleStaionEndChange(e) {
        this.props.onStaionEndChange(e);
    }


    render() {

        let style = {
            'display': 'none'
        };

        this.props.isOpen ? style = {
            'display': 'block',
            'position': 'absolute',
            'left': this.props.stationPosition.x,
            'top': this.props.stationPosition.y
        } : false;

        return (
            <div className="panel panel-default info-card" style={style}>
                <div className="panel-heading">{this.props.stationName}
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={this.handleClose}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="panel-body">
                    <div className="btn-group" role="group" aria-label="...">
                        <button type="button" className="btn btn-default" onClick={this.handleStaionStartChange}>设为起始站</button>
                        <button type="button" className="btn btn-default" onClick={this.handleStaionEndChange} >设为终点站</button>
                    </div>
                </div>
            </div>
        )
    }
}