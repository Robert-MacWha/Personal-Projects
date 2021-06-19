let gridSize = 800;
let tileSize = 10;

let noiseScale = 8;

let noiseValues = [];
let min = 1;
let max = 0;
let z_pos = 0;

let particles = [];

function setup() {
  createCanvas(gridSize, gridSize);
  
  for(let i = 0; i < 200; i ++) {
    particles[i] = new Particle(i); 
  }
  
  background(255);
}

function draw() {
  calculateNoiseValues();
  drawNoiseValues();
  
  for (let p of particles) {
    p.update();
    
    if (z_pos < 0.005) { continue; }
    p.show();
  }
}

function calculateNoiseValues() {
  for (let x = 0; x < gridSize; x += tileSize) {
    
    noiseValues[x] = [];
    for (let y = 0; y < gridSize; y += tileSize) {
      let n = noise(((x/tileSize) / gridSize) * noiseScale,
        ((y/tileSize) / gridSize) * noiseScale + z_pos, z_pos);
      noiseValues[x][y] = n;
      if (n < min) {
        min = n;
      }
      if (n > max) {
        max = n;
      }
    }
  }
  
  z_pos += 0.00005;
}

function drawNoiseValues () {
  
  for(let x = 0; x < gridSize; x += tileSize) {
    for(let y = 0; y < gridSize; y += tileSize) {
      noiseValues[x][y] /= max;
      noiseValues[x][y] *= 180;
      let xPos = cos(noiseValues[x][y]);
      let yPos = sin(noiseValues[x][y]);

      //Update particles
      for (let p of particles) {
        p.tryAddAcc(x, y, createVector(xPos, yPos));  
      }
    }
  }
}