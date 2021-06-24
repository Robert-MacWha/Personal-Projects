class Spring {

    constructor (p1, p2, k, r) {

        this.p1 = p1;
        this.p2 = p2;

        // Spring force constant
        this.k = k / 100;

        // Resting length of the spring
        this.r = r;

    }

    update() {

        // calculate the force between the two particles
        let dist = p5.Vector.dist(this.p1.pos, this.p2.pos);
        let x = dist - this.r;
        
        let fs = -this.k * x;
        let fd = p5.Vector.sub(this.p1.pos, this.p2.pos).normalize();

        let fVector = p5.Vector.mult(fd, fs / 2);

        // apply said force to the particles
        this.p1.acc.add(fVector);
        this.p2.acc.sub(fVector);
    }

    draw () {

        // Draw a line between the two particles
        push();

            noFill();
            stroke(114, 188, 212, 255);
            strokeWeight(4);

            let a = this.p1.pos;
            let b = this.p2.pos;

            line(a.x, a.y, b.x, b.y);
                
        pop();

    }

}