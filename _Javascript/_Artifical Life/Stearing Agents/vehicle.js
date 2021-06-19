class Vehicle {
  constructor(x, y, dna) {
    this.acc = createVector(0, 0);
    this.vel = createVector(0, -2);
    this.pos = createVector(x, y);
    this.r = 4;
    this.maxspeed = 1.5;
    this.maxforce = 0.1;
    this.decayRate = 0.002;

    this.health = 1;
    this.dna = [];
    if (dna == undefined) {
      //Food weight
      this.dna[0] = random(-2, 2);
      //Poison weight
      this.dna[1] = random(-2, 2);
      //Food perseption
      this.dna[2] = random(0, 100);
      //poison perseption
      this.dna[3] = random(0, 100);
      // breeding level
      this.dna[4] = random(2, 6);
      // color
      this.dna[5] = random(255);
      this.dna[6] = random(255);
      this.dna[7] = random(255);
    } else {
      for(let i = 0; i < dna.length; i ++) {
        this.dna[i] = dna[i];
        if (random(1) < mr/100) {
          this.dna[i] += random(-0.1, 0.1);
        } else if (random(1) < mr/500) {
          this.dna[i] += random(-2, 2);
        }
      }
    }
  }

  // Method to update location
  update() {
    //Loose some health
    this.health -= this.decayRate;
    // Update velocity
    this.vel.add(this.acc);
    // Limit speed
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // Reset accelerationelertion to 0 each cycle
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  dead () {
    return(this.health <= 0);
  }

  behaviors (good, bad) {
      let steerG = this.eat(good, 0.2, this.dna[2]);
      let steerB = this.eat(bad, -0.3, this.dna[3]);

      steerG.mult(this.dna[0]);
      steerB.mult(this.dna[1]);

      this.applyForce(steerG);
      this.applyForce(steerB);
  }

  eat (list, nutrition, perseption) {
      //Find the closest food's index
      let record = Infinity;
      let target = null;
      for (let i = list.length-1; i >= 0; i --) {
        //Get the distance
        let d = this.pos.dist(list[i]);

        if (d < this.maxspeed) {
          //Eat the food
          list.splice(i, 1);
          this.health += nutrition;
        } else if (d < record && d < perseption) {
          record = d;
          target = list[i];
        }
      }
      
      if (target != null) {
          //Seek the food and return the vector
          return(this.seek(target));
      }
      return(createVector(0, 0));
  }

  clone () {
    if (random(1) < 0.002 && this.health > this.dna[4]/10) {
      this.health -= this.dna[4] * 0.08;
      return(new Vehicle(this.pos.x, this.pos.y, this.dna));
    }
    return(null);
  }
    
  seek(target) {
    var desired = p5.Vector.sub(target, this.pos); // A vector pointing from the location to the target
    // Scale to maximum speed
    desired.setMag(this.maxspeed);
    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.vel);
    // Limit to maximum steering force
    steer.limit(this.maxforce); 
    return(steer);
  }
  
  display() {
    // Draw a triangle rotated in the direction of velocity
    let angle = this.vel.heading() + PI / 2;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(angle);

    let gr = color(0, 255, 0);
    let rd = color(255, 0, 0);
    let col = color(this.dna[5], this.dna[6], this.dna[7]);

    noFill();
    strokeWeight(4);
    stroke(0, 255, 0);
    line(0, 0, 0, -this.dna[0]*20);
    strokeWeight(1);
    ellipse(0, 0, this.dna[2]*2);
    strokeWeight(2);
    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1]*20);
    strokeWeight(1);
    ellipse(0, 0, this.dna[3]*2);

    fill(col);
    stroke(200);
    strokeWeight(1);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }

  boundaries() {
    let d = 10;
    let desired = null;

    if (this.pos.x < d) {
      desired = createVector(this.maxspeed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-this.maxspeed, this.vel.y);
    }

    if (this.pos.y < d) {
      desired = createVector(this.vel.x, this.maxspeed);
    } else if (this.pos.y > height - d) {
      desired = createVector(this.vel.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }
}