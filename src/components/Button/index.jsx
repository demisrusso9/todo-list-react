import React from 'react'

function Button(props) {
  return (
    <button onClick={props.function}>{props.name}</button>
  )
}

export default Button
