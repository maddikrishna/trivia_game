const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const screen4 = document.getElementById("screen4");
const screen5 = document.getElementById("screen5");

const player1Input = document.getElementById("player1Name");
const player2Input = document.getElementById("player2Name");
const startGameBtn = document.getElementById("startGameBtn");
const nameError = document.getElementById("nameError");

const roundText = document.getElementById("roundText");
const categorySelect = document.getElementById("categorySelect");
const categoryError = document.getElementById("categoryError");
const startRoundBtn = document.getElementById("startRoundBtn");

const roundInfo = document.getElementById("roundInfo");
const categoryInfo = document.getElementById("categoryInfo");
const turnInfo = document.getElementById("turnInfo");
const scoreInfo = document.getElementById("scoreInfo");
const difficultyInfo = document.getElementById("difficultyInfo");
const questionText = document.getElementById("questionText");
const optionsBox = document.getElementById("optionsBox");
const nextBtn = document.getElementById("nextBtn");

const nextRoundBtn = document.getElementById("nextRoundBtn");
const endGameBtn = document.getElementById("endGameBtn");

const finalScore = document.getElementById("finalScore");
const winnerText = document.getElementById("winnerText");

let roundNumber = 1;
let questionNumber = 0;
let usedCategories = [];
let questionsList = [];
let currentCategory = "";

let player1 = { name: "", score: 0 };
let player2 = { name: "", score: 0 };

function showScreen(show) {
    screen1.style.display = "none";
    screen2.style.display = "none";
    screen3.style.display = "none";
    screen4.style.display = "none";
    screen5.style.display = "none";
    show.style.display = "block";
}

function removeUsedCategory(category) {
    const options = categorySelect.querySelectorAll("option");
    options.forEach(option => {
        if (option.value === category) {
            option.remove();
        }
    });
    categorySelect.value = "";
}

startGameBtn.addEventListener("click", function () {
    let p1 = player1Input.value.trim();
    let p2 = player2Input.value.trim();

    if (p1 === "" || p2 === "") {
        nameError.innerText = "Both player names are required!";
        return;
    }

    if (p1 === p2) {
        nameError.innerText = "Player names must be unique!";
        return;
    }

    player1.name = p1;
    player2.name = p2;

    nameError.innerText = "";
    roundText.innerText = "Round " + roundNumber;
    showScreen(screen2);
});

async function fetchQuestions(category) {
    questionsList = [];
    let levels = ["easy", "medium", "hard"];

    for (let i = 0; i < levels.length; i++) {
        let response = await fetch(
            `https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${levels[i]}&limit=2`
        );
        let data = await response.json();
        for (let j = 0; j < data.length; j++) {
            questionsList.push(data[j]);
        }
    }
}

startRoundBtn.addEventListener("click", async function () {
    let selectedCategory = categorySelect.value;

    if (selectedCategory === "") {
        categoryError.innerText = "Please select a category!";
        return;
    }

    if (usedCategories.includes(selectedCategory)) {
        categoryError.innerText = "Category already used!";
        return;
    }

    usedCategories.push(selectedCategory);
    currentCategory = selectedCategory;
    removeUsedCategory(selectedCategory);
    categoryError.innerText = "";

    await fetchQuestions(selectedCategory);

    questionNumber = 0;
    showScreen(screen3);
    showQuestion();
});

function showQuestion() {
    nextBtn.disabled = true;
    optionsBox.innerHTML = "";

    let q = questionsList[questionNumber];
    let currentPlayer = questionNumber % 2 === 0 ? player1 : player2;

    roundInfo.innerText = "Round: " + roundNumber;
    categoryInfo.innerText = "Category: " + currentCategory;
    turnInfo.innerText = "Turn: " + currentPlayer.name;
    scoreInfo.innerText = player1.name + ": " + player1.score + " | " + player2.name + ": " + player2.score;
    difficultyInfo.innerText = "Difficulty: " + q.difficulty.toUpperCase();
    questionText.innerText = q.question.text;

    let options = [...q.incorrectAnswers, q.correctAnswer];
    for (let i = options.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    options.forEach(function (opt) {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = function () {
            checkAnswer(btn, opt, q.correctAnswer, q.difficulty);
        };
        optionsBox.appendChild(btn);
    });
}

function checkAnswer(button, selected, correct, difficulty) {
    let currentPlayer = questionNumber % 2 === 0 ? player1 : player2;

    if (selected === correct) {
        button.classList.add("correct");
        if (difficulty === "easy") currentPlayer.score += 10;
        if (difficulty === "medium") currentPlayer.score += 15;
        if (difficulty === "hard") currentPlayer.score += 20;
    } else {
        button.classList.add("wrong");
    }

    optionsBox.querySelectorAll("button").forEach(btn => btn.disabled = true);
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", function () {
    questionNumber++;
    if (questionNumber < 6) {
        showQuestion();
    } else {
        showScreen(screen4);
    }
});

nextRoundBtn.addEventListener("click", function () {
    roundNumber++;
    roundText.innerText = "Round " + roundNumber;
    showScreen(screen2);
});

endGameBtn.addEventListener("click", function () {
    finalScore.innerText =
        player1.name + ": " + player1.score + " | " +
        player2.name + ": " + player2.score;

    if (player1.score > player2.score) {
        winnerText.innerText = player1.name + " Wins!";
    } else if (player2.score > player1.score) {
        winnerText.innerText = player2.name + " Wins!";
    } else {
        winnerText.innerText = "It's a Draw!";
    }

    showScreen(screen5);
});
