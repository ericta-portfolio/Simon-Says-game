var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStart = true;
var level = 0;

var userCurrentLevel = 0;

$(document).on("keydown", function () {
  if (gameStart) {
    gameStart = false;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
  else {
  }
});

$(".btn").on("click", function (event) {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(this.id);
  animatePress(this.id);
  checkAnswer(userCurrentLevel);
});

function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  var randNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound (color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStart = true;
  level = 0;
  userCurrentLevel = 0;
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    userCurrentLevel++;
  } else {
    $("h1").text("Game Over, Press Any Key to Restart");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    return;
  }
  if (userCurrentLevel === gamePattern.length) {
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
    userCurrentLevel = 0;
  }
}
