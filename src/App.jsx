import React, { useState, useEffect } from 'react'

//Components
import Input from './components/Input'
import Icon from './components/IconButton'
import ListTodos from './components/ListTodos'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './assets/themes/themes'

//Icons
import addIcon from './assets/icons/add.png'
import deleteAllIcon from './assets/icons/delete-all.png'
import editIcon from './assets/icons/edit.png'
import darkModeIcon from './assets/icons/dark-mode.png'
import cancelIcon from './assets/icons/cancel.png'

import './App.css'

function App() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [input, setInput] = useState('')
  const [newInput, setNewInput] = useState('')
  const [edit, setEdit] = useState(false)
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false)

  useEffect(() => localStorage.setItem('data', JSON.stringify([...list])), [list])
  useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

  //CRUD
  const createTodo = () => {
    if (!input.trim()) return alert('Empty field');
    if (existsInList(input)) return alert('Item already in the list!');

    let obj = { id: Math.random() + 1, description: input, done: false }
    setList([obj, ...list]);
    setInput('')
  }

  const existsInList = (value) => list.some(item => item.description.toLowerCase() === value.toLowerCase());

  const updateTodo = () => {
    if (!newInput.trim()) return alert('Empty field')
    if (existsInList(newInput)) return alert('Item already in the list!');

    list.map((todo, i) => (todo.id === edit) ? list[i] = { id: edit, description: newInput, done: false } : '')

    setEdit(false);
    setNewInput('')
    setList([...list])
  }

  const deleteTodo = (id) => setList(list.filter(item => (item.id !== id)));

  const deleteAllData = () => {
    if (!list.length) return alert('No items to delete')

    if (window.confirm('Are you sure you want to delete all items?')) {
      setList([]);
      localStorage.clear();
    }
  }

  const markAsDone = (id) => {
    setList(list.map((todo, i) => (todo.id === id) ? list[i] = { ...list[i], done: true } : { ...list[i] }))
  }

  const darkModeTheme = () => setDarkMode(prev => !prev);

  //Handle Input
  const handleInputChange = (e) => setInput(e.target.value);
  const handleNewInputChange = (e) => setNewInput(e.target.value);
  const handleEnterKeyAdd = (e) => (e.key === 'Enter') ? createTodo() : null;
  const handleEnterKeyRename = (e) => (e.key === 'Enter') ? updateTodo() : null;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />

      <div className="add-todos">
        <Input input={input} changeInput={handleInputChange} name="Add Todo" enterKey={handleEnterKeyAdd} />

        <div className="icons">
          <Icon function={createTodo} icon={addIcon} msg={'Add todo'} />
          <Icon function={deleteAllData} icon={deleteAllIcon} msg={'Delete All todos'} />
          <Icon function={darkModeTheme} icon={darkModeIcon} msg={`Dark mode: ${darkMode ? 'on' : 'off'}`} />
        </div>
      </div>

      <ListTodos todos={list} done={markAsDone} edit={setEdit} deleteItem={deleteTodo} />

      {edit && (
        <div className="rename">
          <Input input={newInput} changeInput={handleNewInputChange} name="Rename" enterKey={handleEnterKeyRename} />
          <Icon function={updateTodo} icon={editIcon} msg={'Update todo'} />
          <Icon function={() => setEdit(false)} icon={cancelIcon} msg={'Cancel'} />
        </div>
      )}
    </ThemeProvider>
  )
}

export default App