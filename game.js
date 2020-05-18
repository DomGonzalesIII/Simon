// jshint esversion: 6

// all code inside here to ensure document has been loaded
$(function () {

  // variables
  var gameColors = ['red', 'blue', 'green', 'yellow'];
  var gamePattern = [];
  var userClickedPattern = [];
  var counter = 0;
  var gameStarted = false;
  var level = 0;

  $(document).keypress(function () {
    if (!gameStarted) {
      $('#level-title').text(`Level ${level}`);
      nextSequence();
      gameStarted = true;
    }
  });

  // event listener for player's response
  $('.btn').on('click', function () {

    // only want buttons to do something if game has started
    if (gameStarted) {
      // add color user has selected to user's pattern
      let userChosenColor = this.id;
      userClickedPattern.push(userChosenColor);

      // play button's sound and animate color as confirmation of press
      playSound(userChosenColor);
      animatePress(userChosenColor);

      checkAnswer(userClickedPattern.length - 1);
    }
  });

  function nextSequence() {

    userClickedPattern = [];
    level++;

    $('#level-title').text(`Level ${level}`);

    // selects a color at random and adds it to the game pattern
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = gameColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animateGamePattern();
    counter = 0;
  }

  // custom recursive loop function to display game pattern
  // used this instead of for loop to pause between displays
  function animateGamePattern() {
    setTimeout(function () {
      $(`#${gamePattern[counter]}`).fadeOut(250).fadeIn(250);
      playSound(gamePattern[counter]);

      // loop controls
      counter++;
      if (counter < gamePattern.length) {
        animateGamePattern();
      }
    }, 500);
  }

  function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
  }

  function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function () {
      $(`#${currentColor}`).removeClass('pressed');
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        console.log('correct');

        setTimeout(function () {
          // update the h1 with this change in the value of level
          $('#level-title').text(`Level ${level}`);
          nextSequence();
        }, 1000);
      }
    } else {
      playSound('wrong');
      $('body').addClass('game-over');
      setTimeout(function () {
        $('body').removeClass('game-over');
      }, 200);

      $('#level-title').text('Game Over, Press Any Key to Restart');

      startOver();
    }
  }

  function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    counter = 0;
    gameStarted = false;
    level = 0;
  }

});
