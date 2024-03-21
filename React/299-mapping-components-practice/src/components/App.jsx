import React from "react";
import emojipedia from "../emojipedia";
import Entry from "./Entry";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map((entry, key) => (
          <Entry
            emoji={entry.emoji}
            emojiName={entry.name}
            emojiDesc={entry.meaning}
          />
        ))}
      </dl>
    </div>
  );
}

export default App;
