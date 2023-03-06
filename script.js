const currentPlayerField = document.querySelector("[data-currentPlayer]");
const allBoxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector('[data-newGame]')
console.log(newGameBtn);

// Data & Varibles=======================

let currentPlayer = 'X';
let moveCount = 0;
let playersPosition = ['', '', '', '', '', '', '', '', ''];
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

init()

// Functions ==============================

function init() {
    console.log('init()');
    // Data Changes
    currentPlayer = 'X';
    moveCount = 0;
    playersPosition = ['', '', '', '', '', '', '', '', ''];
    // UI Changes
    currentPlayerField.innerText = 'Current Player- X';
    allBoxes.forEach((box) => {
        box.innerText = '';
        box.style.pointerEvents = 'all';
        box.classList.remove('active');
    })
    newGameBtn.classList.remove('btnActive');
}

function checkWinner(playervalue) {
    console.log(`checkWinner()-${playervalue}`);
    let winnerFound = false;
    winningPosition.forEach((win) => {
        if (playersPosition[win[0]] == playervalue &&
            playersPosition[win[1]] == playervalue &&
            playersPosition[win[2]] == playervalue) {
            console.log(`WINNER - ${playervalue}`);
            allBoxes[win[0]].classList.add('active');
            allBoxes[win[1]].classList.add('active');
            allBoxes[win[2]].classList.add('active');
            allBoxes.forEach((box) => {
                box.style.pointerEvents = 'none';
            })
            newGameBtn.classList.add('btnActive');
            winnerFound = true;
            return;
        }
    })

    if (moveCount == 9 && !winnerFound) {
        console.log('Game Tie')
        currentPlayerField.innerText = 'GAME TIE';
        newGameBtn.classList.add('btnActive');
    }
}

function changePlayer() {
    currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
}

function handleClick(index) {
    if (!allBoxes[index].innerText) {
        console.log('handleClick()');
        // UI Changes
        allBoxes[index].innerText = currentPlayer;
        allBoxes[index].style.pointerEvents = 'none';
        currentPlayerField.innerText = `Current Player- ${currentPlayer}`;
        // Data Changes
        moveCount++;
        console.log(moveCount);
        playersPosition[index] = currentPlayer;

        checkWinner(currentPlayer);

        changePlayer()

    }
}

// Listeners====================================

newGameBtn.addEventListener('click', init);

allBoxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});