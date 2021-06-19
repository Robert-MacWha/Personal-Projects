let grid = [];
let squareSize = 20;
let worldSize = 20;

let counter = 0;
let fr = 10;

let gen_timer = 0; 

function setup() {
  createCanvas(worldSize * squareSize, worldSize * squareSize);
  //frameRate(5);
  //Create the grid
  for(let x = 0; x < worldSize+2; x ++) {
    grid[x] = [];
    for(let y = 0; y < worldSize+2; y ++) {
      //Set the grid item to empty
      grid[x][y] = new cell(x, y, 0);
    }
  }
  
 for(let x = 1; x < worldSize+1; x ++) {
    for(let y = 1; y < worldSize+1; y ++) {
      //Set the grid item to empty
      grid[x][y] = new cell(x, y, 3);
    }
  }
}

function draw() {
  background(255);
  counter ++
  if(counter % fr == 0) {
    //Draw the grid
    for(let x = 1; x < worldSize+1; x ++) {
      for(let y = 1; y < worldSize+1; y ++) {
        if (grid[x][y].type != 0) {
          grid[x][y].update(grid); 
        }
      }
    }
  }
  for(let x = 1; x < worldSize+1; x ++) {
    for(let y = 1; y < worldSize+1; y ++) {
      grid[x][y].show(); 
    }
  }
  
  //Highlight the mouse Pos
  let x = mouseX/squareSize;
  x = round(x-0.5);
  let y = mouseY/squareSize;
  y = round(y-0.5);
  fill(255, 255, 255, 100);
  rect(x * squareSize, y * squareSize, squareSize, squareSize);
  
  //Timer for generator
  if (gen_timer == 10) {
    gen_timer = 0; 
  }
  if (counter % fr == 0) {
    gen_timer += 1;
  }
}

function mouseDragged() {
  place();
}

function mousePressed() {
  place(); 
}

function place () {
  //Get the pos of the mouse
  let x = mouseX/squareSize;
  x = round(x-0.5);
  let y = mouseY/squareSize;
  y = round(y-0.5);
  //Update the cell
  grid[x+1][y+1].changeType();
}

function keyPressed () {
  //Get the pos of the mouse
  let x = (mouseX/squareSize);
  x = round(x-0.5);
  let y = mouseY/squareSize;
  y = round(y-0.5);
  //Update the cell
  grid[x+1][y+1].updateType(keyCode);
}