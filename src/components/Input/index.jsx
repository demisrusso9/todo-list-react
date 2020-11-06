import React from 'react'

import './style.css'

function Input(props) {
   return (
      <input className="input"
         type="text"
         value={props.input}
         onChange={props.changeInput}
         onClick={props.function}
         placeholder={props.name}     
         onKeyDown={props.enterKey} 
         maxLength="60"         
         />
   )
}

export default Input