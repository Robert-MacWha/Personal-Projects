class Particle {
  constructor (i) {
    this.pos = createVector(400, i * 4);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.col = color(random(200), random(200), random(200), 10);
    
    this.maxVel = 2;
  }
  
  update () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.loopOnEdges();
  }
  
  show () {
    push();
      stroke(this.col);
      strokeWeight(3);
      point(this.pos.x, this.pos.y);
    pop();
  }
  
  tryAddAcc (x, y, vel) {
    let distSquared = (x-this.pos.x)*(x-this.pos.x) + 
                      (y-this.pos.y)*(y-this.pos.y);
    
    if (distSquared <= 100) {
      this.addForce(vel);
    }
  }
  
  loopOnEdges () {
    if(this.pos.x < 0) { this.pos.x = width; }
    if(this.pos.x > width) { this.pos.x = 0; }
    if(this.pos.y < 0) { this.pos.y = height; }
    if(this.pos.y > height) { this.pos.y = 0; }
  }
  
  addForce (force) {
    this.acc.add(force.mult(0.1));
  }
}