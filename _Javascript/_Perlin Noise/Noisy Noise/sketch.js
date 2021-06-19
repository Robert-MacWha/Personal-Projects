let s = 0.01;     // Noise scale
let s2 = 0.02;    // Distortion scale
let p = 2;     // Pixel size 
let t = 0.05;      // Time rate
let T = 0;      // Current time
let ridged = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {  
  for(let x = 0; x < width; x += p) {
    for(let y = 0; y < height; y += p) {
      
      pX = x + (noise((x + 20*T) * s2, (y) * s2, T) * width);
      pY = y + (noise((x) * s2, (y + 20*T) * s2, T) * height);
      
      c = noise(pX * s + T/10, pY * s - T/10);
      
      if (ridged) {
        c -= 0.5;
        c = abs(c);
        c *= 2;
      }
      
      fill(c * 255, c * 255, c * 255);
      noStroke();
      rect(x, y, p, p);
      
    }
  }
  
  T += t;
}