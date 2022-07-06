const quizData = [
  {
    question: "Who was the first President of the United States",
    a: "George Washington",
    b: "Abraham Lincoln",
    c: "Benjamin Franklin",
    d: "Thomas Jefferson",
    ans: "a",
  },
  {
    question: "Which is the largest planet in the solar system",
    a: "Mars",
    b: "Jupiter",
    c: "Mercury",
    d: "Earth",
    ans: "b",
  },
  {
    question: "Who was the first Prime Minister of India",
    a: "Gulzarilal Nanda",
    b: "Rajiv Gandhi",
    c: "Indira Gandhi",
    d: "Jawaharlal Nehru",
    ans: "d",
  },
  {
    question: "Who is the Prime Minister of the United Kingdom",
    a: "Justin Trudeau",
    b: "Theresa May",
    c: "Boris Johnson",
    d: "Winston Churchill",
    ans: "c",
  },
  {
    question: "Who was the first man in space",
    a: "Neil Armstrong",
    b: "Yuri Gagarin",
    c: "Buzz Aldrin",
    d: "Alan Shepard",
    ans: "b",
  },
  {
    question: "Who wrote Communist Manifesto",
    a: "Vladimir Lenin",
    b: "Karl Marx",
    c: "Joseph Stalin",
    d: "Leonid Gatovsky",
    ans: "b",
  },
];

let QuizScore = 0;
let qnum = 0;
// Buttons
const start = document.getElementById("start");
const submit = document.querySelector(".submit");

const well = document.querySelector(".welcome");
const con = document.querySelector(".container");
const congrat = document.querySelector(".end");

const q = document.querySelector(".question");
const op = document.querySelector(".options");
// Radio button area
const one_txt = document.getElementById("one");
const two_txt = document.getElementById("two");
const three_txt = document.getElementById("three");
const four_txt = document.getElementById("four");
// const s = document.getElementById("one");
// console.log(s.id);
// submit.addEventListener("click", Process);
start.addEventListener("click", Begin);
submit.addEventListener("click", Process);
function Begin() {
  well.style.display = "none";
  con.style.display = "flex";
  Load();
}

function Process() {
  if (qnum < 6) {
    if (document.getElementById(quizData[qnum].ans).checked) {
      QuizScore = QuizScore + 1;
      console.log(QuizScore);
    } else {
      console.log("failed");
    }
    qnum++;
    Load();
  }
  if (qnum === 6) {
    con.style.display = "none";
    congrat.style.display = "flex";
    document.getElementById("score").textContent = QuizScore;
  }
}

function Load() {
  if (qnum < 6) {
    q.textContent = quizData[qnum].question;
    one_txt.innerText = quizData[qnum].a;
    two_txt.innerText = quizData[qnum].b;
    three_txt.innerText = quizData[qnum].c;
    four_txt.innerText = quizData[qnum].d;
  }
}
