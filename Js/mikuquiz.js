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
    question: "What is Hatsune Miku's primary musical genre?",
    answer: "Vocaloid",
    pickable: ["Jazz", "Pop", "Rock", "Vocaloid"],
  },
  {
    question: "Who is Hatsune Miku's character designer?",
    answer: "KEI",
    pickable: ["Crypton Future Media", "Hideo Kojima", "KEI", "Shigeru Miyamoto"],
  },
  {
    question: "What is the name of Hatsune Miku's official fan club?",
    answer: "Miku's Giving Day",
    pickable: ["Miku Expo", "Miku's Giving Day", "Miku's Fanatics", "Miku's Supporters"],
  },
  {
    question: "In which software was Hatsune Miku first introduced?",
    answer: "Vocaloid 2",
    pickable: ["Adobe Photoshop", "Vocaloid 1", "Vocaloid 2", "FL Studio"],
  },
  {
    question: "What is the name of Hatsune Miku's virtual band?",
    answer: "Hatsune Miku and the Kagamines",
    pickable: [
      "The Vocaloids",
      "Hatsune Miku and the Kagamines",
      "Miku's Melodies",
      "Crypton Sound Band",
    ],
  },
  {
    question: "Which color represents Kagamine Rin?",
    answer: "Yellow",
    pickable: ["Blue", "Red", "Green", "Yellow"],
  },
  {
    question: "Who is Hatsune Miku's arch-nemesis in the Vocaloid world?",
    answer: "Megurine Luka",
    pickable: ["Kaito", "Meiko", "Rin", "Megurine Luka"],
  },
  {
    question: "What is the name of the official Hatsune Miku video game series?",
    answer: "Project DIVA",
    pickable: ["Miku's Adventure", "Dance with Miku", "Project DIVA", "Miku's Quest"],
  },
  {
    question: "In which country did Hatsune Miku hold her first live concert outside Japan?",
    answer: "United States",
    pickable: ["France", "United Kingdom", "Canada", "United States"],
  },
  {
    question: "What is the name of Hatsune Miku's pet character?",
    answer: "Negi",
    pickable: ["Pikachu", "Totoro", "Negi", "Chocobo"],
  },
  {
    question: "What software is commonly used to create Hatsune Miku fan songs?",
    answer: "Vocaloid",
    pickable: ["FL Studio", "Ableton Live", "Vocaloid", "Logic Pro"],
  },
  {
    question: "What is the name of Hatsune Miku's official music video channel on YouTube?",
    answer: "HatsuneMiku",
    pickable: ["MikuMusic", "VocaloidWorld", "HatsuneMiku", "MikuTunes"],
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
