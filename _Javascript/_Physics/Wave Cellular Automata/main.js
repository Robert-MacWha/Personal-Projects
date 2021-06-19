let cellCount = 200;
let cellSize = 3;

let cells = [];

function setup() {
    createCanvas(cellCount * cellSize, cellCount * cellSize);

    // Create all cells
    for(let i = 0; i < cellCount; i ++) {
        cells[i] = [];
        for(let j = 0; j < cellCount; j ++) {
            cells[i][j] = new Cell(createVector(i * cellSize, j * cellSize));
        }
    }

    cells[10][10].next = 1;
    cells[10][12].next = 1;
}
  
function draw() {
    background(220);

    // Update all cells
    for(let i = 0; i < cellCount; i ++) {
        for(let j = 0; j < cellCount; j ++) {
            cells[i][j].update(cells);
        }
    }

    // Draw all cells
    noStroke();
    for(let i = 0; i < cellCount; i ++) {
        for(let j = 0; j < cellCount; j ++) {
            cells[i][j].draw();
        }
    }
}