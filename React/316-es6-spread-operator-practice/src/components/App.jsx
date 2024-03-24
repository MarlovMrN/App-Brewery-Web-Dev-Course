import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [todoItems, setTodoItems] = useState([]);

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleClick(event) {
    if (input.trim()) setTodoItems([...todoItems, input.trim()]);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={input} />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {todoItems.map((item, key) => (
            <li key={key}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
