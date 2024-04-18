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
boxes.forEach(box => {
    box.addEventListener('click', boxClick)

})




/////logic functions
function makeMove(row, col, player) {
    board[row][col] = player;
   }
   

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
            if (board[row][col] === '') return false;
        }
    }
    return true;
}
   



/////DOM functions
