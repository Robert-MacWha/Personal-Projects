ArrayList<Particle> particles = new ArrayList<Particle>();

void setup() {
  size(1000, 1000);
  frameRate(60);

  for(int i = 0; i < 50; i ++) {
    particles.add(new Particle(
      random(width),
      random(height),
      10,
      color(random(255), random(255), random(255))
    ));
  }
}

void draw() {

  background(255);

  for(int f = 0; f < 20; f ++) {
    for(int i = 0; i < particles.size(); i ++) {

      for(int j = 0; j < i; j ++) {

        particles.get(i).interact(particles.get(j));

      }

    }

    for(Particle p : particles) {
      p.update();
    }
  }

  for(Particle p : particles) {

    p.render(); 

  }
  
}