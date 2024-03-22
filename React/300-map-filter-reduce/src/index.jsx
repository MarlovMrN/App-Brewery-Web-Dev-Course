import emojipedia from "./emojipedia";

//Map -Create a new array by doing something with each item in an array.
const onlyMeaning = emojipedia.map((entry) => entry.meaning.substring(0, 100));

console.log(onlyMeaning);

//Filter - Create a new array by keeping the items that return true.

const filtered = emojipedia.filter((entry) => entry.meaning.includes("pray"));

console.log(filtered);

//Reduce - Accumulate a value by doing something to each item in an array.

const initialValue = "";
const reduced = emojipedia.reduce(
  (accumulator, entry) => accumulator.concat(entry.emoji),
  initialValue
);

console.log(reduced);

//Find - find the first item that matches from an array.

const find = emojipedia.find((entry) => entry.emoji === "💪");

console.log(find);

//FindIndex - find the index of the first item that matches.

const index = emojipedia.findIndex((entry) => entry.emoji === "💪");

console.log(index);
