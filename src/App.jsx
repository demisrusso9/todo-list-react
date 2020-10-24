import React, { useState, useEffect } from 'react'

import Button from './components/Button'
import Input from './components/Input'

function App() {

  const [list, setList] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [input, setInput] = useState('')
  const [newInput, setNewInput] = useState('')
  const [edit, setEdit] = useState(false)
  const [search, setSearch] = useState()

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify([...list]))
    setSearch(listTodos([...list]))
  }, [list])

  //CRUD
  function createTodo() {
    if (!input.trim()) return alert('Campo vazio')

    let obj = { id: Math.random() + 1, description: input, done: false }
    setList([obj, ...list]);
    setInput('')
  }

  function listTodos(todos) {
    return (
      <div>
        {todos.map(todo => (
          <p key={todo.id}>{todo.description}
            <Button function={() => markAsDone(todo.id)} name="Done" />
            <Button function={() => setEdit(todo.id)} name="Rename" />
            <Button function={() => deleteTodo(todo.id)} name="Delete" />
          </p>
        ))}
      </div>
    )
  }

  function updateTodo() {
    list.map((todo, i) => (todo.id === edit) ? list[i] = { id: edit, description: newInput, done: false } : '')

    setEdit(false);
    setNewInput('')
    setList([...list])
  }

  function deleteTodo(id) {
    setList(list.filter(item => (item.id !== id)))
  }

  //Search
  function searchTodos(e) {       
    let value = e.target.value.toLowerCase();
    let filtered = list.filter(todo => (todo.description.toLowerCase().includes(value)));            
    setSearch(listTodos(filtered))
  }

  //LocalStorage
  function deleteAllData() {
    setList([]);
    localStorage.clear();
  }

  function markAsDone(id) {
    let array = list;

    array.map((todo, i) => (todo.id === id) ? array[i] = { ...array[i], done: true } : { ...array[i] })

    setList([...array])
  }

  //Handle Input
  function handleInputChange(e) {
    setInput(e.target.value)
  }

  function handleNewInputChange(e) {
    setNewInput(e.target.value)
  }

  function handleEnterKey(e) {
    if (e.key === 'Enter') createTodo()
  }

  return (
    <>
      <Input input={input} changeInput={handleInputChange} name="Add Todo" enterKey={handleEnterKey} />

      <Button function={createTodo} name="Adicionar" />
      <Button function={deleteAllData} name="Deletar Tudo" />

      <Input changeInput={searchTodos} name="Buscar" />      
      
      {search}
      
      {edit && (
        <div>
          <Input input={newInput} changeInput={handleNewInputChange} name="Rename" />
          <Button function={updateTodo} name="Renomear" />
        </div>
      )}
    </>
  )
}

export default App