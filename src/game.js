/*
 * Your code goes here:
 */

import { defaultFrame } from './engine';
import cloneDeep from 'lodash.clonedeep';

const gameStore = {
  isRunning: true,
};

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
};

export const prepareFrame = (prevFrame) => {
  if (!gameStore.isRunning) {
    return prevFrame;
  }

  const random = () => Math.floor(Math.random() * 10);

  const iRand = random();
  const jRand = random();

  const nextFrame = cloneDeep(defaultFrame);

  nextFrame[iRand][jRand] = 1;

  return nextFrame;
};
