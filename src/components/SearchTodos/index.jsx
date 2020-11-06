import React from 'react'

import Input from '../Input'
import Select from '../Select'

import './style.css'

function SearchTodos(props) {
   const searchTodos = (e) => {
      let value = e.target.value.toLowerCase();
      let filtered = props.todos.filter(todo => (todo.description.toLowerCase().includes(value)));
      props.listTodos(filtered);
   }

   const todoStatus = (e) => {
      let value = e.target.value;

      let todo = props.todos.filter(item => !item.done);
      let done = props.todos.filter(item => item.done);

      if (value === 'all') props.listTodos([...props.todos])
      if (value === 'todo') props.listTodos([...todo])
      if (value === 'done') props.listTodos([...done])
   }

   return (
      <>
         <div className="search-items">
            <Input changeInput={searchTodos} name="Search" />
            <Select status={todoStatus} />
         </div>         
      </>
   )
}

export default SearchTodos
