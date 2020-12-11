import React, { useState, useEffect } from 'react'

//Components
import Input from './components/Input'
import Icon from './components/IconImg'
import ListTodos from './components/ListTodos'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './assets/themes/themes'

//Logic
import Validation from './helpers/Validation'
import ImportExport from './helpers/ImportExport'

//Icons
import addIcon from './assets/icons/add.png'
import deleteAllIcon from './assets/icons/delete-all.png'
import editIcon from './assets/icons/edit.png'
import darkModeIcon from './assets/icons/dark-mode.png'
import cancelIcon from './assets/icons/cancel.png'
import ImportIcon from './assets/icons/import.svg'
import ExportIcon from './assets/icons/export.svg'

import './App.css'

function App() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('data')) || [])
  const [input, setInput] = useState('')
  const [newInput, setNewInput] = useState('')
  const [edit, setEdit] = useState(false)
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')) || false)

  const { isFieldEmpty, existsInList, nothingToDelete, existsTodosToDelete } = Validation()

  const { Import, Export } = ImportExport()

  useEffect(() => localStorage.setItem('data', JSON.stringify([...list])), [list])
  useEffect(() => localStorage.setItem('darkMode', JSON.stringify(darkMode)), [darkMode])

  //CRUD
  const createTodo = () => {
    if (isFieldEmpty(input) || existsInList(input, list)) return;

    let obj = { id: Math.random() + 1, description: input, done: false }
    setList([obj, ...list]);
    setInput('')
  }

  const updateTodo = () => {
    if (isFieldEmpty(newInput) || existsInList(newInput, list)) return;

    list.map((todo, i) => (todo.id === edit) ?
      list[i] = { id: edit, description: newInput, done: false } : todo)

    setEdit(false);
    setNewInput('')
    setList([...list])
  }

  const deleteTodo = (id) => setList(list.filter(item => (item.id !== id)));

  const deleteAllTodos = () => nothingToDelete(list) || existsTodosToDelete(setList)

  const markAsDone = (id) => {
    setList(list.map((todo, i) => (todo.id === id) ? list[i] = { ...list[i], done: true } : { ...list[i] }))
  }
  // Dark Mode
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
        <Input input={input} changeInput={handleInputChange} name="Press Enter to add a todo" enterKey={handleEnterKeyAdd} />
      </div>

      <div className="buttons">
        <div className="icons">
          <Icon function={createTodo} icon={addIcon} msg={'Add todo'} />
          <Icon function={deleteAllTodos} icon={deleteAllIcon} msg={'Delete All todos'} />
          <Icon function={darkModeTheme} icon={darkModeIcon} msg={`Dark mode: ${darkMode ? 'on' : 'off'}`} />

          <input type="file" id="file" onChange={e => Import(e.target.files[0])} accept='application/JSON' />
          <label htmlFor="file"><img className="icon" src={ImportIcon} title="Import" /></label>

          <a href={Export(list)} download='todos.json'><img className="icon" src={ExportIcon} title="Export" /></a>
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