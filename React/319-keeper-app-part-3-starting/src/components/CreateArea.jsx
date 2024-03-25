import React from "react";

function CreateArea(props) {
  const [note, setNote] = React.useState({ title: "", content: "" });

  return (
    <div>
      <form>
        <input
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          name="title"
          placeholder="Note Title"
          value={note.title}
        />
        <textarea
          onChange={(e) => setNote({ ...note, content: e.target.value })}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={(event) => {
            props.onCreate(note);
            event.preventDefault();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
