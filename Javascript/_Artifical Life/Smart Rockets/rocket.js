class Rocket {
    constructor (dna) {
        this.pos = createVector(200, 390);
        this.vel = createVector()
        this.acc = createVector();
        if (dna) {
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
        this.fit;
        this.d;
        this.completed = false;
        this.time = lifeSpan;
        this.crashed = false;
    }

    applyForce (force) {
        //Add the force with the rocket's acceleration
        this.acc.add(force);
    }

    update () {
        //Only move if the rocket has not completed it's goal and has not hit anything
        if (!this.completed && !this.crashed) {
            //Apply the force that the dna tells it to
            this.applyForce(this.dna.genes[count]);
            //Update the velocity by the acceleration, then update the position and reset the velocity
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);

            //If it hits the target, set the completed var
            let d = dist(this.pos.x, this.pos.y, target.x, target.y);
            if (d < 16) {
                this.completed = true;
                this.time = count;
            }
            //Check to see if the rocket has hit the obstacle or the edge of the screen
            if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
                this.crashed = true;
            }
            if (this.pos.x > 390 || this.pos.x < 0 || this.pos.y < 0) {
                this.crashed = true;
            }
        }
    }

    show () {
        //Push and pop are to keep the translations and rotations contained
        push();
        noStroke();
        fill(45, 74, 83, 150);
        //Translations
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }

    calcFitness () {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.d = d;
        this.fit = map(d, 0, width, width, 0);
        if (this.completed) {
            this.fit *= 10;
        }
        if (this.crashed) {
            this.fit /= 10;
        }
        this.fit /= ((this.time / lifeSpan)) + 0.00001;
    }
}