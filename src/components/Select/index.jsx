import React from 'react'

import './style.css'

function Select(props) {
    return (
        <select className="select-items" onChange={props.status}>
            <option hidden>Selecionar</option>
            <option value="all">Todos</option>
            <option value="todo">A fazer</option>
            <option value="done">Feito</option>
        </select>
    )
}

export default Select
