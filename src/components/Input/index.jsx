import React from 'react'

function Input(props) {
   return (
      <input className="input-search"
         type="text"
         value={props.input}
         onChange={props.changeInput}
         onClick={props.function}
         placeholder={props.name}     
         onKeyDown={props.enterKey}          
         />
   )
}

export default Input