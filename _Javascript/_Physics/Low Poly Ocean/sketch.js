let grid

function setup() {
  createCanvas(400, 400);
  gridSize = createVector(width/40, height/40);
  grid = new Grid(gridSize, 40);
}

function draw() {
  background(220);
  
  grid.update();
  grid.show();
}