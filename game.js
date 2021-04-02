var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keydown(function() {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function(event) {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  // console.log(userClickedPattern);
});

// Start the game by selecting a random colour

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  $("h1").text("Level " + level);
  var randomNumber = (Math.floor(Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("h1").text("Gave Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    playSound("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  gameStarted = false;
}
