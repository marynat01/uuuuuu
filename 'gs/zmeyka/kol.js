let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let gameOver = false;


let snakeBody = [];

const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highScoreElement = document.querySelector(".high-score"); 
const controls = document.querySelectorAll(".control i");

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
});





const updateFoodPosition = () => {
    // Passing a random 1 - 30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

};



let highScore = localStorage.getItem(".high-score") || 0;


const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("pochti");
    location.reload();
};


const changeDirection = (e) => {
    if(e.key === "ArrowUp") {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != -1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    } 
};


const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    
    
    
    if (snakeX === foodX && snakeY === foodY) {
        snakeX = foodX; // Align snake head X position with food X
        snakeY = foodY; // Align snake head Y position with food Y
    
        updateFoodPosition();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }
    
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    snakeBody[0] = [snakeX, snakeY];

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody&&[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        };
    };


    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }



    snakeX += velocityX;
    snakeY += velocityY;

    // Render the game board
    playBoard.innerHTML = htmlMarkup;
};

updateFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);


