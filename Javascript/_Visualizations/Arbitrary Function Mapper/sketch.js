let x = 0;
let y = 0;

let posHistory = [];
let isValPositive = false;

let h = 0;

let outputValue = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  
  stroke(0);
  strokeWeight(2);
  
  posHistory[0] = 0;
  posHistory[1] = 0;
  posHistory[2] = 0;
}

function draw() {
  for(let i = 0; i < 100; i ++) {
    y = smoothFunction(x);
    point(x*16, y*16 + 300); 
    
    stroke(0);
    
    //Update the position history
    posHistory[2] = posHistory[1];
    posHistory[1] = posHistory[0];
    posHistory[0] = y;
    
    //See if the velocity has changed
    if (sig(posHistory[2] - posHistory[1]) !=
         sig(posHistory[1] - posHistory[0])) {
      
      isValPositive = !isValPositive; 
      strokeWeight(1);
      stroke(100);
      line(x*16, 0, x*16, height);
      stroke(0);
      strokeWeight(2);
    }
    
    y = 0;
    if (isValPositive) { y = 1; }
    point(x*16, y*32 + 100);
    
    
    // Increment X
    x += 0.001;
  }
}

function smoothFunction (x) {
  
  let a = 0;
  for(let i = 0; i < 10; i ++) {
    a += sin(x*(i+1)*0.4); 
  }
  
  return(sin(a));
}

function sig (x) {
  if(x > 0) {
    return(1);
  }
  
  return(0);
}