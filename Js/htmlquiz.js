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
    question: "What does <h1> represent in HTML?",
    answer: "Top-level heading",
    pickable: ["Top-level heading", "Hyperlink", "Image tag", "Line break"],
  },
  {
    question: "What is the purpose of the <a> tag in HTML?",
    answer: "Create hyperlinks",
    pickable: ["Create hyperlinks", "Define images", "Group elements", "Break lines"],
  },
  {
    question: "How do you create an unordered list in HTML?",
    answer: "<ul> tag",
    pickable: ["<ul> tag", "<table> tag", "<img> tag", "<div> tag"],
  },
  {
    question: "What does HTML stand for?",
    answer: "Hypertext Markup Language",
    pickable: [
      "Hypertext Markup Language",
      "Hyper Transfer Markup Language",
      "Hyperlink and Text Markup Language",
      "Hypertext Machine Language",
    ],
  },
  {
    question: "Which HTML tag defines an image?",
    answer: "<img> tag",
    pickable: ["<img> tag", "<br> tag", "<ul> tag", "<h1> tag"],
  },
  {
    question: "What is the purpose of the <div> element in HTML?",
    answer: "Group and style elements",
    pickable: [
      "Group and style elements",
      "Create line breaks",
      "Define images",
      "Create hyperlinks",
    ],
  },
  {
    question: "How do you create a line break in HTML?",
    answer: "<br> tag",
    pickable: ["<br> tag", "<table> tag", "<a> tag", "<h1> tag"],
  },
  {
    question: "What's the main function of the <head> section in HTML?",
    answer: "Contains metadata",
    pickable: ["Contains metadata", "Top-level heading", "Defines images", "Creates line breaks"],
  },
  {
    question: "Which HTML tag defines a table?",
    answer: "<table> tag",
    pickable: ["<table> tag", "<ul> tag", "<br> tag", "<img> tag"],
  },
  {
    question: "What does the <form> element in HTML do?",
    answer: "Creates web forms",
    pickable: ["Creates web forms", "Defines tables", "Creates line breaks", "Represents headings"],
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

    resultItem.innerHTML = `
            <p style="margin-top: 10px; font-size: 20px">${i + 1}. ${questions[i].question}</p>
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
    radio.setAttribute("name", "choice" + (i + 1));

    radio.setAttribute("value", currQuest.pickable[i]);

    const label = document.createElement("label");
    label.setAttribute("for", "choice" + (i + 1));

    label.textContent = currQuest.pickable[i];

    quizSpace.appendChild(radio);
    quizSpace.appendChild(label);
  }
}
