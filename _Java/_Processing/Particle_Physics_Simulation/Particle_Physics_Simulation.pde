static float GRAVITY = 0.2;
static float WORLD_ELASTICITY = 0.9; // number ranging from 0-1 (where 0 = no bouncing and 1 = 100% efficient bouncing)
static float PARTICLE_ELASTICITY = 1;

ArrayList<Particle> particles;

void setup() {
	size(500, 500);
	ellipseMode(CENTER);
	frameRate(200);

	particles = new ArrayList<Particle>();

	for(int i = 0; i < 2000; i ++) {

		particles.add(new Particle(random(width), random(height), 3, 1));

	}
}

void draw(){
	background(64);

	for(int i = 0; i < particles.size(); i ++)
		particles.get(i).update();
	
	for(int i = 0; i < particles.size(); i ++)
		particles.get(i).render();

}