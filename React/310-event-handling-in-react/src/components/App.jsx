import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [btnBackgroundColor, setBtnBackgroundColor] = useState({
    backgroundColor: "white",
  });

  function blackBackground() {
    btnBackgroundColor.backgroundColor = "black";
    setBtnBackgroundColor(btnBackgroundColor);
  }

  function whiteBackground() {
    btnBackgroundColor.backgroundColor = "white";
    setBtnBackgroundColor(btnBackgroundColor);
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        onMouseOver={blackBackground}
        onMouseOut={whiteBackground}
        style={btnBackgroundColor}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
