import React from 'react'
import { mem as memoryData } from 'systeminformation'
import leftPad from 'left-pad'
import SvgIcon from '../utils/svg-icon'

class PluginIcon extends React.PureComponent {
  render() {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g className='memory-icon'>
            <g id="memory" transform="translate(1.000000, 1.000000)">
              <path d="M3,0 L11,0 L11,14 L3,14 L3,0 Z M4,1 L10,1 L10,13 L4,13 L4,1 Z" />
              <rect x="5" y="2" width="4" height="10" />
              <rect x="12" y="1" width="2" height="1" />
              <rect x="12" y="3" width="2" height="1" />
              <rect x="12" y="5" width="2" height="1" />
              <rect x="12" y="9" width="2" height="1" />
              <rect x="12" y="7" width="2" height="1" />
              <rect x="12" y="11" width="2" height="1" />
              <rect x="0" y="1" width="2" height="1" />
              <rect x="0" y="3" width="2" height="1" />
              <rect x="0" y="5" width="2" height="1" />
              <rect x="0" y="9" width="2" height="1" />
              <rect x="0" y="7" width="2" height="1" />
              <rect x="0" y="11" width="2" height="1" />
            </g>
          </g>
        </g>

        <style jsx>{`
          .memory-icon {
            fill: #4E6F83;
          }
        `}</style>

      </SvgIcon>
    )
  }
}

function getColor(percentage) {
  if (percentage > 90) {
    return '#FF3C3F'
  } else if (percentage > 70) {
    return '#FD6F6B'
  } else if (percentage > 55) {
    return '#FFBB00'
  } else if (percentage > 30) {
    return '#EE9848'
  } else {
    return '#34E280'
  }
}

export default class Memory extends React.PureComponent {
  static displayName() {
    return 'memory'
  }

  constructor(props) {
    super(props)

    this.state = {
      activeMemory: 0,
      totalMemory: 0,
      color: '#34E280'
    }

    this.getMemory = this.getMemory.bind(this)
    this.setMemory = this.setMemory.bind(this)
  }

  componentDidMount() {
    this.setMemory()
    this.interval = setInterval(() => this.setMemory(), 2500)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getMemory() {
    return memoryData().then(memory => {
      const totalMemory = this.getGb(memory.total, 0)
      const activeMemory = this.getGb(memory.active)
      const percentage = Math.floor((activeMemory / totalMemory) * 100)

      return {
        activeMemory: activeMemory,
        totalMemory,
        color: getColor(percentage)
      }
    })
  }

  setMemory() {
    return this.getMemory().then(data => this.setState(data))
  }

  getMb(bytes) {
    // 1024 * 1024 = 1048576
    return (bytes / 1048576).toFixed(0)
  }

  getGb(bytes, precision = 2) {
    // 1024 * 1024 * 1024 = 1073741824
    return (bytes / 1073741824).toFixed(precision)
  }

  render() {
    return (
      <div className='wrapper' style={{color: this.state.color}}>
        <PluginIcon /> {this.state.activeMemory}GB / {this.state.totalMemory}GB

        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
