/*
 * Your code goes here:
 */

import { defaultFrame } from './engine';
import cloneDeep from 'lodash.clonedeep';

const defaultStore = {
  isRunning: true,
  snake: null,
  direction: 'ArrowUp',
  foodPos: null,
};

const gameStore = { ...defaultStore };

const defaultSettings = {
  snakeLen: 3,
};

const random = () => Math.floor(Math.random() * 10);

const initFood = () => {
  gameStore.foodPos = null;

  while (!gameStore.foodPos) {
    const row = random();
    const col = random();

    const isGoodPos = gameStore.snake.every((cell) => cell[0] !== row || cell[1] !== col);

    if (isGoodPos) {
      gameStore.foodPos = [row, col];
    }
  }
};

const initializeBoard = (frame, settings = defaultSettings) => {
  const middleRow = Math.floor(frame.length / 2);
  const verticalPos = Math.floor(frame[0].length / 2);

  gameStore.snake = [];
  for (let i = 0; i < settings.snakeLen; i++) {
    const pos = [middleRow + i, verticalPos];
    gameStore.snake.push(pos);
    frame[pos[0]][pos[1]] = 1;
  }

  initFood();

  frame[gameStore.foodPos[0]][gameStore.foodPos[1]] = 2;

  return frame;
};

const reset = () => {
  gameStore = { ...defaultStore };
};

const move = ([row, col]) => {
  switch (gameStore.direction) {
    case 'ArrowUp':
      return [row - 1, col];
    case 'ArrowDown':
      return [row + 1, col];
    case 'ArrowLeft':
      return [row, col - 1];
    case 'ArrowRight':
      return [row, col + 1];
    default:
      return [row, col];
  }
}

const moveSnake = () => {
  let isFoodEaten = false;
  const newHead = move(gameStore.snake[0]);
  if (gameStore.foodPos[0] === newHead[0] && gameStore.foodPos[1] === newHead[1]) {
    isFoodEaten = true;
  }
  gameStore.snake = [newHead, ...gameStore.snake.slice(0, -1)];

  if (isFoodEaten) {
    initFood();
    gameStore.snake = [...gameStore.snake, move(gameStore.snake[gameStore.snake.length - 1])];
  }
}

export const handleGameStart = () => {
  console.log('Game start');
  gameStore.isRunning = true;
};

export const handleGameStop = () => {
  console.log('Game stop');
  gameStore.isRunning = false;
};

export const handleCellClick = (cellCode, [i, j]) => {
  console.log('Cell code:', cellCode, 'Coords:', [i, j]);
};

export const handleKeyDown = (e) => {
  console.log('Key down code:', e.code);
  gameStore.direction = e.key;
};

export const prepareFrame = (prevFrame) => {
  if (!gameStore.isRunning) {
    return prevFrame;
  }

  const nextFrame = cloneDeep(defaultFrame);

  if (!gameStore.snake) {
    const result = initializeBoard(nextFrame);
    return result;
  }

  moveSnake();

  for (let i = 0; i < gameStore.snake.length; i++) {
    nextFrame[gameStore.snake[i][0]][gameStore.snake[i][1]] = 1;
    nextFrame[gameStore.foodPos[0]][gameStore.foodPos[1]] = 2;
  }

  return nextFrame;
};
