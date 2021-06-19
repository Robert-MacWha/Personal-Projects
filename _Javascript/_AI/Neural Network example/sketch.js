let weightSlider;
let biasSlider;

let Xs = [3,
6,
7,
1,
12,
8,
15,
3,
7,
1,
2,
7,
3,
4,
7,
1,
8,
12,
7,
9,
10,
2,
4,
9,
6,
3,
9,
2,
4]

let ys = [5,
8,
10,
3,
15,
10,
18,
5,
9,
3,
4,
10,
5,
7,
9,
3,
11,
15,
11,
13,
14,
4,
6,
12,
8,
5,
11,
4,
5]

function setup() {
  createCanvas(400, 580);
  textAlign(CENTER, CENTER);
  textSize(15)
  
  weightSlider = createSlider(-2, 2, 0.5, 0.01);
  biasSlider = createSlider(0, 350, 0);
  
  weightSlider.position(10, 480);
  weightSlider.style('width', '380px');
  
  biasSlider.position(10, 520);
  biasSlider.style('width', '380px');
}

function draw() {
  background(220);
  
  // Draw the graph lines
  drawDashedLine(50, 70, 50, 450, 5);
  drawDashedLine(10, 410, 390, 410, 5);
  
  // Draw the weighted line
  let p1 = createVector(0, 410 - ((-50 * weightSlider.value()) + biasSlider.value()));
  let p2 = createVector(400, 410 - (400 * weightSlider.value() + biasSlider.value()));
  
  push();
    line(p1.x, p1.y, p2.x, p2.y);
  pop();
  
  // Draw the dataset
  drawDataserScatter()
  
  // Draw title container
  push();
    noStroke();
    fill(220);
    rect(0, 0, 400, 60);
  pop();
  
  // Draw the title
  push();
    textSize(20);
    text("Try to get the line to follow the points by", 200, 15);
    text("adjusting the weight and bias!", 200, 40);
  pop();
  
  
  // Draw lable container
  push();
    noStroke();
    fill(220);
    rect(0, 460, 400, 540);
  pop();
  
  // Draw the text lables
  text("Weight [-2 | 2]", 200, 475);
  text("Bias [0 | 100]", 200, 515);
  
  // Draw the equation text
  text("y = x * weight + bias", 200, 565);
  
  // Draw the text/graph seperating line
  push();
    stroke(100);
    strokeWeight(3);
    line(0, 460, 400, 460);
  pop();
  
  // Draw the title/graph seperating line
  push();
    stroke(100);
    strokeWeight(3);
    line(0, 60, 400, 60);
  pop();
  
  // Draw the text/equation seperating line
  push();
    stroke(100);
    strokeWeight(3);
    line(0, 545, 400, 545);
  pop();
}

function drawDashedLine(x1, y1, x2, y2, dash_size) {
  // Calculate distance
  let line_distance = dist(x1, y1, x2, y2);

  // Loop over each dash
  for(let i = 0; i < line_distance; i += dash_size * 2) {
    // Calculate the position of the dashes
    let p1 = p5.Vector.lerp(createVector(x1, y1), createVector(x2, y2), i / line_distance);
    
    let p2 = p5.Vector.lerp(createVector(x1, y1), createVector(x2, y2), (i + dash_size) / line_distance);
    
    line(p1.x, p1.y, p2.x, p2.y);
  }
}

function drawDataserScatter () {
  push();
    fill(100, 100, 200);
    noStroke();
    for(let i = 0; i < Xs.length; i ++) {
      ellipse(Xs[i] * 20 + 50, 410 - (ys[i] * 18 + 50), 4, 4);
    }
  pop();
}