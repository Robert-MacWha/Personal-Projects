class String {

    constructor(pos, len, strength) {

        this.particles = [];
        this.springs = [];

        // the number of particles is equal to the length
        for(let i = 0; i < len; i ++) {

            this.particles[i] = new Particle(createVector(pos.x, pos.y + i * 10));

        }

        // connect each particle to the next one
        for(let i = 0; i < len - 1; i ++) {
            this.springs[i] = new Spring(this.particles[i], this.particles[i + 1], strength - (i * 6), 1)
        }

    }

    update(pos) {

        // update all springs
        for(let s of this.springs) {

            s.update();

        }

        // update the pos of the first particle
        this.particles[0].pos = pos;
        this.particles[0].vel.mult(0);

        // update all particles
        for(let p of this.particles) {

            p.update();

        }

    }

    draw () {

        for(let s of this.springs) {

            s.draw();

        }

    }

}