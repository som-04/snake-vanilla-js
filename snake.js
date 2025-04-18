//board

var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food

var foodX ;
var foodY ;

var gameOver =false;
// score

var counter = 0;

// Add this function to reset all game variables
function restartGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    counter = 0;
    updateScore(); // Reset the score display
    placeFood();
}

// Add this function to update the score display
function updateScore() {
    document.getElementById("scoreValue").textContent = counter;
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //drawing
    placeFood();
    document.addEventListener("keyup", changeDirection);
    
    // Add event listener for restart button
    document.getElementById("restartButton").addEventListener("click", restartGame);
    
    updateScore(); // Initialize the score display
    setInterval(update, 1000/10); //100 milliseconds
}

function update(){

    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle="yellow";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    //eat
    if(snakeX==foodX && snakeY==foodY){
        snakeBody.push([foodX,foodY])
        counter+=1;
        updateScore(); // Update the score display
        placeFood();

    }
    //wait to turn
    for(let i = snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];

    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY *blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }
    
    //game over conditions

    if (snakeX<0 || snakeX > cols* blockSize || snakeY < 0 || snakeY > rows*blockSize){
        gameOver =true;
        alert("Game Over");
    }

    for(let i = 0; snakeBody.length; i++)
    {
        if (snakeX ==snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }

}

function changeDirection(e) {

    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    foodX = Math.floor(Math.random()*cols)*blockSize;
    foodY = Math.floor(Math.random() *rows)*blockSize;
}

