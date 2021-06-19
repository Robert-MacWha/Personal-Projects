let points = new Array(0);
let trailers = [];

// -3 flies right
// -4 flies left
let a = 10;
let b = 28;
let c = 8/3;
let scale = 5.1;

let x = 0.01;
let y = 0;
let z = 0;
let rotation = 0;
let rotationSpeed = 0;

let tailLength = 10;
let speed = 1;
let startAmount = 1;

let tCount = 1;
let tOffset = 100;

function setup() {
  createCanvas(400, 400, WEBGL);
  colorMode(HSB);
  points.push(createVector(0, 0, 0));
  
  noFill();
  stroke(0);
  strokeWeight(4);
  translate(0, 0, -200);
  background(255, 0.01);
  
  for(let i = 0; i < tCount; i ++) {
    trailers[i] = new Trailer(i*tOffset);
  }
  
  for(let i = 0; i < startAmount; i ++) {
    points.push(createVector(x, y, z));
    //Calculate the velocities
    let dt = 0.005;
    let dx = a * (y - x) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;

    x += dx;
    y += dy;
    z += dz;
  }
}

function draw() {
  //a -= 0.01;
  rotation += rotationSpeed;
  
  //background(255, 0.01);
  rotate(rotation);
  
  for(let i = 0; i < speed; i ++) {
    points.push(createVector(x, y, z));
    //Calculate the velocities
    let dt = 0.005;
    let dx = a * (y - x) * dt;
    let dy = (x * (b - z) - y) * dt;
    let dz = (x * y - c * z) * dt;

    x += dx;
    y += dy;
    z += dz;
  }
  
  noFill();
  for(let t of trailers) {
    t.show(); 
  }
}