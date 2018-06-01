import React from 'react';
import Line from './Line';
import SubwayForm from './SubwayForm';
import asyncStation from './Station';
import asyncLabel from './Label';
import InfoCard from './InfoCard';
import AlloyFinger from './AlloyFinger';
import linelist from '../data/linelist.json';

const Station = asyncStation(() => import('./Station'))
const Label = asyncLabel(() => import('./Label'))

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoCard: {
        isOpen: false,
        stationName: '',
        stationPosition: {
          x: 0,
          y: 0
        }
      },
      svg: {
        scale: 1,
        x: 0,
        y: 0
      },
      lineStart: $_get("lineStart") || 1,
      lineEnd: $_get("lineEnd") || 1,
      stationStart: $_get("stationStart") || linelist.find((line) => {
        return line.id == 1;
      }).stations[0],
      stationEnd: $_get("stationEnd") || linelist.find((line) => {
        return line.id == 1;
      }).stations[0]
    };

    this.handleToDefault = this.handleToDefault.bind(this);
    this.handleStaionFocusChange = this.handleStaionFocusChange.bind(this);
    this.handleLineStartChange = this.handleLineStartChange.bind(this);
    this.handleLineEndChange = this.handleLineEndChange.bind(this);
    this.handleStaionStartChange = this.handleStaionStartChange.bind(this);
    this.handleStaionEndChange = this.handleStaionEndChange.bind(this);
    this.handlePinch = this.handlePinch.bind(this);
    this.handlePressMove = this.handlePressMove.bind(this);
  }

  handleToDefault(e) {
    //双击后 回复svg的初始状态
    const lines = document.getElementsByClassName('line');
    const stations = document.getElementsByClassName('station');
    const labels = document.getElementsByClassName('label');

    const linesStyle = "opacity : 1;event-pointers : none";

    for (let i = 0; i < lines.length; i++) {
      lines[i].style.cssText = linesStyle;
    };

    for (let i = 0; i < stations.length; i++) {
      stations[i].style.cssText = linesStyle;
    };

    for (let i = 0; i < labels.length; i++) {
      labels[i].style.cssText = linesStyle;
    };

    this.setState({
      infoCard: {
        isOpen: false,
        stationName: '',
        stationPosition: {
          x: null,
          y: null
        }
      },
      lineFocus: false
    });

  }

  handleStaionFocusChange(e) {
    //Staion点击时获取坐标,显示InfoCard
    const x = e.pageX;
    const y = e.pageY;
    const name = e.target.id;

    this.setState({
      infoCard: {
        isOpen: true,
        stationName: name,
        stationPosition: { x, y }
      }
    });
  }

  handleLineStartChange(e) {
    //更新表单值
    this.setState({ lineStart: e.target.value });
  }

  handleLineEndChange(e) {
    //更新表单值
    this.setState({ lineEnd: e.target.value });
  }

  handleStaionStartChange(e) {
    //更新表单值 -- 获取表单值||获取上一个点击的站点
    let staion = e.target.value || this.state.infoCard.stationName;
    this.setState({ stationStart: staion })
  }

  handleStaionEndChange(e) {
    //更新表单值
    let staion = e.target.value || this.state.infoCard.stationName;
    this.setState({ stationEnd: staion })
  }


  handlePinch(e) {
    //缩放触控
    let scale = (e.scale + this.state.svg.scale) / 2;
    let x = this.state.svg.x;
    let y = this.state.svg.y;

    if (scale > 5) {
      scale = 5
    } else if (scale < 0.5) {
      scale = 0.5
    }

    this.setState({ svg: { scale, x, y } });
  }

  handlePressMove(e) {
    //拖拽触控
    let scale = this.state.svg.scale;
    let x = this.state.svg.x + e.deltaX;
    let y = this.state.svg.y + e.deltaY;
    this.setState({ svg: { scale, x, y } });
  }
  render() {
    let svgStyle = {
      'transform':
        'scale(' + this.state.svg.scale + ') '
        + 'translate('
        + this.state.svg.x + 'px,'
        + this.state.svg.y + 'px)',
    }
    return (
      <div className="map">
        <SubwayForm
          lineStart={this.state.lineStart}
          lineEnd={this.state.lineEnd}
          stationStart={this.state.stationStart}
          stationEnd={this.state.stationEnd}
          onLineStartChange={this.handleLineStartChange}
          onLineEndChange={this.handleLineEndChange}
          onStaionStartChange={this.handleStaionStartChange}
          onStaionEndChange={this.handleStaionEndChange}
        />
        <InfoCard
          isOpen={this.state.infoCard.isOpen}
          stationName={this.state.infoCard.stationName}
          stationPosition={this.state.infoCard.stationPosition}
          onToDefault={this.handleToDefault}
          onStaionStartChange={this.handleStaionStartChange}
          onStaionEndChange={this.handleStaionEndChange}
        />
        {/* 调用腾讯的触控API 可以实现触控功能 */}
        <AlloyFinger
          onDoubleTap={this.handleToDefault}
          onPinch={this.handlePinch}
          onPressMove={this.handlePressMove}
        >
          <svg className="svg"
            viewBox="0 0 2500 2500"
            autoFocus
            onDoubleClick={this.handleToDefault}
            style={svgStyle}
          >
            <Line />
            <Label />
            <Station onStaionFocusChange={this.handleStaionFocusChange} />
          </svg>
        </AlloyFinger>
      </div>

    )
  }
}


export default Map;


//获取URL参数的函数
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return false;
}

function $_get(params) {
  let result = false;
  getQueryVariable(params) ? result = decodeURI(getQueryVariable(params)) : false;
  return result;
}
