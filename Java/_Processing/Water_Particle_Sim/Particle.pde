class Particle {
  
  PVector pos;
  PVector vel;
  PVector acc;
  boolean locked;
  PVector offset;

    Particle(float x, float y) {
        this.pos = new PVector(x, y);
        this.vel = new PVector(0, 0);
        this.acc = new PVector(0, 0);

        this.locked = false;
        this.offset = new PVector(0, 0);
    }

    void interact(Particle other) {

        // calculate distance
        float d = PVector.dist(this.pos, other.pos);

        if (d > range) {
           return;
        }
        
        // calculate the repulsive force
          float Fr = pow(r / d, 2);
          Fr = min(Fr, maxForce);
  
          PVector dir_Fr = PVector.sub(this.pos, other.pos);
 
         // apply the repulsive force

        dir_Fr = dir_Fr.mult(Fr);
 
         this.acc.add(dir_Fr);
          other.acc.sub(dir_Fr);
        
// calculate the interactive force
        float Fi = (i / d);
        Fi = min(Fi, maxForce);

        PVector dir_Fi = PVector.sub(other.pos, this.pos);

        // apply the repulsive force
        dir_Fi = dir_Fi.mult(Fi);

        this.acc.add(dir_Fi);
        other.acc.sub(dir_Fi);
        
    }

    void update() { 

        PVector mousePos = new PVector(mouseX, mouseY);

        if (this.locked) {

            // calculate the force towards the mouse
            float d = PVector.dist(this.pos, mousePos);

            float Fm = pow(d / m, 2);
            Fm = min(Fm, maxForce);

            PVector dir_Fm = PVector.sub(mousePos, this.pos);

            // apply the repulsive force
            dir_Fm = dir_Fm.mult(Fm);

            this.acc.add(dir_Fm);
        }

        this.vel.add(this.acc);
        this.vel.add(new PVector(0, gravity));

        this.pos.add(this.vel);
        
        this.acc.mult(0);
        this.vel.mult(friction);

        if (this.pos.x > width)  { this.acc.x = (width - this.pos.x) / 5; }
        if (this.pos.x < 0)      { this.acc.x = -this.pos.x / 5; }
        if (this.pos.y > height) { this.acc.y = (height - this.pos.y) / 5; }
        if (this.pos.y < 0)      { this.acc.y = -this.pos.y / 5; }

    }

    void show() {

        fill(255, 100);
        noStroke();

        ellipse(this.pos.x, this.pos.y, r * 2, r * 2);
    }

}
