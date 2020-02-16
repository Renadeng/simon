// This version generate one new color based on the previous pattern for each level.

// Setup game level
var gameLevel = 1;
var clickCount = 0;
var matchedColor = 0;
var matchStatus;
var numberOfColorSelected = 0;
var numberOfColorMatched = 0;

// Color buttons array
var gameColors = ["green", "red", "yellow", "blue"];

// Setup random color pattern array
var randomColorPattern = [];

// User select color pattern array
var selectedColorPattern = [];

// Start the game
$(document).keypress(function(){
  $("#level-title").text("Level 1");
  generateColorPattern();
});

// Generate random color pattern
function generateColorPattern() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = gameColors[randomNumber];
  randomColorPattern.push(randomColor);
  showRandomColorPattern();
}

// JS async await
function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Play sounds of all colors in randomColorPattern
async function showRandomColorPattern() {
  for(var i=0; i<gameLevel; i++) {
       btnAnimate(randomColorPattern[i]);
       playSound(randomColorPattern[i]);
       await timer(1000);
   }
  }

// Click to select color and add to selected array
  $(this).click(function(e){
    numberOfColorSelected++;
    var selectedColor = e.target.id;
    selectedColorPattern.push(selectedColor);
    btnAnimate(selectedColor);
    playSound(selectedColor);
    colorPatternMatch();
  });

// Play sound
  function playSound(color) {
    var colorSound = new Audio("sounds/" + color + ".mp3");
    colorSound.play();
  }

// Button animation
function btnAnimate(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function(){
   $("#" + color).removeClass("pressed");
  }, 100);
}

// Match color patterns
function colorPatternMatch() {
  if(selectedColorPattern[numberOfColorSelected-1] !== randomColorPattern[numberOfColorSelected-1]) {
    matchStatus = "failed";
    gameOver();
  }
  else {
    matchStatus = "matched";
    numberOfColorMatched++;
    nextLevel();
  }
}

// Function for game over
function gameOver() {
  playSound("wrong");
  gameLevel = 1;
  randomColorPattern = [];
  selectedColorPattern = [];
  $("#level-title").text("Game over!" + " " + "Press A Key to Start");
  $(".container").addClass("game-over");
  setTimeout(function(){
    $(".container").removeClass("game-over");
  }, 500);
}

// Function for the next Level
function nextLevel() {
  if(numberOfColorMatched === gameLevel) {
    gameLevel++;
    selectedColorPattern = [];
    numberOfColorSelected = 0;
    numberOfColorMatched = 0;
    $("#level-title").text("Level " + gameLevel);
    setTimeout(function(){
      generateColorPattern();
    }, 1000);
  }
}
