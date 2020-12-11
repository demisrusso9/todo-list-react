import React from 'react'

import './style.css'

function Icon(props) {
  return <img src={props.icon} className="icon" onClick={props.function} title={props.msg} alt={props.name} />
}

export default Icon
