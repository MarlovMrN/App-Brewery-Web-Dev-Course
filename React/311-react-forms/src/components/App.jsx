import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    /// do whatever is needed
    console.log("form submitted");
    event.preventDefault();
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div className="container">
      <h1>Hello {name} </h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="What's your name?"
          value={name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
