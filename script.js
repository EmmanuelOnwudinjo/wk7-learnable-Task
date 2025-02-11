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
let autoProgressTimeout; // Timer for auto-progression

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const progressText = document.getElementById("progress-text");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreText = document.getElementById("score-text");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const bgMusic = document.getElementById("bg-music");

// Set sound volumes.
correctSound.volume = 1.0;
wrongSound.volume = 1.0;

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.addEventListener("click", () => checkAnswer(index, button));
        answerButtons.appendChild(button);
    });
    // The Next button remains visible throughout.
    nextBtn.style.display = "block";
}

function resetState() {
    answerButtons.innerHTML = "";
    scoreText.innerText = "";
    // Removed the line that hides the Next button so it always shows.
    // nextBtn.style.display = "none";
}

function checkAnswer(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    
    // Disable all answer buttons.
    const buttons = answerButtons.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === correctIndex) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play();
    }
    
    // Reveal the Next button (it is always visible now).
    nextBtn.style.display = "block";
    
    // Auto-progress after 2 seconds.
    autoProgressTimeout = setTimeout(() => {
        goToNextQuestion();
    }, 2000);
}

nextBtn.addEventListener("click", () => {
    // If user clicks Next manually, cancel the auto-progression timer.
    clearTimeout(autoProgressTimeout);
    goToNextQuestion();
});

function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionText.innerText = "Quiz Completed!";
    answerButtons.innerHTML = "";
    progressText.innerText = "";
    scoreText.innerText = `Final Score: ${score} / ${questions.length}`;
    // Optionally, you can hide the Next button at the end.
    nextBtn.style.display = "none";
    restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    restartBtn.style.display = "none";
    loadQuestion();
});

// Background music handling.
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
