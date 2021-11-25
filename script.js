let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32
let snake = []

// Set food on alternate places of background
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

snake[0] = {
  x: 8 * box,
  y: 8 * box
}



let direction = 'right'

// Function create background
function createBG() {
  context.fillStyle = 'lightgreen'
  context.fillRect(0, 0, 16 * box, 16 * box)
}


// Function create snake
function createSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

// Function create food for snake
function createFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

// Snake movements change pressing keys
function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
   
}

function startGame() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  // Compare if our body shocks themselves
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(startGame)
      alert('Game Over')
    }
  }

  createBG()
  createSnake()
  createFood()

  // Set snake coordinates
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  // Set movements of snake
  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  }
  else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let game = setInterval(startGame, 100)

