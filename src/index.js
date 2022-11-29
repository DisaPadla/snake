import { Engine } from './engine';
import { prepareFrame, handleGameStart, handleGameStop, handleCellClick, handleKeyDown } from './game';
import { cellCodes, defaultRuntime } from './constants';

const elPlayground = document.getElementById('playground');
const elStartEngine = document.getElementById('btn-engine-start');
const elStopEngine = document.getElementById('btn-engine-stop');
const elStartGame = document.getElementById('btn-game-start');
const elStopGame = document.getElementById('btn-game-stop');

const elRenderDiv = (className) => {
  const div = document.createElement('div');
  div.className = className;
  return div;
};

const getCellShapeClassByCode = (cellCode) => {
  switch (cellCode) {
    case cellCodes.empty:
      return '';
    case cellCodes.snake:
      return 'square';
    case cellCodes.snack:
      return 'circle';
    case cellCodes.wall:
      return 'square-rounded';
    default:
      throw new Error(`Unknown cell code: ${cellCode}`);
  }
};

const elRenderRow = () => elRenderDiv('playground-row');
const elRenderCell = (cellCode, [i, j]) => {
  const cell = elRenderDiv('playground-cell');
  const cellItem = elRenderDiv(`playground-cell-item ${getCellShapeClassByCode(cellCode)}`);

  cellItem.setAttribute('data-cell-code', cellCode);
  cellItem.setAttribute('data-i', i);
  cellItem.setAttribute('data-j', j);

  cell.append(cellItem);

  return cell;
};

const engine = new Engine({
  elPlayground,
  elRenderRow,
  elRenderCell,
  frameMs: defaultRuntime.frameMs,
  isRunning: defaultRuntime.isRunning,
});

console.log('Default engine setup:', defaultRuntime);

engine.setPrepareFrame(prepareFrame);

// Initial render.
engine.render();

// Start the engine.
engine.run();

elStopEngine.addEventListener('click', () => {
  console.log('Stop engine');
  engine.pause();
});

elStartEngine.addEventListener('click', () => {
  console.log('Start engine');
  engine.start();
});

elStartGame.addEventListener('click', () => {
  handleGameStart();
});

elStopGame.addEventListener('click', () => {
  handleGameStop();
});

document.addEventListener('click', (el) => {
  const cellCode = el.target.getAttribute('data-cell-code');
  if (cellCode != null) {
    const i = parseInt(el.target.getAttribute('data-i'));
    const j = parseInt(el.target.getAttribute('data-j'));

    handleCellClick(cellCode, [i, j]);
  }
});

document.addEventListener('keydown', (e) => {
  handleKeyDown(e);
});
