import React, { useState, useEffect } from 'react'

import Icon from '../IconButton'
import SearchTodos from '../SearchTodos'

import doneIcon from '../../assets/icons/done.png'
import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/delete.png'

import './style.css'

function List(props) {
   const [view, setView] = useState()

   useEffect(() => {
      listTodos(props.todos)
   }, [props.todos])

   const listTodos = (todos) => setView(
      <div className="list">
         {todos.map(todo => (
            <div key={todo.id} className={todo.done ? 'item item-done' : 'item'}>
               <p>{todo.description}</p>

               <div className="item-icons">
                  <Icon function={() => props.done(todo.id)} icon={doneIcon} msg={'Mark as done'}/>
                  <Icon function={() => props.edit(todo.id)} icon={editIcon} msg={'Edit todo'}/>
                  <Icon function={() => props.deleteItem(todo.id)} icon={deleteIcon} msg={'Delete todo'}/>
               </div>
            </div>
         ))}
      </div>
   )

   return (
      <>
         <SearchTodos todos={props.todos} listTodos={listTodos} />
         {view}
      </>
   )
}

export default List