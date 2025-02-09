const questions = [
    { question: "What is Naruto's last name?", answers: ["Uchiha", "Uzumaki", "Hatake", "Senju"], correct: 1 },
    { question: "Who was Naruto's first sensei?", answers: ["Kakashi", "Iruka", "Jiraiya", "Orochimaru"], correct: 1 },
    { question: "What is the name of Naruto’s signature jutsu?", answers: ["Chidori", "Rasengan", "Amaterasu", "Shadow Clone Jutsu"], correct: 1 },
    { question: "Which Hokage sealed the Nine-Tails inside Naruto?", answers: ["First Hokage", "Second Hokage", "Third Hokage", "Fourth Hokage"], correct: 3 },
    { question: "What is the name of Naruto’s father?", answers: ["Madara Uchiha", "Minato Namikaze", "Jiraiya", "Hashirama Senju"], correct: 1 },
    { question: "What is Sasuke's signature jutsu?", answers: ["Chidori", "Fireball Jutsu", "Susanoo", "Amaterasu"], correct: 0 },
    { question: "Who was the first Hokage?", answers: ["Tobirama", "Minato", "Hashirama", "Hiruzen"], correct: 2 }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const progressText = document.getElementById("progress-text");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreText = document.getElementById("score-text");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const bgMusic = document.getElementById("bg-music");

function loadQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    currentQuestion.answers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.addEventListener("click", () => checkAnswer(index));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    answerButtons.innerHTML = "";
    scoreText.innerText = "";
    nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex) {
    let correctIndex = questions[currentQuestionIndex].correct;
    
    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play();
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 1000); 
    } else {
        setTimeout(showResults, 1000);
    }
}

function showResults() {
    questionText.innerText = "Quiz Completed!";
    answerButtons.innerHTML = "";
    progressText.innerText = "";
    scoreText.innerText = `Final Score: ${score} / ${questions.length}`;
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    restartBtn.style.display = "none";
    loadQuestion();
});

bgMusic.volume = 1.0;
document.addEventListener("DOMContentLoaded", () => {
    bgMusic.play().catch(() => {
        console.log("Autoplay blocked, waiting for user interaction...");
    });

    document.body.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();
        }
    });
});

loadQuestion();
