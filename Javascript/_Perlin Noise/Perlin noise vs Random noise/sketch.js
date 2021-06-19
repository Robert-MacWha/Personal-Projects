let frequency = 0.01;
let amplitude = 75;

function setup() {
  createCanvas(windowWidth, 400);
  
  background(255);
  
  generatePerlinLine();
  generateRandomLine();
}

function generatePerlinLine() {
  
  push();
  
    noFill();
    stroke(10);
    strokeWeight(3);

    translate(0, 100);

    beginShape();

      for(let x = 0; x < width; x ++) {

        let y = ((noise(x * frequency) * 2) - 1) * amplitude;

        vertex(x, y);

      }

    endShape();
  
  pop();
  
}


function generateRandomLine() {
  
  push();
  
    noFill();
    stroke(10);
    strokeWeight(3);

    translate(0, 300);

    beginShape();

      for(let x = 0; x < width; x ++) {

        let y = ((random() * 2) - 1) * amplitude;

        vertex(x, y);

      }

    endShape();
  
  pop();
  
}