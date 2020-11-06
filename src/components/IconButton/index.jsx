import React from 'react'

import './style.css'

function IconButton(props) {
  return <img className="icon" onClick={props.function} src={props.icon} alt={props.name} title={props.msg}/>
}

export default IconButton
