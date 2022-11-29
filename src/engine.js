export const defaultFrame = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(() => resolve(), ms);
});

export class Engine {
  constructor({
    elPlayground,
    elRenderRow,
    elRenderCell,
    frameMs,
    isRunning = false,
  }) {
    this.elPlayground = elPlayground;
    this.elRenderRow = elRenderRow;
    this.elRenderCell = elRenderCell;
    this.frameMs = frameMs;

    this.frame = defaultFrame;
    this.isRunning = isRunning;
    this.prepareFrameFn = () => defaultFrame;
  }

  setPrepareFrame(prepareFrameFn) {
    this.prepareFrameFn = prepareFrameFn;
  }

  render() {
    this.elPlayground.innerHTML = '';

    this.frame.forEach((row, i) => {
      const elRow = this.elRenderRow();

      row.forEach((cellCode, j) => {
        elRow.append(this.elRenderCell(cellCode, [i, j]));
      });

      this.elPlayground.append(elRow);
    });
  }

  async run() {
    while (true) {
      await sleep(this.frameMs);

      if (this.isRunning) {
        this.frame = this.prepareFrameFn(this.frame);

        this.render();
      }
    }
  }

  start() {
    this.isRunning = true;
  }

  pause() {
    this.isRunning = false;
  }
}
