const quizSpace = document.querySelector("#quiz-space");
const quizBtn = document.querySelector("#next-question");
const quizBtnPrev = document.querySelector("#prev-question");
const counterQuestion = document.querySelector("#question-counter");
const questionHeader = document.querySelector("#question");
const scoreshow = document.querySelector("#score");
const winScreen = document.querySelector("#winScreen");
const playArea = document.querySelector("#main-card");
const wrongQ = document.querySelector("#wrong-Q");
const correctAnswerScreen = document.querySelector("#correctAnswerScreen");
const homebtn = document.querySelector("#home");
const questions = [
  {
    question: "What is JavaScript primarily used for?",
    answer: "Adding interactivity to web pages",
    pickable: [
      "Adding interactivity to web pages",
      "Styling web pages",
      "Creating web graphics",
      "Managing databases",
    ],
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answer: "Using the 'var', 'let', or 'const' keyword",
    pickable: [
      "Using the 'var', 'let', or 'const' keyword",
      "With the 'variable' keyword",
      "By using 'declare' keyword",
      "Using 'int' or 'string' keyword",
    ],
  },
  {
    question: "What is the result of 3 + 5 in JavaScript?",
    answer: "8",
    pickable: ["8", "35", "53", "15"],
  },
  {
    question: "What is the purpose of the 'if' statement in JavaScript?",
    answer: "Conditional execution of code",
    pickable: [
      "Conditional execution of code",
      "Defining functions",
      "Creating loops",
      "Displaying messages",
    ],
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    answer: "//",
    pickable: ["//", "/* */", "#", "--"],
  },
  {
    question: "How do you define a function in JavaScript?",
    answer: "Using the 'function' keyword",
    pickable: [
      "Using the 'function' keyword",
      "With 'define' keyword",
      "Using 'func' keyword",
      "By declaring 'class'",
    ],
  },
  {
    question: "What is the purpose of the 'console.log()' function in JavaScript?",
    answer: "Displaying output in the console",
    pickable: [
      "Displaying output in the console",
      "Creating pop-up messages",
      "Running a loop",
      "Styling web pages",
    ],
  },
  {
    question: "How do you add a comment that spans multiple lines in JavaScript?",
    answer: "Using '/*' to start and '*/' to end the comment",
    pickable: [
      "Using '/*' to start and '*/' to end the comment",
      "Using '//' at the beginning of each line",
      'Enclosing text in triple quotes (""" or \'\'\'")',
      "Adding '*/' at the start and '/*' at the end of the comment",
    ],
  },
  {
    question: "What data type is used for whole numbers in JavaScript?",
    answer: "Number",
    pickable: ["Number", "String", "Boolean", "Array"],
  },
  {
    question: "What is the JavaScript operator for equality?",
    answer: "===",
    pickable: ["===", "==", "=", "!=="],
  },
];

let rightAnswers = 0;
let wrongAnswers = 0;
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let questionStatus = new Array(questions.length).fill("");

homebtn.addEventListener("click", function () {
  location.href = "../index.html";
});

quizBtn.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
      const userAnswer = selectedAnswer.value;
      const correctAnswer = questions[currentQuestionIndex].answer;

      if (userAnswer === correctAnswer) {
        rightAnswers++;
        questionStatus[currentQuestionIndex] = "right";
      } else {
        wrongAnswers++;
        questionStatus[currentQuestionIndex] = "wrong";
      }

      userAnswers[currentQuestionIndex] = userAnswer;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      clearQuizSpace();
      buffer(questions[currentQuestionIndex]);
      counterQuestion.textContent = `${currentQuestionIndex + 1}/12`;

      const selectedRadio = document.querySelector(
        `input[value="${userAnswers[currentQuestionIndex]}"]`
      );
      if (selectedRadio) {
        selectedRadio.checked = true;
      }
    } else {
      showResult();
    }
  }
});

quizBtnPrev.addEventListener("click", function () {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;

    clearQuizSpace();
    buffer(questions[currentQuestionIndex]);
    counterQuestion.textContent = `${currentQuestionIndex + 1}/12`;

    const selectedRadio = document.querySelector(
      `input[value="${userAnswers[currentQuestionIndex]}"]`
    );
    if (selectedRadio) {
      selectedRadio.checked = true;
    }
  }
});

function showResult() {
  playArea.style.display = "none";
  winScreen.style.display = "flex";
  scoreshow.textContent = `${rightAnswers}/10`;
  wrongQ.textContent = `you got ${wrongAnswers} wrong`;
  displayResult();
}

function displayResult() {
  correctAnswerScreen.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add(questionStatus[i]);

    resultItem.innerHTML = `
            <p style="margin-top: 10px">${i + 1}. ${questions[i].question}</p>
            <p>Right Answer: ${questions[i].answer}</p>
            <p>Your Answer: ${userAnswers[i]}</p>
        `;

    correctAnswerScreen.appendChild(resultItem);
  }
}

buffer(questions[currentQuestionIndex]);
counterQuestion.textContent = `${currentQuestionIndex + 1}/12`;

function clearQuizSpace() {
  while (quizSpace.firstChild) {
    quizSpace.removeChild(quizSpace.firstChild);
  }
}

function buffer(currQuest) {
  questionHeader.textContent = currQuest.question;
  createQuestion(currQuest);
}

function createQuestion(currQuest) {
  for (let i = 0; i < currQuest.pickable.length; i++) {
    const radio = document.createElement("input");
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "answer");
    radio.setAttribute("value", currQuest.pickable[i]);

    const label = document.createElement("label");
    label.setAttribute("for", "choice" + (i + 1));
    label.textContent = currQuest.pickable[i];

    quizSpace.appendChild(radio);
    quizSpace.appendChild(label);
  }
}
