import React from "react";
import notes from "../notes";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";

function App() {
  return (
    <div>
      <Header />
      {notes.map((note) => (
        <Note key={note.key} title={note.title} content={note.content} />
      ))}
      <Footer />
    </div>
  );
}

export default App;