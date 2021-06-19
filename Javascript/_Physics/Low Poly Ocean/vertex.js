let scale = 0.1;
let strength = 30;

class Vertex {
  constructor (x, y, maxX, maxY) {
    this.x = x;
    this.y = y;
    this.maxX = maxX;
    this.maxY = maxY;
    this.z = noise(((x)*scale) / maxX, 
                   ((y)*scale/2) / maxY);
    this.z *= strength; 
  }
  
  update (off) {
    this.z = noise(((this.x+off.x)*scale) / this.maxX, 
                   ((this.y+off.y)*scale/2) / this.maxY);
    this.z *= strength; 
  }
  
  setToMouse() {
    //this.z = 30; 
  }
}