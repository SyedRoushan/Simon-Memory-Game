var buttonColors = ["green", "red", "yellow", "blue"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChoosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChoosenColor);

  level++;

  $("#level-title").text("Level " + level);

}

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");

  sound.play();
}

function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
