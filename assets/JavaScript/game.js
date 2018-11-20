//still needed:
//need function to stop apending lyrics - call when timer hits 0, when user enter correct answer, when user enters incorrect
//need fucntion to play song when user gets the correct answer

  //global game variables
  var userGuess;
  var timer = 30;
  var lives = 5;
  var score = 0;

  //function to stop the timer
  function clearTime() {
    clearInterval(timerRun);
    timer = 30;
  }


  //actual timer function starts when apiseeds gets a song then stops at 0
  function timeLeft() {
    if (typeof songAnswer !== 'undefined') {
      $("#timerDisplay").text(timer);
      $("#scoreDisplay").text(score);
      $("#livesDisplay").text(lives);
      timer--;
      console.log("We playing the song: " + songAnswer);
      console.log(timer);
      if (timer <= 0) {
        alert("Time up!");
        clearTime();
        lives--;
        $("#livesDisplay").text(lives);
        console.log(lives);
      }
    }

  };


  //interval for timer
  var timerRun = setInterval(timeLeft, 1000)

  //called the funciton so it can start running once the page loads
  getSong();
  timeLeft();

  //function to check answers and add to score or lose a life
  function answerCheck() {
    if (userGuess.toLowerCase() == songAnswer.toLowerCase() && timer >= 15) {
      score = score + 100;
      $("#scoreDisplay").text(score);
      clearTime();
      console.log(score);
    } else if (userGuess.toLowerCase() == songAnswer.toLowerCase() && timer < 15) {
      score = score + 50;
      $("#scoreDisplay").text(score);
      clearTime();
      console.log(score);
    } else if (userGuess.toLowerCase() != songAnswer.toLowerCase()) {
      lives--;
      $("#livesDisplay").text(lives);
      clearTime();
      console.log(lives);
    }

  };


  //function to play next song or alert end game
  //timer will only start when the variable songAnswer is not undefined (this variable is from apiseeds.js) so i set it songAnswer to undefined when getting the next song so the timer doesn't prematurially start - or so i though...it still starts - see time left function
  function nextSong() {
    songAnswer = 'undefined';
    timerRun = setInterval(timeLeft, 1000)
    clearTime();
    getSong();
    timeLeft();
  };

  //click funciton for guess - sets the userguess variable equal to whatever the user put in


  $("#guess").click(function(e) {
    e.preventDefault();
    userGuess = $("#userInput").val().trim();
    console.log(userGuess);
    answerCheck();
    $("#userInput").val('');
    clearTime();
  });

  //go to next song function

  $("#next").click(function(){
    nextSong();
  });
