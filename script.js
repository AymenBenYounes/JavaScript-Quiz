const startButton = document.getElementById("start");
const welcome = document.getElementById("title");
const quizQuestions = document.querySelector(".question-answears");
const againButton = document.getElementById("play-again");

// Starting the Quiz
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  welcome.style.display = "none";
  quizQuestions.style.display = "block";
  createQuiz();
});
// Preparing the quiz questions and answears
const questions = [
  {
    question:
      "Which one of these makes the browser parse all of the html before executing javascript file ?",
    answers: ["Async", "Defer", "Default", "htmlFirst"],
    correctAnswer: "Defer",
  },
  {
    question: "Which one of these is not a scope ?",
    answers: ["Block Scope", "Module Scope", "Function Scope", "Event Scope"],
    correctAnswer: "Event Scope",
  },
  {
    question:
      "Which of the following is used to declare an unchangable variable in JavaScript?",
    answers: ["var", "dim", "let", "const"],
    correctAnswer: "const",
  },
  {
    question: 'What is the output of `console.log(typeof "Hello, World!");`?',
    answers: ["string", "number", "boolean", "undefined"],
    correctAnswer: "string",
  },
  {
    question:
      "Which of these methods is used to add an element to the end of an array in JavaScript?",
    answers: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()",
  },
];
let questionNumber = 0;
let score = 0;
const quizLength = questions.length;

let answearSelected = false;

function createQuiz() {
  const question = document.createElement("h2");
  question.innerText = questions[questionNumber].question;
  question.classList.add("question");
  const answears = document.createElement("div");
  answears.classList.add("answears");
  quizQuestions.append(question);
  quizQuestions.append(answears);
  questions[questionNumber].answers.map((info) => {
    const answear = document.createElement("p");
    answear.innerText = info;
    answear.classList.add("answear");
    answears.append(answear);
  });
  const nextButton = document.createElement("button");
  nextButton.setAttribute("id", "next-question");
  nextButton.innerText = "Next Question";
  quizQuestions.append(nextButton);

  const allAnswears = document.querySelectorAll(".answear");
  allAnswears.forEach((answear) => {
    answear.addEventListener("click", (e) => {
      answearSelected = true;

      allAnswears.forEach((ans) => {
        ans.style.pointerEvents = "none";
      });
      if (e.target.innerText === questions[questionNumber].correctAnswer) {
        score++;
      }
      allAnswears.forEach((ans) => {
        if (ans.innerText === questions[questionNumber].correctAnswer) {
          ans.style.backgroundColor = "Green";
          ans.style.color = "White";
        } else {
          ans.style.backgroundColor = "Red";
          ans.style.color = "White";
        }
      });
    });
  });

  nextButton.addEventListener("click", () => {
    if (answearSelected === false) {
      alert("Please choose an answear");
      return;
    } else {
      answearSelected=false;
      questionNumber++;
      if (questionNumber < quizLength) {
        deleteQuiz();
        createQuiz();
      } else {
        deleteQuiz();
        const result = document.createElement("div");
        result.classList.add("ResultsDiv");
        result.innerText = `Your Final Score is ${score} / ${quizLength}`;
        result.style.width = "100%";
        quizQuestions.style.width = "100%";
        quizQuestions.append(result);
        quizQuestions.append(againButton);

        // Show the Play Again button
        againButton.style.display = "block";
      }
    }
  });
}

function deleteQuiz() {
  while (quizQuestions.firstChild) {
    quizQuestions.removeChild(quizQuestions.firstChild);
  }
}
againButton.addEventListener("click", () => {
  quizQuestions.style.width = "90%";
  questionNumber = 0;
  score = 0;
  againButton.style.display = "none";
  deleteQuiz(); // Clear previous quiz results
  createQuiz();
});
