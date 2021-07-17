// var wordBlank = document.querySelector(".word-blanks");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var chosenWord = "";
var numBlanks = 0;
var isWin = false;
var timer;
var timerCount;
var mainQuestionArea = document.querySelector("#questionArea");
var alert = document.querySelector(".alert");
var currentQuestion;
var scoreList = [];
var userInitials = "" ;
var score = 0;
var storedScores = JSON.parse(localStorage.getItem("userInfo"));
var input;
var myform = document.createElement("form");
var questionCount = 0;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
// var blanksLetters = [];

// Array of words the user will guess
var words = ["Question 1","Question 2", "Question 3", "Question 4", "Question 5"];



//QUESTIONS: 
var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["string","booleans" , "alerts", "numbers"] ,
    answer: "alerts",
    
  },
  {
    question: "The condition in an if/else statement is enclosed within what character/s.",
    options: ["quotes","curly brackets", "parenthesis","square brackets"],
    answer: "parenthesis",
    
  },
  {
    question: "Arrays in javascript can be used to store what information?",
    options: ["numbers and strings","other arrays","booleans", "all of the above"],
    answer: "all of the above",
    
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables",
    options: ["semi-colon", "square brackets","quotes","parenthesis"],
    answer: "quotes",
    
  },
  {
    question: "Who was the first programmer?",
    options: ["Ada Lovelace", "Grace Hopper","Albert Einstein"],
    answer: "Ada Lovelace",
    
  }
]

// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

// The startGame function is called when the start button is clicked
function startQuiz() {
  timerCount = 75;
  // Prevents start button from being clicked when round is in progress
  currentQuestion =  questions[questionCount];
  startButton.disabled = false;
  startButton.style.display = 'none';
  askQuestion(currentQuestion);
  startTimer()
}


// The winGame function is called when the win condition is met
function winGame() {
  wordBlank.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

// Creates questions on screen
function askQuestion(q){

  mainQuestionArea.innerHTML = "" ;
  mainQuestionArea.innerText= "Question: " + q.question;
  q.options.forEach(element => {
  var button =document.createElement("button")
  button.className="btn-primary btn-block text-left"
  button.innerText=element
  mainQuestionArea.appendChild(button)
  timerElement.innerText = "Timer: " + timerCount;
  timerCount--;
  button.addEventListener("click", displaynextQuestion)
});

};

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// Tests if guessed letter is in word and renders it to the screen.
function checkLetters(letter) {
  var letterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (chosenWord[i] === letter) {
      letterInWord = true;
    }
  }
  if (letterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (chosenWord[j] === letter) {
        blanksLetters[j] = letter;
      }
    }
    wordBlank.textContent = blanksLetters.join(" ");
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("click", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);