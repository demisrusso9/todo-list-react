import React from 'react'

export default (props) => {
    return (
        <input className="input"
            type="text"
            value={props.input}
            onChange={props.mudarInput} autoFocus/>
    );
}