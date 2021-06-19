class Particle {

    PVector pos;
    PVector vel;

    float r;
    color c;

    Particle(float x, float y, float r, color c) {

        this.pos = new PVector(x, y);
        this.r = r;
        this.c = c;
        
        this.vel = new PVector(0, 0);

    }

    public void interact(Particle other) {

        float a = 10;
        float b = 15;
        float c = 0.0001;

        float d = PVector.dist(this.pos, other.pos);
        
        // never let dist be 0
        if (d == 0)
            return;

        PVector fDir = PVector.sub(this.pos, other.pos);
        float fMag = (1 / pow(d / a, 2)) - (2 / (d / b));
        fMag *= c;

        PVector force = fDir.setMag(fMag);

        this.vel.add(force);
        other.vel.sub(force);

    }

    public void update() {

        this.pos.add(this.vel);
        this.vel.mult(0.999);

        this.pos.y = min(height, this.pos.y);

    }

    public void render() {

        push();

            stroke(20, 20, 20);
            strokeWeight(1);
            fill(this.c);

            ellipse(this.pos.x, this.pos.y, this.r, this.r);

        pop();

    }

}