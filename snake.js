const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = canvas.width;
let snake = [{ x: 100, y: 100 }];
let food = { x: 200, y: 200 };
let dx = gridSize;
let dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);

// Game loop
function gameLoop() {
    if (gameOver()) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
        return;
    }
    
    moveSnake();
    if (foodEaten()) {
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        snake.push({}); // Add new segment to snake
        generateFood();
    }
    clearCanvas();
    drawSnake();
    drawFood();
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); // Add new head
    snake.pop(); // Remove last segment
}

// Check for collisions (game over conditions)
function gameOver() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Change snake direction based on key press
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && dx === 0) { dx = -gridSize; dy = 0; } // Left
    if (key === 38 && dy === 0) { dx = 0; dy = -gridSize; } // Up
    if (key === 39 && dx === 0) { dx = gridSize; dy = 0; }  // Right
    if (key === 40 && dy === 0) { dx = 0; dy = gridSize; }  // Down
}

// Check if food is eaten by snake
function foodEaten() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

// Generate new food at random position
function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Clear canvas before redrawing
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the snake
function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Start the game loop
setInterval(gameLoop, 500);
