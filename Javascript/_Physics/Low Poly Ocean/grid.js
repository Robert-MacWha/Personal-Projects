class Grid {
  constructor (len, size) {
    this.dim = len;
    this.size = size;
    this.grid = []
    this.off = createVector(0, 0);
    for (let i = 0; i < len.x+4; i ++) {
      this.grid[i] = []
      for (let j = 0; j < len.y+4; j ++) {
        this.grid[i][j] = new Vertex((i-2)*size, 
                                     (j-2)*size,
                                      len.x+4,
                                      len.y+4); 
      }
    }
  }
  
  update () {
    this.off.add(createVector(1, -0.5));
    let mouseP = createVector(mouseX, mouseY);
    for(let x = 1; x < this.dim.x+3; x ++) {
      for (let y = 1; y < this.dim.y+3; y ++) {
        this.grid[x][y].update(this.off);
      }
    }
  }
  
  show() {
    for(let x = 1; x < this.dim.x+3; x ++) {
      for (let y = 1; y < this.dim.y+3; y ++) {
        //Draw both tris
        let c = this.grid[x][y];
        let n = this.grid[x][y+1];
        let s = this.grid[x][y-1];
        let e = this.grid[x+1][y];
        let w = this.grid[x-1][y];
        let val = ((c.z + n.z + w.z)/80)*255
        fill(val/10, val/10, map(val, 0, 255, 255, 0));
        stroke(0);
        strokeWeight(2);
        beginShape();
          vertex(c.x + c.z, c.y + c.z*2);
          vertex(n.x + n.z, n.y + n.z*2);
          vertex(w.x + w.z, w.y + w.z*2);
          vertex(c.x + c.z, c.y + c.z*2);
        endShape();
        val = ((c.z + s.z + e.z)/80)*255;
        fill(val/10, val/10, map(val, 0, 255, 255, 0));
        beginShape();
          vertex(c.x + c.z, c.y + c.z*2);
          vertex(s.x + s.z, s.y + s.z*2);
          vertex(e.x + e.z, e.y + e.z*2);
          vertex(c.x + c.z, c.y + c.z*2);
        endShape();
       }
    }
  }
}