import React, { useState } from 'react';

import Input from './components/Input'
import Button from './components/Button'

import './style.css'

function App() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('data')) || []);

  const [input, setInput] = useState('');
  const [newInput, setNewInput] = useState('');
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    console.log(list);
  }, [list])

  function createTodo(value) {
    if (!value.trim()) return;

    let obj = { id: Math.random() + 1, name: value }

    localStorage.setItem('data', JSON.stringify([...list, obj]))
    setList([...list, obj])
  }

  function deleteTodo(id) {
    setList(list.filter(item => item.id !== id));
  }

  function updateTodo() {
    let array = [...list];

    array.map((item, i) => {
      if (item.id === edit) array[i] = { id: edit, name: newInput }
    })

    setList([...array]);
    setEdit(false)
    setInput('')
    setNewInput('')
  }

  function handleInputValue(e) {
    setInput(e.target.value)
  }

  function handleNewInputValue(e) {
    setNewInput(e.target.value)
  }

  return (
    <>
      <Input input={input} mudarInput={handleInputValue} />
      <Button style="save" name="Add" click={() => createTodo(input)} />

      <div className="list">
        {list.map(item => (
          <p key={item.id}> {item.name}
            <Button style="update" name="Rename" click={() => setEdit(item.id)} />
            <Button style="delete" name="Delete" click={() => deleteTodo(item.id)} />
          </p>
        ))}
      </div>

      {edit && (
        <div>
          <Input input={newInput} mudarInput={handleNewInputValue} />
          <Button style="update" name="Rename" click={() => updateTodo()} />
        </div>
      )}
    </>
  );
}

export default App;