import { useState } from "react";

function ToDoItem(props) {
  const [crossed, setCrossed] = useState(false);

  function handleClick() {
    setCrossed(!crossed);
  }
  function handleDelete() {
    props.onDelete(props.id);
  }

  return (
    <li>
      <span
        onClick={handleClick}
        style={{
          textDecorationLine: crossed ? "line-through" : "none",
        }}
      >
        {props.item}
      </span>
      <span onClick={handleDelete}>🗑️</span>
    </li>
  );
}

export default ToDoItem;
