import React from 'react'

import './style.css'

function Select(props) {
    return (
        <select className="select-items" onChange={props.status}>
            <option hidden>Select a option</option>
            <option value="all">All</option>
            <option value="todo">Todo</option>
            <option value="done">Done</option>
        </select>
    )
}

export default Select
