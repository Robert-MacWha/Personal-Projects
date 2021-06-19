final float r = 1;
final float i = 0.006;
final float m = 1000;
final int range = 50;
final int mouseRange = 50;
final float maxForce = 1;
final float friction = 0.97;
final float gravity = 0.8;

Particle[] particles;
ArrayList<Particle> lockedParticles = new ArrayList();

void setup() {
    size(800, 800);
    background(21);
    
    int particle_count = 2000;
    particles = new Particle[particle_count];

    for(int i = 0; i < particle_count; i ++) {
        
        Particle p = new Particle(random(width), random(height));
        particles[i] = p;

    }

}
  
void draw() {
    background(21);
    
    for(int i = 0; i < particles.length; i ++) {

        for(int j = 0; j < particles.length; j ++) {

            if (j > i) {

                particles[i].interact(particles[j]);

            }

        }

    }

    for(int i = 0; i < particles.length; i ++) {
        particles[i].update();
        particles[i].show();
    }
}

void mousePressed() {

    PVector mousePos = new PVector(mouseX, mouseY);
    lockedParticles = new ArrayList();

    // get all particles within a distance from the mouse & lock them
    for(int i = 0; i < particles.length; i ++) {

        float d = PVector.dist(particles[i].pos, mousePos);

        if (d < mouseRange) {

            particles[i].locked = true;
            particles[i].offset = PVector.sub(particles[i].pos, mousePos);

            lockedParticles.add(particles[i]);

        }

    }

}

void mouseReleased() {
    for(int i = 0; i < lockedParticles.size(); i ++) {

        lockedParticles.get(i).locked = false;

    }
}
