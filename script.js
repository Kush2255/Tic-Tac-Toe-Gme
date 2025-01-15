const cells = document.querySelectorAll(".cell");
const playerXScoreSpan = document.querySelector("#playerXScore");
const playerOScoreSpan = document.querySelector("#playerOScore");
const resetBtn = document.querySelector(".resetBtn");
const toastDiv = document.querySelector(".toast");
const draws = document.querySelector("#draws");

const playerX = "X";
const playerO = "O";
let playerXScore = 0;
let playerOScore = 0;
let currentLevel = 1;
let flag = true;
let currentPlayer = playerX;

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle cell click events
cells.forEach((cell, index) => {
    cell.addEventListener("click", (e) => cellClicked(e, index));
});

function cellClicked(e, index) {
    if (flag && e.target.innerHTML === "") {
        e.target.appendChild(addImg(currentPlayer));
        playSound(currentPlayer);
        checkWinner();
        checkDraw();
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }
}

function addImg(type) {
    const img = document.createElement("img");
    img.src = type === playerX ? "https://raw.githubusercontent.com/fabwaseem/TicTacToe/refs/heads/main/x.png" : "https://raw.githubusercontent.com/fabwaseem/TicTacToe/refs/heads/main/o.png";
    return img;
}

function checkWinner() {
    for (let i = 0; i < winCombos.length; i++) {
        const [a, b, c] = winCombos[i];
        const cell1 = cells[a];
        const cell2 = cells[b];
        const cell3 = cells[c];
        if (cell1.innerHTML && cell1.innerHTML === cell2.innerHTML && cell1.innerHTML === cell3.innerHTML) {
            toast(`Player ${currentPlayer} wins!`);
            updateScore();
            flag = false;
            currentLevel++;
            setTimeout(() => {
                reset();
                toast(`Level ${currentLevel}`);
            }, 2000);
            return;
        }
    }
}

function checkDraw() {
    if ([...cells].every((cell) => cell.innerHTML !== "")) {
        toast("It's a draw!");
        currentLevel++;
        setTimeout(() => {
            reset();
            toast(`Level ${currentLevel}`);
        }, 2000);
    }
}

function toast(msg) {
    toastDiv.classList.add("show");
    toastDiv.textContent = msg;
    setTimeout(() => {
        toastDiv.classList.remove("show");
    }, 1000);
}

function updateScore() {
    if (currentPlayer === playerX) {
        playerXScore++;
        playerXScoreSpan.textContent = playerXScore;
    } else {
        playerOScore++;
        playerOScoreSpan.textContent = playerOScore;
    }
}

function reset() {
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });
    flag = true;
}

resetBtn.addEventListener("click", () => {
    flag = false;
    reset();
    currentLevel = 1;
    playerOScore = 0;
    playerXScore = 0;
    playerOScoreSpan.textContent = playerOScore;
    playerXScoreSpan.textContent = playerXScore;
    toast("Game reset!");
    setTimeout(() => {
        toast(`Level ${currentLevel}`);
        flag = true;
    }, 2000);
});

function playSound(player) {
    const audio = new Audio(player === "X" ?
        "https://raw.githubusercontent.com/yourusername/yourrepository/x_move.mp3" :
        "https://raw.githubusercontent.com/yourusername/yourrepository/o_move.mp3");

    audio.play().catch((error) => {
        console.error('Audio play failed:', error);
    });
}
