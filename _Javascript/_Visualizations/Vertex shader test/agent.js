class Agent {
  
  constructor(pos, vel) {
    
    this.pos = pos;
    this.vel = vel;
    
  }
  
  update() {
    
    this.pos.add(this.vel);
    
    if (this.pos.x <= 0)      { this.vel.x *= -1; }
    if (this.pos.x >= width)  { this.vel.x *= -1; }
    if (this.pos.y <= 0)      { this.vel.y *= -1; }
    if (this.pos.y >= height) { this.vel.y *= -1; }
    
  }
  
  draw() {
    
    let x = round(this.pos.x);
    let y = round(this.pos.y);
    
    let index = (y * width + x) * 4;
    pixels[index + 0] = 255;
    pixels[index + 1] = 255;
    pixels[index + 2] = 255;
    
  }
  
}