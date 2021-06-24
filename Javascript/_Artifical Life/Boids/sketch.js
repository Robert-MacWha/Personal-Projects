let population = [];
let boidCount = 100;
let boidSize = 0.2;

let FOV = 90;
let Range = 100;
let maxAcc = 1;
let maxVel = 5;

let sepStrength = 1;
let aliStrength = 1;
let cohStrength = 0.02;

let rangeSlider, FOVSlider, sepSlider, aliSlider, cohSlider;

let rangeT, fovT, sepT, aliT, cohT;

function setup() {
  createCanvas(600, 500);
  background(21);
  //Create the boids
  for(let i = 0; i < boidCount; i ++) {
    population[i] = new Boid(random(width), random(height));
  }
  //UI
    //Sliders
  rangeSlider = createSlider(20, 200, 100);
  rangeSlider.position(625, 50);
  FOVSlider = createSlider(15, 180, 90);
  FOVSlider.position(625, 150);
  sepSlider = createSlider(0.1, 20, 5, 0.1);
  sepSlider.position(625, 250);
  aliSlider = createSlider(0.1, 20, 5, 0.1);
  aliSlider.position(625, 350);
  cohSlider = createSlider(0.1, 20, 5, 0.1);
  cohSlider.position(625, 450);
    //Text
  rangeT = createP("Range: ");
  rangeT.position(625, 0);
  rangeT.style('font-size', '20px');
  fovT = createP("FOV: ");
  fovT.position(625, 100);
  fovT.style('font-size', '20px');
  sepT = createP("Seperation: ");
  sepT.position(625, 200);
  sepT.style('font-size', '20px');
  aliT = createP("Alignment: ");
  aliT.position(625, 300);
  aliT.style('font-size', '20px');
  cohT = createP("Cohesion: ");
  cohT.position(625, 400);
  cohT.style('font-size', '20px');
}

function draw() {
  background(220);
  //Update vars
  Range = rangeSlider.value();
  FOV = FOVSlider.value();
  sepStrength = sepSlider.value();
  aliStrength = aliSlider.value();
  cohStrength = cohSlider.value();
  //Update the boids
  for(let i = 0; i < population.length; i ++) {
    population[i].update();
  }
  //UI
  rangeT.html("Range: " + Range);
  fovT.html("FOV: " + FOV*2);
  sepT.html("Seperation: " + sepStrength);
  aliT.html("Alignment: " + aliStrength);
  cohT.html("Cohesion: " + cohStrength);
}