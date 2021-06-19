const friction = 0.99;

let particles = [];
let springs = [];

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);

    // Add a bunch of random particles
    for(let i = 0; i < 20; i ++) {
        particles[i] = new Particle(createVector(random(width), random(height)));
    }

    for(let i = 0; i < 19; i ++) {

        let p1 = particles[floor(i)];
        let p2 = particles[floor(i + 1)];

        springs[i] = new Spring(p1, p2, 0.5, 50);

    }

    springs[19] = new Spring(particles[0], particles[19], 0.5, 50);
}
  
function draw() {
    background(21);

    for(let s of springs) {

        s.update();

    }

    for(let p of particles) {

        p.update();

    }

    for(let p of particles) {

        p.draw();

    }

    for(let s of springs) {

        s.draw();

    }
}