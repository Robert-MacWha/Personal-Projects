public class Particle {

    PVector pos;
    PVector vel;
    PVector acc;

    float r;
    float m;

    public Particle (float x, float y, float r, float m) {

        this.pos = new PVector(x, y);
        this.vel = new PVector(0, 0);
        this.acc = new PVector(0, 0);

        this.r = r;
        this.m = m;

    }

    public void update() {

        // update the acceleration based on gravity
        this.acc = new PVector(0, GRAVITY);

        // move the particle to its new location
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.vel.mult(0.99);

        // check for collisions at the world border
        this.world_Collisions();

        // check for collisions with other balls
        for(int i = 0; i < particles.size(); i ++) {

            if (particles.get(i) != this) {

                this.collide(particles.get(i));

            }

        }

        this.acc.mult(0);

    }

    public void render() {

        fill(255, 255, 255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);

    }

    private void world_Collisions() {

        if (this.pos.x < this.r) {
            this.vel.x *= -WORLD_ELASTICITY;
            this.pos.x = this.r;
        }

        if (this.pos.x > width - this.r) {
            this.vel.x *= -WORLD_ELASTICITY;
            this.pos.x = width - this.r;
        }

        if (this.pos.y < this.r) {
            this.vel.y *= -WORLD_ELASTICITY;
            this.pos.y = this.r;
        }

        if (this.pos.y > height - this.r) {
            this.vel.y *= -WORLD_ELASTICITY;
            this.pos.y = height - this.r;
        }

    }

    private void collide(Particle other) {

        if (this.pos.x + this.r > other.pos.x - other.r &&
            this.pos.x - this.r < other.pos.x + other.r &&
            this.pos.y + this.r > other.pos.y - other.r &&
            this.pos.y - this.r < other.pos.y + other.r) {

                // see if the particles are intersecting
                float dist = PVector.dist(this.pos, other.pos);
                if (dist <= this.r + other.r) {
                    
                    this.resolve_Collision(other, dist);

                }
            }

    }

    // code from https://github.com/nipunramk/Reducible/blob/master/Collision/collision.py#L140
    // equation from https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
    private void resolve_Collision(Particle other, float d) {

        // calculate the distance to the other particle's edge
        float dist_to_other = (this.r + other.r) - d;

        // calculate the direction to the other particle
        PVector dir_to_other = PVector.sub(other.pos, this.pos).normalize();

        // move each particle away from the other by half the corrective distance
        PVector corrective_force = PVector.mult(dir_to_other, -dist_to_other);

        float p1 = this.vel.mag() * this.m;
        float p2 = other.vel.mag() * other.m;
        float momentum_ratio = p1 / (p1 + p2);

        this.pos.add(PVector.mult(corrective_force, 1 - momentum_ratio));
        other.pos.sub(PVector.mult(corrective_force, momentum_ratio));

        PVector n1 = PVector.sub(this.pos, other.pos).normalize();
        PVector n2 = PVector.sub(other.pos, this.pos).normalize();

        // calculate the new directions of both particles
        PVector v1_dir = PVector.sub(this.vel , PVector.mult(n1, 2 * PVector.dot(this.vel , n1))).normalize();
        PVector v2_dir = PVector.sub(other.vel, PVector.mult(n2, 2 * PVector.dot(other.vel, n2))).normalize();

        // use conservation of momentum and energy to calculate the magnitude of these vectors
        float v1_m = this.vel.mag();
        float v2_m = other.vel.mag();

        float m1 = ((this.m - other.m) / (this.m + other.m)) * v1_m + ((2 * other.m) / (this.m + other.m)) * v2_m;
        float m2 = ((other.m - this.m) / (this.m + other.m)) * v2_m + ((2 * this.m ) / (this.m + other.m)) * v1_m;

        m1 *= PARTICLE_ELASTICITY;
        m2 *= PARTICLE_ELASTICITY;

        v1_dir.mult(m1);
        v2_dir.mult(m2);

        this.vel = v1_dir;
        other.vel = v2_dir;

    }

    private float calculate_Velocity_Component(float v1, float v2, float m1, float m2) {

        return (
            ((m1 - m2) / (m1 + m2)) * v1 + ((2 * m2) / (m1 + m2)) * v2
        );

    }

}