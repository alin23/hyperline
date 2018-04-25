import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from '../../utils/svg-icon'

function getColor(percentage) {
  if (percentage > 75) {
    return '#34E280'
  } else if (percentage > 50) {
    return '#EE9848'
  } else if (percentage > 25) {
    return '#FFBB00'
  } else if (percentage > 10) {
    return '#FD6F6B'
  } else {
    return '#FF3C3F'
  }
}

export default class Draining extends React.PureComponent {
  static propTypes() {
    return {
      percentage: PropTypes.number
    }
  }

  calculateChargePoint(percent) {
    const base = 3.5,
      val = Math.round((100 - percent) / 4.5),
      point = base + (val / 2)

    return val > 0 ? `M5,3 L11,3 L11,${point} L5,${point} L5,3 Z` : ''
  }

  render() {
    const chargePoint = this.calculateChargePoint(this.props.percentage)
    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className='cpu-discharging-icon' style={{fill: getColor(this.props.percentage)}}>
            <path d={`M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z ${chargePoint}`}></path>
          </g>
        </g>
      </SvgIcon>
    )
  }
}
