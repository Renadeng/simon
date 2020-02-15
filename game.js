// Setup game level
var gameLevel = 1;
var clickCount = 0;
var matchedColor = 0;
var matchStatus;

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

// // Generate random color pattern
function generateColorPattern() {
  // selectedColorPattern = [];
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = gameColors[randomNumber];
  randomColorPattern.push(randomColor);
  btnAnimate(randomColor);
    // setTimeout(function(){
    //   playSound(randomColor);
    // }, 1000);
  playSound(randomColor);
}

// Click to select color and add to selected array
  $(this).click(function(e){
    var selectedColor = e.target.id;
    selectedColorPattern.push(selectedColor);
    btnAnimate(selectedColor);
    playSound(selectedColor);
    if(selectedColorPattern.length === randomColorPattern.length){
      colorPatternMatch();
    }
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
  for(var i=0; i<gameLevel; i++) {
    if(selectedColorPattern[i] === randomColorPattern[i]) {
      matchStatus = "matched";
    }
    else {
      matchStatus = "failed";
      break;
    }
  }
  gameResult();
}

// Next step after user selected
function gameResult() {
  selectedColorPattern = [];
  randomColorPattern = [];
  if(matchStatus === "matched") {
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    randomColorPattern = [];
    setTimeout(function(){
      for(var i=0; i<gameLevel; i++) {
        setTimeout(function(){
          generateColorPattern();
        }, 1000*i);
      }
    }, 1000);
    // selectedColorPattern = [];
  }
  else {
    playSound("wrong");
    gameLevel = 1;
    $("#level-title").text("Press A Key to Start");
    $(".container").addClass("game-over");
    setTimeout(function(){
      $(".container").removeClass("game-over");
    }, 500);
  }
}
