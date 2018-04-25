/* eslint no-undef: 0 */
// Note: This is to stop XO from complaining about {navigator}

import React from 'react'
import leftPad from 'left-pad'
import BatteryIcon from './battery/battery-icon'

function getColor(percentage, charging) {
  if (charging) {
    return '#FFBB00'
  } else if (percentage > 75) {
    return '#34E280'
  } else if (percentage > 50) {
    return '#EE9848'
  } else if (percentage > 25) {
    return '#F2C449'
  } else if (percentage > 10) {
    return '#FD6F6B'
  } else {
    return '#FF3C3F'
  }
}

export default class Battery extends React.PureComponent {
  static displayName() {
    return 'battery'
  }

  constructor(props) {
    super(props)

    this.state = {
      charging: false,
      percentage: '--',
      color: '#34E280'
    }

    this.batteryEvents = [ 'chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange' ]
    this.handleEvent = this.handleEvent.bind(this)
  }

  setBatteryStatus(battery) {
    const level = Math.floor(battery.level * 100)
    this.setState({
      charging: battery.charging,
      percentage: level,
      color: getColor(level, battery.charging)
    })
  }

  handleEvent(event) {
    this.setBatteryStatus(event.target)
  }

  componentDidMount() {
    navigator.getBattery().then(battery => {
      this.setBatteryStatus(battery)

      this.batteryEvents.forEach(event => {
        battery.addEventListener(event, this.handleEvent, false)
      })
    })
  }

  componentWillUnmount() {
    navigator.getBattery().then(battery => {
      this.batteryEvents.forEach(event => {
        battery.removeEventListener(event, this.handleEvent)
      })
    })
  }

  render() {
    const { charging, percentage } = this.state

    return (
      <div
        style={{
          color: this.state.color
        }}
        className='wrapper'>
        <BatteryIcon charging={charging} percentage={Number(percentage)} /> {leftPad(percentage, 2, 0)}%

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
