//Empty: 0
//Head: 1
//Tail: 2
//Wire: 3
//Generator: 4
//And gate: 5

class cell {
  constructor (x, y, type) {
    this.color = createVector(255, 255, 0);
    this.type = type;
    this.newType = type;
    this.change = 0;
    this.pos = createVector(x, y);
  }
  
  update (grid) {
    //If the cell is a wire
    const x = this.pos.x;
    const y = this.pos.y;
    if (this.type == 3) {
      //Look at surounding squares and see what they are
      //Count the # of electrons
      let neighbors = this.getNeighbors(grid, x, y);
      //If 1 or 2 are electrons, turn this into a electron
      if (neighbors == 1 || neighbors == 2) {
        this.newType = 1; 
      }
    } else if (this.type == 2) {
      //If it's a electron tail 
        //Turn into a wire
      this.newType = 3;
    } else if (this.type == 1) {
      //If it's a electron head 
        //Turn into a electron tail
      this.newType = 2;
    } else if (this.type == 5) {
      //And gate:
        //If wires on left and right are on turn on ones on top and bottom
      if (grid[x+1][y].isElectron() && grid[x-1][y].isElectron()) {
        grid[x][y+1].setToHead();
        grid[x][y-1].setToHead();
      }
    }
  }
  
  show () {
    //Update the type
    this.type = this.newType;
    if (this.change != -1) {
      this.type = this.change;
      this.newType = this.change;
      this.change = -1;
    }
    //SHow the cell
    const xPos = (this.pos.x-1)*squareSize;
    const yPos = (this.pos.y-1)*squareSize;
    if (this.type == 0) {      fill(0  , 0  ,   0); }
    else if (this.type == 1) { fill(100, 100, 255); }
    else if (this.type == 2) { fill(255, 100, 100); }
    else if (this.type == 3) { fill(255, 255, 100); }
    else if (this.type == 4) { fill(100, 255, 100); }
    else if (this.type == 5) { fill(255, 100, 255); }
    rect(xPos, yPos, squareSize, squareSize); 
  }
  
  changeType() {
    if(this.type == 0) { this.newType = 3 }
    else { this.newType = 0; }
  }
  
  updateType(key) {
    if(key === UP_ARROW) {
      //Change to wire
      this.change = 3;
    } else if (key === DOWN_ARROW) {
      //Generator
      this.change = 4;
    } else if (key === LEFT_ARROW) {
      //And Gate 
      this.change = 5;
    } else {
      this.setToHead(); 
    }
  }
  
  setToHead () {
    if(this.type == 3) {
      this.change = 1; 
    }
  }
  
  isElectron () {
    let isE = false;
    if (this.type == 1) {
      isE = true
    } else if (gen_timer == 1 && this.type == 4) {
      isE = true; 
    }
    return(isE); 
  }
  
  getNeighbors (grid, x, y) {
    let neighbors = 0;
    if (grid[x+1][y  ].isElectron()) { neighbors ++; }
    //if (grid[x+1][y+1].isElectron()) { neighbors ++; }
    if (grid[x  ][y+1].isElectron()) { neighbors ++; }
    //if (grid[x-1][y+1].isElectron()) { neighbors ++; }
    if (grid[x-1][y  ].isElectron()) { neighbors ++; }
    //if (grid[x-1][y-1].isElectron()) { neighbors ++; }
    if (grid[x  ][y-1].isElectron()) { neighbors ++; }
    //if (grid[x+1][y-1].isElectron()) { neighbors ++; }
    return(neighbors);
  }
}