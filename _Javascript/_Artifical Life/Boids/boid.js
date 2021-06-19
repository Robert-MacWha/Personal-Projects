class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));
    this.acc = createVector();
  }

  update() {
    //Get all of the boid's neighbors that it can see
    let neighbors = this.getNeighbors();
    //Apply the seperation, alignment and cohesion maths
    this.separation(neighbors);
    this.alignment(neighbors);
    this.cohesion(neighbors);
    this.avoidence();
    //Physics Update!
    this.acc.setMag(maxAcc);
    this.vel.add(this.acc);
    this.vel.setMag(maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
    //Show the boid
    push();
    //Get the color
    noStroke();
    fill(255);
    //Draw the tri
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + PI / 2);
    let size = 0.5;
    triangle(5 * size, 10 * size, 
             0, -10 * size, -5 * size, 10 * size);
    pop();
  }

  getNeighbors() {
    //Get all of the boid's neighbors that it can see
    let neighbors = [];
    for (let i = 0; i < population.length; i++) {
      //Check to see if the other boid is close enough and can be seen with the FOV
      let other = population[i];
      //Return if the other is this one
      if (other != this) {
        let distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (distance < Range) {
          //The other boid is in range, now check if it's in the fov
          //cos(A) = (b^2 + c^2 - a^2)/2bc
          //Imaginary point
          let C = p5.Vector.add(this.pos, p5.Vector.mult(this.vel, 100));
          //Lengths of the side of the triangle
          let a = dist(C.x, C.y, other.pos.x, other.pos.y);
          let b = dist(C.x, C.y, this.pos.x, this.pos.y);
          let c = distance;
          //Actual equation
          let numerator = (pow(b, 2)) + (pow(c, 2)) - (pow(a, 2));
          let denominator = 2 * b * c;
          let angle = degrees(acos(numerator / denominator));
          //If the angle is less than the boid's FOV, add it to the list of neighbors
          if (angle < FOV) {
            neighbors.push(other);
          }
        }
      }
    }
    //Return the list of neighbors
    return (neighbors);
  }

  separation(neighbors) {
    let acceleration = createVector();
    //Loop over each neighbor
    for (let i = 0; i < neighbors.length; i++) {
      let other = neighbors[i];
      //Get the distance and direction from this to the other
      let dist = p5.Vector.dist(this.pos, other.pos);
      let dir = p5.Vector.sub(this.pos, other.pos);
      //Set an acceleration bassed on the dist + dir
      acceleration.add(dir.div(dist / 5));
    }
    //Padding
    acceleration.mult(sepStrength);
    //Apply it
    this.acc.add(acceleration);
  }

  alignment(neighbors) {
    let avgVel = createVector();
    let others = 0;
    //Loop over each neighbor
    for (let i = 0; i < neighbors.length; i++) {
      let other = neighbors[i];
      //Get the average velocity of all of them
      avgVel.add(other.vel);
      others ++;
    }
    //Fix for divide by 0 error
    if (others > 0) {
      avgVel.div(neighbors.length);
      //Padding
      avgVel.mult(aliStrength);
      //Slowly change the velocity to match it
      this.acc.add(avgVel);
    }
  }

  cohesion(neighbors) {
    let position = createVector();
    let others = 0;
    //Loop over each neighbor
    for (let i = 0; i < neighbors.length; i++) {
      let other = neighbors[i];
      //Add the position to the average
      position.add(other.pos);
      others++;
    }
    if (others > 0) {
      position.div(neighbors.length);
      //Accelerate towards this point
      let dir = p5.Vector.sub(this.pos, position);
      this.acc.add(dir.mult(-cohStrength));
    }
  }

  avoidence() {
    //TEMP
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
    if (this.pos.x > width) {
      this.pos.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
    }
  }
}