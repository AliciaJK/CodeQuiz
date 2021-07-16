var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var displayTime = document.getElementById('displayTime');

var lose = document.querySelector(".lose");
var win = document.querySelector(".win");

var question ='Text';
// var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");


// Timer that counts 
timerEl.addEventListener("click", function() {
  var timeLeft = 5;

  
  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    startQuiz();
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      displayTime.textContent = timeLeft + ' seconds remaining'; //add a new variable to display the countdown 
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      displayTime.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      displayTime.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
})
function displayMessage(){
console.log("End of timer")

}

//------------------ Variables------------------------------------------------------------------------------//

var quizContainer = document.getElementById('quiz');
var questionContainer = document.getElementById('question');
var answerContainer = document.getElementById('answer');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var i = 0


//--------questions-----I got these from someone on the internet ---------------------------------------------------------//
var theQuestions = [
  {
    question: "Who was the first programmer?",
    answers: [
      "Ada Lovelace",
      "Grace Hopper",
      "Albert Einstein"
    ],
    correctAnswer: "a"
  },
  {
    question: "The first computer game was created in what year?",
    answers: {
      a: "1853",
      b: "1986",
      c: "1961"
    },
    correctAnswer: "c"
  },
  {
    question: "What are problems in coding called?",
    answers: {
      a: "Story",
      b: "Bug",
      c: "Epic",
    },
    correctAnswer: "b"
  }
]

  //need to create a for loop for to display the questions 
function startQuiz(){
  questionContainer.textContent = theQuestions[i].question
  answerContainer.textContent = theQuestions[i].answers
  // answerContainer.textContent = theQuestions[0].answers.b
  // answerContainer.textContent = theQuestions[0].answers.c
 // quizContainer.textContent = theQuestions[0].correctAnswer
//take answer
i++

}

//-----------logic for correct and incorrect-----------------------------------------------------------//





//---------High scores-----------------------------------------------------------------------
function addScore(event) {
  event.preventDefault();

  finalEl.style.display = "none";
  highscoresEl.style.display = "block";

  let init = initialsInput.value.toUpperCase();
  scoreList.push({ initials: init, score: secondsLeft });

  // sort scores
  scoreList = scoreList.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      } else {
        return -1;
      }
    });
  
  scoreListEl.innerHTML="";
  for (let i = 0; i < scoreList.length; i++) {
      let li = document.createElement("li");
      li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
      scoreListEl.append(li);
  }

  // Add to local storage
  storeScores();
  displayScores();
}

function storeScores() {
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

  // If scores were retrieved from localStorage, update the scorelist array to it
  if (storedScoreList !== null) {
      scoreList = storedScoreList;
  }
}

// clear scores
function clearScores() {
  localStorage.clear();
  scoreListEl.innerHTML="";
}

// EventListeners
// Start timer and display first question when click start quiz
startBtn.addEventListener("click", startQuiz);

// Check answers loop
ansBtn.forEach(item => {
  item.addEventListener('click', checkAnswer);
});

// Add score
submitScrBtn.addEventListener("click", addScore);




  
