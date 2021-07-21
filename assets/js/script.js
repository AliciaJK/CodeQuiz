//ALL VARIABLES
var timer;
var timerCount;
var timerElement = document.querySelector(".timer-count");

var startButton = document.querySelector("#start-button");
var QuestionDisplay = document.querySelector("#questionArea");
var storedScores = JSON.parse(localStorage.getItem("userInfo"));
var alert = document.querySelector(".alert");
var nameForm = document.createElement("form");

var playerName = "";
var score = 0;
var input;
var qNumber = 0;
var currentQuestion;
var scoreList = [];

//THE QUESTIONS

var questions = [
  {
    question: "In JavaScript, what element is used to store multiple values in a single variable?",
    options: ["Variables", "Strings", "Arrays", "Functions"],
    answer: "Arrays",
  },
  {
    question: "The action of having something be completed over and over is called what?",
    options: ["Bug", "Sequence", "Loop", "Program"],
    answer: "Loop",
  },
  {
    question: "Arrays in Javascript can be used to store what variables?",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",
  },
  {
    question: "String values must be enclosed within what character/s when being assigned to variables?",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",
  },
  {
    question: "What is a very useful tool to see your errors on the web? ",
    options: ["Your computer", "Terminal", "GitBash", "Inspect"],
    answer: "Inspect",
  }
]

// START THE QUIZ
function startQuiz() {
  timerCount = 45;
  // Prevents start button from being clicked when round is in progress
  currentQuestion = questions[qNumber];
  startButton.disabled = false;
  startButton.style.display = 'none';
  askQ(currentQuestion);
  startTimer()
}


// START THE TIMER -- same as classwork problems
function startTimer() {
  // Sets timer
  startButton.disabled = false;
  timer = setInterval(function () {
    //decrease the timer
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met because if the 
      if (timerCount <= 0) {
        // Clears interval and stops timer
        clearInterval(timer);
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
    }
  }, 1000);
}


// DISPLAY SCORES FROM LOCAL STORAGE
if (storedScores !== null) {
  for (var i = 0; i < storedScores.length; i++) {
    scoreList.push(storedScores[i]);
  };
}



//DISPLAY THE QUESTION ON THE PAGE
function askQ(q) {

  QuestionDisplay.innerHTML = "";
  QuestionDisplay.innerText = q.question;
  q.options.forEach(element => {
    var button = document.createElement("button")
    button.className = "btn-primary btn-block text-left"
    button.innerText = element
    QuestionDisplay.appendChild(button)
    // timerCount--;
    button.addEventListener("click", nextQ)
  });

};

//DISPLAY NEXT QUESTION
function nextQ(event) {
  qNumber++
  if (qNumber < questions.length) {
    isCorrect(event.target.innerText == currentQuestion.answer)
    if (qNumber < questions.length) {
      currentQuestion = questions[qNumber]
      askQ(currentQuestion)
    } else {
      qNumber = 0
 }

  } else {
    displayScore();
  }

}

// ASK FOR NAME
function displayScore() {
  clearInterval(timer);
  QuestionDisplay.innerHTML = "You score is: " + score + "!";

 // //NAME FORM
  var nameForm = document.createElement("form");
  nameForm.method = "get";
  nameForm.className = "inputForm";
  var label = document.createElement("label");
  label.innerText = "Please enter your name...             ";
  nameForm.appendChild(label);
  //INPUT SPACE
  input = document.createElement("input");
  input.value = "";
  input.name = "name";
  input.id = "InputName";
  playerName = input.value;
  nameForm.appendChild(input);
  //SAVE
  var submitButton = document.createElement("button");
  submitButton.className = "btn-initals";
  submitButton.innerText = "Save";
  nameForm.appendChild(submitButton);
  QuestionDisplay.appendChild(nameForm);

  //LISTEN FOR INPUT
  input.addEventListener("input", myScript);
  //NAME AND ADD TO VARIABLE
  function myScript(e) {
    playerName = playerName + e.data;

  };

  submitButton.addEventListener("click", displayScores);

}

//DISPLAY SCORES
function displayScores(event) {

  event.preventDefault();
  var userInfo = {
    inits: playerName,
    userScore: score
  };
  
//PUSH TO LOCAL STORAGE - users name
  QuestionDisplay.innerHTML = "";
  scoreList.push(userInfo);
  localStorage.setItem("userInfo", JSON.stringify(scoreList));

  //CREATE SCORE ITEM FOR EACH LIST ITEM
  if (storedScores !== null) {
    var list = document.createElement("ol");
    list.className = "scoreListClass";
    for (var i = 0; i < scoreList.length; i++) {
      var yourName = scoreList[i].inits;
      var scores = scoreList[i].userScore
      var scoreEntry = document.createElement("li");
      scoreEntry.innerHTML = yourName + " - " + scores;
      list.appendChild(scoreEntry);
    }
  } else {
    var list = document.createElement("ol");
    list.className = "scoreListClass";
    //creating and adding to the list
    var scoreEntry = document.createElement("li");
    scoreEntry.innerHTML = userInfo.inits + " - " + userInfo.userScore;
    list.appendChild(scoreEntry);

  }
  //ACTUALLY UPDATE THE CHILD
  QuestionDisplay.appendChild(list);


  //PLAY GAME AGAIN
  var resetGame = document.createElement("button")
  resetGame.className = "btn-primary"
  resetGame.innerText = "Play again!"
  resetGame.addEventListener("click", goToStart);
  QuestionDisplay.appendChild(resetGame);

  //CLEAR ALL SCORES
  var clearAll = document.createElement("button")
  clearAll.className = "btn-primary"
  clearAll.innerText = "CLEAR ALL"
  clearAll.addEventListener("click", clearScores);
  QuestionDisplay.appendChild(clearAll);



  //RESET ALL, CLEAR ALL
  function clearScores(e) {

    localStorage.clear();
    list.innerHTML = "";
    list.clear
    scoreList.clear;
    if (storedScores !== null) {
      storedScores.clear;
    }
    // displayScores(e);
    return;
  }
}

//CHECK ANSWER & ADJUST SCORE
function isCorrect(response) {

  if (response) {
    alert.innerText = "That's correct!";
    score = score + 10;
  } else {
    alert.innerText = "Wrong! Better luck next time.";
    if ((timerCount ) > 0) {
      // timerCount = timerCount;
      timer.innerHTML = timerCount;
    } else {
      timerCount = 0;
      timer.innerHTML = timerCount;
    }

  }
  setTimeout(function () {
    alert.innerText = ""
  }, 1000);

}

// START ON CLICK
startButton.addEventListener("click", startQuiz);