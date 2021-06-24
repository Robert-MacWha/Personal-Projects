let growth = 1;
const maxPop = 300;
const initialPop = 150;

let growthRate = 0.01;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let N = initialPop;
  
  noStroke();
  fill(45, 74, 83);
  
  for(let i = 0; i < 200; i ++) {
    
    N =+ growth * ((maxPop - N) / maxPop) * N;
    
    let x = i * 5;
    let y = height - N;
    
    ellipse(x, y, 4);
    
  }
  
  growth += growthRate;
  growthRate *= 0.997;
}