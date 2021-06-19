let path = [
  [10, 10],
  [15, 50],
  [13, 95],
  [9, 132],
  [11, 168],
  [21, 185],
  [62, 210],
  [90, 205],
  [145, 198],
  [186, 200],
  [220, 204],
  [225, 215],
  [235, 230],
  [241, 260]
];

let vectors = [];

let x;
let arrowSize = 5;

function setup() {
  createCanvas(400, 400);
  frameRate(0.5);
  background(220);
  x = PI/4;

  noFill();
  stroke(0, 0, 0, 50);
  strokeWeight(5);

  drawPath();

  // Convert all the points to vectors
  for (let i = 0; i < path.length - 1; i++) {

    vectors.push([
      path[i+1][0] - path[i][0],
      path[i+1][1] - path[i][1]
    ]);

  }
}

function draw() {
  background(220);
  
  noFill();
  stroke(0, 0, 0, 100);
  strokeWeight(2);

  drawVectors();
  
  // Average the positions of nearby vectors with similar directions
  newVectors = [];
  print("--------------");
  
  for(let i = 0; i < vectors.length; i ++) {
    
    if (i+1 >= vectors.length) {
      newVectors.push([
        vectors[i][0],
        vectors[i][1] 
      ]);
      continue;
    }
    
    // Calculate the angles of both vectors
    let v1 = createVector(vectors[i][0], vectors[i][1]);
    let v2 = createVector(vectors[i+1][0], vectors[i+1][1]);
    let a1 = v1.heading();
    let a2 = v2.heading();
    
    if (abs(a1 - a2) < x) {
      // The vectors are considered similar, take the average and add it to the newVectors []
      newVectors.push([
        vectors[i][0] + vectors[i+1][0],
        vectors[i][1] + vectors[i+1][1]
      ])
      
      i += 1;
      print("Combined two angles");
      
    } else {
      // The vectors are not similar, just add the vector i to the list
      newVectors.push([
        vectors[i][0],
        vectors[i][1] 
      ]);
      
      print(a1 + ", " + a2);
    }
  }
  
  vectors = newVectors;
}

function drawPath() {
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i][0], path[i][1]);
  }
  endShape();
}

function drawVectors() {
  
  translate(path[0][0], path[0][1]);

  push();
  for (let i = 0; i < vectors.length; i++) {
    
    push();
      
      let dir = createVector(vectors[i][0], vectors[i][1])
      let angle = dir.heading();
      rotate(angle + HALF_PI);
      triangle(-arrowSize*0.5, arrowSize, arrowSize*0.5, arrowSize, 0, -arrowSize/2);
    
    pop();
    
    line(0, 0, vectors[i][0], vectors[i][1]);
    
    translate(vectors[i][0], vectors[i][1]);
  }
  pop();
}