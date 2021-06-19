class Particle {

    constructor(pos) {

        this.pos = pos;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

    }

    update () {

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);

        this.vel.mult(friction);

    }

    draw() {

        push();

            fill(255);
            noStroke();
            ellipse(this.pos.x, this.pos.y, 5, 5);

        pop();

    }

}