//------------------Start - Timer- this was taken from the homeworks----------------------------------------------------------------------//

var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var youLost = "You ran out of time! Game Over!"
var question ='Text';


// Timer that counts 
function countdown() {
  var timeLeft = 45;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  
countdown();

//------------------End - Timer----------------------------------------------------------------------------------//

// Need to create the questions in html? 



//need to create the high score button fucntion
      //screen goes blank and the 


      // this will keep the scores in local storage
var name = $('input[name="shopping-input"]').val();
console.log(name)

// if there's nothing in the form entered, don't print to the page
if (!name) {
  console.log('No shopping item filled out in form!');
  return;
}

// print to the page
highScores.append('<li>' + name + '</li>');

 
//user name for high score
  var user = {
    name: nameInput.value.trim(),

  };

  // set new submission to local storage 
  localStorage.setItem("user", JSON.stringify(user));
  
};

//-----------logic for correct and incorrect
//if correct, then perform correct fucntion
//if incorrect, then perform incorrect function

//correct function
   // add 10 to the score & go to next question
   //store the score

//incorrect funtion
  //go to next question

  //--------questions-------------------------------------------------------------------------------------------------------//
  var theQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];