const antCount = 1;

let ants = [];
var WorldArray;
let WorldSize = 100;
let boxSize = 10;

function setup() {
  createCanvas(WorldSize * boxSize, WorldSize * boxSize);
  
  WorldArray = new Array(WorldSize);
  for(let x = 0; x < WorldSize; x ++) {
    WorldArray[x] = new Array(WorldSize); 
  }
  for(let i = 0; i < antCount; i ++) {
    ants.push(new Ant());
    ants[ants.length-1].create();
  }
}

function draw() {
  background(220);
  
  //ants.push(new Ant());
  //ants[ants.length-1].create();
  for(let j = 0; j < ants.length; j ++) {
    ants[j].move(); 
  }
  for(let x = 0; x < WorldSize; x ++) {
    for(let y = 0; y < WorldSize; y ++) {
      fill(45, 74, 83);
      noStroke();
      if(WorldArray[x][y] == 1) {
        rect(x * boxSize, y * boxSize, boxSize, boxSize); 
      }
    }
  }
}
  
class Ant {
  create () {
    this.x = WorldSize/2;
    this.y = WorldSize/2;
    this.dir = 0;
    //0 = up;
    //1 = right;
    //2 = down;
    //3 = left;
  }
  
  move () {
    //Move in the correct direction
    if (this.dir == 0) { this.y ++}
    if (this.dir == 2) { this.y --}
    if (this.dir == 1) { this.x ++}
    if (this.dir == 3) { this.x --}
    //Turn in the correct direction
    if (WorldArray[this.x][this.y] == 0) {
      this.dir ++; 
    } else {
      this.dir --; 
    }
    //Fix direction rotation bug
    if (this.dir == 4) { this.dir = 0; }
    if (this.dir == -1) { this.dir = 3; }
    //Update World Array Square Color
    if (WorldArray[this.x][this.y] == 0) { WorldArray[this.x][this.y] = 1; }
    else { WorldArray[this.x][this.y] = 0; }
  }
}