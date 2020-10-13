import React from 'react'

export default (props) => {
    return (
        <button className={`btn ${props.style}`} 
        onClick={props.click}>{props.name}</button>
    );
}