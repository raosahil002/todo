import React, { useState } from 'react';
import './App.css'
const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = {
        id: new Date().getTime(),
        text: input,
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const EditTodo = (id, text) => {
    setEdit(true);
    setEditValue(text);
    setEditId(id);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editId) {
        return { ...todo, text: editValue };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEdit(false);
    setEditId(null);
    setEditValue('');
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <input
        type="text"
        placeholder="Enter Todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add Task</button>
      
      {edit && (
        <div>
          <input
            type="text"
            placeholder="Edit Todo"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button onClick={updateTodo}>Update Task</button>
        </div>
      )}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => EditTodo(todo.id, todo.text)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
