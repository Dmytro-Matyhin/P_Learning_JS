let boxSize = 32;
let borderSize = 2;
let gridCount = 13;
let speed = 1000;
let processGame;
let snake = createSnakeData(Math.floor(gridCount / 2), Math.floor(gridCount / 2), 5);
let food = createFood();
let direction = 'left';
let gridContainer;

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', snakeHandler);


function snakeHandler(event) {
  updateDirection(event);
}

function updateDirection(event) {
  console.log(event.keyCode);
  if (event.keyCode == 37 && direction != 'right')
      direction = 'left';
  if (event.keyCode == 38 && direction != 'down')
      direction = 'up';
  if (event.keyCode == 39 && direction != 'left')
      direction = 'right';
  if (event.keyCode == 40 && direction != 'up')
      direction = 'down';
}



function init() {
  gridContainer = find('#snake-container');
  let messageMox = find('#message');
  let score = find('.score > b');

  initGrid(gridCount, gridContainer);
    
    // ----------------------------------------------
    // startBtn.addEventListener('click', startHandler);
    // endBtn.addEventListener('click', endHandler);
    // игра должнв стартовать и заканчиватся по клику на кнопки 
    // ----------------------------------------------

  startGame();
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

function startGame() {
  let randomBox = generateBoxForEat();

  updateSnake();
  processGame = setInterval(() => {
    let { cell, row } = snake[0];

        // ----------------------------------
        // Нужно чтобы ф-ция noWallMode (реализует возможность змейки проходить через стены) работала так
        // let {
        //     cell,
        //     row
        // } = noWallMode(snake[0])
        // ----------------------------------

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

    snake.pop()
    console.log(snake[0].cell, snake.length);
    updateSnake();
  }, speed);

  function updateSnake() {
    clearSnake();
      // ---------------------------------------
      // написать ф-цию checkOnEated, которая проверяет съела ли змейка еду, если да добавляет +1 в хвост и в score
      // checkOnEated(randomBox.dataset);
      // ----------------------------------


      // ----------------------------------
      // написать ф-цию checkOnTailCrush, которая проверяет врезалась ли голова змейки в себя же, если да - завершить игру
      // checkOnTailCrush();
      // ---------------------------------------

    for (const [index, snakePart] of snake.entries()) {
      let cell = findByCoords(snakePart.cell, snakePart.row);
      if (index == 0) {
        cell.classList.add('snake-head', 'snake');
      } else {
        cell.classList.add('snake-body', 'snake');
      }
    }
  }

  function clearSnake() {
    let cells = gridContainer.querySelectorAll('.snake');
    for (const cell of cells) {
      cell.className = 'snake-cell';
    }
  }

  function generateBoxForEat() {
    let cell = getRandomInt(0, gridCount);
    let row = getRandomInt(0, gridCount);
    let randomBox = findByCoords(cell, row);
    randomBox.append(food);
    return randomBox;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
// ----------------------------------
// дополнить эту функцию - вернуть все данные в начальное состояние
// и использовать функцию во всех случаях. где игра завершается
// function endGame(message = 'Game Over!') {
//     clearTimeout(processGame);
// }
// ----------------------------------

// SNAKE FIELD

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

function findByCoords(cell, row) {
  return document.querySelector(`[data-cell = "${cell}"][data-row = "${row}"]`);
}