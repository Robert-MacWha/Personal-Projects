ray = 0;   // createVector(width/2, height/2)
rayDir   = 1;
raySpeed = 2;

function setup() {
  createCanvas(400, 400);
  background(0);
  
  ray = createVector(width/2, height/2);
}


function draw() {
  // background(220);
  
  for (let i = 0; i < 400; i ++) {
  
  rayVel = createVector(
    cos(rayDir) * raySpeed, sin(rayDir) * raySpeed
  );
  
  prevPos = createVector(ray.x, ray.y);
  ray.add(rayVel);
  
  // collisions
  if (ray.x > width) {
    rayDir = calculateBounceDir(PI);
  }
  else if (ray.x < 0) {
    rayDir = calculateBounceDir(-PI);
  }
  
  if (ray.y > height) {
    rayDir = calculateBounceDir(TWO_PI);
  }
  
  if (ray.y < 0) {
    rayDir = calculateBounceDir(-TWO_PI);
  }
  
  // rendering
  push();
    stroke(255, 255, 255, rayDir)
    strokeWeight(1)
    line(prevPos.x, prevPos.y, ray.x, ray.y);
  pop();
  
  // offset
  rayDir += 0.000000001;
  }
}

function calculateBounceDir(normal) {
  // difference between normal and dir
  normalDif = normal - rayDir;
  
  return normalDif;
}