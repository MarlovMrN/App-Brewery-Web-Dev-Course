var buttons = document.querySelectorAll(".drum");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var keyPressed = this.innerHTML;
    if (validKey(keyPressed)) {
      playSound(keyPressed);
      buttonAnimation(keyPressed);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (validKey(event.key)) {
    playSound(event.key);
    buttonAnimation(event.key);
  }
});

function playSound(key) {
  switch (key) {
    case "w":
      var audio = new Audio("sounds/tom-1.mp3");
      audio.play();
      break;

    case "a":
      var audio = new Audio("sounds/tom-2.mp3");
      audio.play();
      break;

    case "s":
      var audio = new Audio("sounds/tom-3.mp3");
      audio.play();
      break;

    case "d":
      var audio = new Audio("sounds/tom-4.mp3");
      audio.play();
      break;

    case "j":
      var audio = new Audio("sounds/kick-bass.mp3");
      audio.play();
      break;

    case "k":
      var audio = new Audio("sounds/snare.mp3");
      audio.play();
      break;

    case "l":
      var audio = new Audio("sounds/crash.mp3");
      audio.play();
      break;

    default:
      console.log(key);
  }
}

function buttonAnimation(key) {
  var currentKey = document.querySelector("." + key);
  currentKey.classList.add("pressed");
  setTimeout(function () {
    currentKey.classList.remove("pressed");
  }, 100);
}

function validKey(key) {
  return ["w", "a", "s", "d", "j", "k", "l"].includes(key);
}
