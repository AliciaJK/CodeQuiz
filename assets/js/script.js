//ALL VARIABLES
var timer;
var timerCount;
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector("#start-button");
var mainQuestionArea = document.querySelector("#questionArea");
var alert = document.querySelector(".alert");
var currentQuestion;
var scoreList = [];
var playerName = "";
var score = 0;
var storedScores = JSON.parse(localStorage.getItem("userInfo"));
var input;
var nameForm = document.createElement("form");
var qNumber = 0;


//THE QUESTIONS

var questions = [
  {
    question: "In JavaScript, what element is used to store multiple values in a single variable?",
    options: ["Variables", "Strings", "Arrays", "Functions"],
    answer: "Arrays",

  },
  {
    question: "The action of having something be completed over and over again is called what",
    options: ["Bug", "Sequence", "Loop", "Program"],
    answer: "Loop",

  },
  {
    question: "Arrays in javascript can be used to store ____",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above",

  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes",

  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    options: ["Javascript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log",

  }
]

// START THE QUIZ
function startQuiz() {
  timerCount = 60;
  // Prevents start button from being clicked when round is in progress
  currentQuestion = questions[qNumber];
  startButton.disabled = false;
  startButton.style.display = 'none';
  askQ(currentQuestion);
  startTimer()
}


// START THE TIMER
function startTimer() {
  // Sets timer
  startButton.disabled = false;
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = "Timer: " + timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
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

  mainQuestionArea.innerHTML = "";
  mainQuestionArea.innerText = "Question: " + q.question;
  q.options.forEach(element => {
    var button = document.createElement("button")
    button.className = "btn-primary btn-block text-left"
    button.innerText = element
    mainQuestionArea.appendChild(button)
    timerCount--;
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


//FIRST PAGE ON RELOAD
function goToStart() {

  location.reload();
  return;
}

//CHECK ANSWER & ADJUST SCORE
function isCorrect(response) {

  if (response) {
    alert.innerText = "That's correct!";
    score = score + 10;
  } else {
    alert.innerText = "Wrong! Better luck next time.";
    if ((timerCount - 5) > 0) {
      timerCount = timerCount - 5;
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