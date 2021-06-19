const r = 2;
const i = 0.07;
const m = 1500;
const range = 100;
const mouseRange = 50;
const maxForce = 1;
const friction = 0.95;
const gravity = 1;

let particles = [];
let lockedParticles = [];

function setup() {
    createCanvas(800, 800);
    background(21);

    for(let i = 0; i < 1000; i ++) {
        
        let p = new Particle(random(width), random(height));
        particles[i] = p;

    }

}
  
function draw() {
    background(21);
    
    for(let i = 0; i < particles.length; i ++) {

        for(let j = 0; j < particles.length; j ++) {

            if (j > i) {

                particles[i].interact(particles[j]);

            }

        }

    }

    for(let p of particles) {
        p.update();
        p.show();
    }

    if (mousePressed) {



    }
}

function mousePressed() {

    let mousePos = createVector(mouseX, mouseY);

    // get all particles within a distance from the mouse & lock them
    for(let p of particles) {

        let d = p5.Vector.dist(p.pos, mousePos);

        if (d < mouseRange) {

            p.locked = true;
            p.offset = p5.Vector.sub(p.pos, mousePos);

            lockedParticles.push(p);

        }

    }

}

function mouseReleased() {
    for(let p of lockedParticles) {

        p.locked = false;

    }
}