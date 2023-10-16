const mikuQuizBtn = document.getElementById("miku-quiz");
const jsQuizBtn = document.getElementById("JS-quiz");
const htmlQuizBtn = document.getElementById("HTML-quiz");

mikuQuizBtn.addEventListener("click", function () {
  location.href = "./pages/mikuquiz.html";
});

jsQuizBtn.addEventListener("click", function () {
  location.href = "./pages/JSquiz.html";
});

htmlQuizBtn.addEventListener("click", function () {
  location.href = "./pages/HTMLquiz.html";
});
