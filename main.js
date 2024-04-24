///query selectors
var gameBoardSection = document.querySelector('.game-board-section');
var header = document.querySelector('.current-header');
var boxes = document.querySelectorAll('.box');

///global variables
var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

var currentPlayer = '🌮';
var previousWinner;

var player1 = createPlayer('player1', '🌮')
var player2 = createPlayer('player2', '🌯')

///event listeners
for(var i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('click', boxClick)
}

// /////logic functions
function checkWin(player) {
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) return true;
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) return true;
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
}

function checkDraw() {
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if (board[row][col] === '') 
            return false;
        }
    }
    return true;
}
   
/////DOM functions
function createPlayer(name, token){
    return {
        id: name,
        token: token,
        wins: 0,
    }
}

function boxClick(event) {
    var boxId = event.target.id;
    var number = parseInt(boxId.slice(-1));
    var row = Math.floor((number - 1) / 3);
    var col = (number - 1) % 3;
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            if(currentPlayer === player1.token){
                player1.wins++
            } else if (currentPlayer === player2.token){
                player2.wins++
            }
            previousWinner = currentPlayer;
            header.innerHTML = `<h1>Player ${currentPlayer} wins!</h1>`;
            disableClicks();
            increaseWins();
            setTimeout(resetGame, 2000); 
        } else if (checkDraw()) {
            previousWinner = null;
            header.innerHTML = `<h1>It's a draw!</h1>`;
            disableClicks();
            setTimeout(resetGame, 2000); 
        } else {
            currentPlayer = currentPlayer === '🌮' ? '🌯' : '🌮';
            currentPlayerTurn();
        }
    }
}

function increaseWins() {
    document.querySelector('.player-one-wins').textContent = `${player1.wins} Wins`;
    document.querySelector('.player-two-wins').textContent = `${player2.wins} Wins`;
}

function disableClicks(){
    for(var i = 0; i < boxes.length; i++){
        boxes[i].removeEventListener('click', boxClick)
    }
}

function resetGame(){
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    currentPlayer = previousWinner === '🌮' ? '🌯' : '🌮';
    
    for(var i = 0; i < boxes.length; i++){
        boxes[i].textContent = ''; 
        boxes[i].classList.remove('win'); 
    }
    currentPlayerTurn();
    increaseWins();

    for(var i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('click', boxClick)
    }
}

function currentPlayerTurn(){
   header.innerHTML = `<h1 class="">Player ${currentPlayer}'s turn!</h1>`
}