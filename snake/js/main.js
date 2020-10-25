document.addEventListener('DOMContentLoaded', init);

// DEFAULT VALUES

let boxSize = 32;
let borderSize = 2;
let gridCount = 13;
let speed = 500;
let processGame, messageBox, startButton, endButton, gridContainer, scoreValue;
let snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), 5);
let food = createFood();
let direction = 'left';
let score = 0;

function init() {
  let form = find('#controls-form');
  gridContainer = find('#snake-container');
  messageBox = find('#message');
  startButton = find('#start-game');
  endButton = find('#end-game');
  scoreValue = find('.score b');

  initGrid(gridCount, gridContainer);

  document.addEventListener('keydown', snakeHandler);
  startButton.addEventListener('click', startHandler);
  endButton.addEventListener('click', endHandler);

  function startHandler() {
    speed = parseInt(form.speed.value);
    startGame(gridContainer);
    hiddenElements(startButton, endButton);
  }

  function endHandler() {
    endGame();
  }

  function snakeHandler(event) {
    updateDirection(event);
  }
  
  function updateDirection(event) {
    if (event.keyCode == 37 && direction != 'right')
        direction = 'left';
    if (event.keyCode == 38 && direction != 'down')
        direction = 'up';
    if (event.keyCode == 39 && direction != 'left')
        direction = 'right';
    if (event.keyCode == 40 && direction != 'up')
        direction = 'down';
  }
}

function createSnakeData(cell, row, count) {
  let arr = [];

  for (let index = 0; index < count; index++) {
    arr.push({
      cell: cell + index,
      row
    })
  }
  return arr;
}

function createFood() {
  let food = new Image(boxSize - 7, boxSize - 7);
  food.setAttribute('src', './images/apple.png');
  food.classList.add('snake-food');
  return food;
}

// GAME PROCESS

function startGame() {
  messageBox.innerHTML = 'Welcome to Snake!';
  let randomBox = generateBoxForEat();

  updateSnake();
  processGame = setInterval(() => {
    let {cell, row} = noWallMode(snake[0]);

    switch (direction) {
      case 'left': {
        snake.unshift({
          cell: cell - 1,
          row
          })
      };
      break;
      case 'up': {
        snake.unshift({
          cell,
          row: row - 1
        })
      };
      break;
      case 'right': {
        snake.unshift({
          cell: cell + 1,
          row
        })
      };
      break;
      case 'down': {
        snake.unshift({
          cell,
          row: row + 1
        })
      };
      break;
    }

    clearSnake(gridContainer);
    updateSnake();
  }, speed);
  
  function updateSnake() {

    checkOnEated(randomBox.dataset);
    checkOnTailCrush();

    for (const [index, snakePart] of snake.entries()) {
      let cell = findByCoords(snakePart.cell, snakePart.row);
      if (index == 0) {
        cell.classList.add('snake-head', 'snake');
      } else {
        cell.classList.add('snake-body', 'snake');
      }
    }
  }

  function checkOnEated({cell, row}) {
    if (snake[0].cell == +cell && snake[0].row == +row) {
      updateScore(score += 1);
      food.remove();
      randomBox = generateBoxForEat();
    } else {
      snake.pop()
    }
  }

  function checkOnTailCrush() {
    let snakeHead = snake[0];

    for (let snakeBody of snake.slice(1)) {
      if (snakeHead.cell == snakeBody.cell && snakeHead.row == snakeBody.row) {
        endGame();
        break;
      }
    }
  }

  function noWallMode({cell, row}) {

    if (direction == 'left' && cell == 0) {
      cell = gridCount;
    } else if (direction == 'right' && cell == gridCount - 1) {
      cell = -1;
    }

    if (direction == 'up' && row == 0) {
      row = gridCount;
    } else if (direction == 'down' && row == gridCount - 1) {
      row = -1;
    }
    return {cell, row};
  }

  function generateBoxForEat() {
    let cell = getRandomInt(0, gridCount);
    let row = getRandomInt(0, gridCount);
    let randomBox = findByCoords(cell, row);
    randomBox.append(food);
    return randomBox;
  }
}

function endGame(message = 'Game Over!') {
  clearTimeout(processGame);
  direction = 'left';
  messageBox.innerHTML = message;
  snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), 5);
  score = 0;
  hiddenElements(endButton, startButton);
  updateScore(0);
  food.remove();
  setTimeout(() => {
    clearSnake(gridContainer);
  });
}

function clearSnake(gridContainer) {
  let cells = gridContainer.querySelectorAll('.snake');
  for (const cell of cells) {
    cell.className = 'snake-cell';
  }
}

// CREATE FIELD

function initGrid(gridCount, target) {
  target.style.width = target.style.height = (boxSize * gridCount) + 'px';

  for (let index = 0; index < gridCount; index++) {
    target.append(createSnakeRow('snake-cell', gridCount, index));
  }
}

function createSnakeRow(snakeClass, gridCount, row) {
  let fragment = new DocumentFragment();

  for (let index = 0; index < gridCount; index++) {
    fragment.append(createSnakeCell(snakeClass, row, index))
  }
  return fragment;
}

function createSnakeCell(snakeClass, row, cell) {
  let div = document.createElement('div');
  div.classList.add(snakeClass);
  div.setAttribute('data-cell', cell);
  div.setAttribute('data-row', row);
  div.style.width = div.style.height = boxSize + 'px';
  return div;
}

// AUXILIARY FUNCTIONS

function find(selector) {
  return document.querySelector(selector);
}

function updateScore(score) {
   scoreValue.innerHTML = score;
}

function hiddenElements(firstElement, secondElement) {
  firstElement.style.display = 'none';
  secondElement.style.display = 'block';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function findByCoords(cell, row) {
  return document.querySelector(`[data-cell = "${cell}"][data-row = "${row}"]`);
}