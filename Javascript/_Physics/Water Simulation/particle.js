class Particle {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        this.locked = false;
        this.offset = createVector();
    }

    interact(other) {

        // calculate distance
        let d = p5.Vector.dist(this.pos, other.pos);

        if (d > range) {
            return;
        }

        // calculate the repulsive force
        let Fr = pow(r / d, 2);
        Fr = min(Fr, maxForce);

        let dir_Fr = p5.Vector.sub(this.pos, other.pos);

        // apply the repulsive force
        Fr = dir_Fr.mult(Fr);

        this.acc.add(Fr);
        other.acc.sub(Fr);

        // calculate the interactive force
        let Fi = (i / d);
        Fi = min(Fi, maxForce);

        let dir_Fi = p5.Vector.sub(other.pos, this.pos);

        // apply the repulsive force
        Fi = dir_Fi.mult(Fi);

        this.acc.add(Fi);
        other.acc.sub(Fi);
        
    }

    update() {

        let mousePos = createVector(mouseX, mouseY);

        if (this.locked) {

            // calculate the force towards the mouse
            let d = p5.Vector.dist(this.pos, mousePos);

            let Fm = pow(d / m, 2);
            Fm = min(Fm, maxForce);

            let dir_Fm = p5.Vector.sub(mousePos, this.pos);

            // apply the repulsive force
            Fm = dir_Fm.mult(Fm);

            this.acc.add(Fm);

        }

        this.vel.add(this.acc);
        this.vel.add(createVector(0, gravity));

        this.pos.add(this.vel);
        
        this.acc.mult(0);
        this.vel.mult(friction);

        if (this.pos.x > width - 10)  { this.acc.x = ((width - 10) - this.pos.x) / 5; }
        if (this.pos.x < 10)      { this.acc.x = (10 - this.pos.x) / 5 ; }
        if (this.pos.y > height - 10) { this.acc.y = ((height - 10) - this.pos.y) / 5; }
        if (this.pos.y < 10)      { this.acc.y = (10 - this.pos.y) / 5; }

    }

    show() {

        fill(255, 100);
        noStroke();

        ellipse(this.pos.x, this.pos.y, r * 2);

    }

}