var firstDiceNumber = Math.floor(Math.random() * 6 + 1);
var secondDiceNumber = Math.floor(Math.random() * 6 + 1);

var firstDiceImgPath = "images/dice" + firstDiceNumber + ".png";
var secondDiceImgPath = "images/dice" + secondDiceNumber + ".png";

document.querySelector(".img1").setAttribute("src", firstDiceImgPath);
document.querySelector(".img2").setAttribute("src", secondDiceImgPath);

if (firstDiceNumber > secondDiceNumber) {
  document.querySelector("h1").innerHTML = "🚩Player 1 Wins";
} else if (secondDiceNumber > firstDiceNumber) {
  document.querySelector("h1").innerHTML = "Player 1 Wins🚩";
} else {
  document.querySelector("h1").innerHTML = "Draw";
}
