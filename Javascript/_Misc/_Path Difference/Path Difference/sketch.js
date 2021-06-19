let truePath = [
  [10, 200],
  [200, 390],
  [200, 10],
  [390, 200],
  [150, 200]
];

let path = [];
let drawing = false;

let x = 500;
let y = 200;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  noFill();
  stroke(100, 200, 100, 200);
  strokeWeight(3);
  
  // Update the path the user's drawing
  if (drawing) {
    path.push([mouseX, mouseY]);
  }
  
  if (path.length > 1) {
    // See if the user's path is following the true path
    let isFollowingPath = IsFollowingPath();

    if (!isFollowingPath) {
      stroke(200, 100, 100)
    }
  }
  
  // Render the user's path
  drawPath(path);
  
  // Draw the true path
  stroke(0, 0, 0, 100);
  strokeWeight(5);
  drawPath(truePath);
}

// Reset the path
function mousePressed() {
  path = [];
  drawing = true;
}

function mouseReleased() {
  drawing = false;
}

function drawPath (p) {
  beginShape();
    for(let i = 0; i < p.length; i ++) {
      vertex(p[i][0], p[i][1]);
    }
  endShape();
}

function IsFollowingPath() {
  
  // See if the first point is within range x of the true path's first point
  if (distSquared(path[0], truePath[0]) > x) {
    return false;
  }
  
  let nextPoint = 1;
  
  for(let i = 0; i < path.length; i ++) {
    
    // See if the path got to the next point
    if (distSquared(path[i], truePath[nextPoint]) < x) {
      
      nextPoint += 1;
      
      if (nextPoint == truePath.length) {
        drawing = false;
        return true;
      }
      
    }
    
    // Otherwise, make sure the point is close enough to the true path
    if (distToSegmentSquared(path[i], truePath[nextPoint-1], truePath[nextPoint]) > y) {
      
      // And leave in an edge case for it being to far from the line when just arriving at the point
      if (distSquared(path[i], truePath[nextPoint-1]) > x) {
        return false;
      }
      
    }
    
  }
  
  return true;
  
}

function distSquared (x, y) {
  
  return (x[0] - y[0]) * (x[0] - y[0]) + (x[1] - y[1]) * (x[1] - y[1])
  
}

function distToSegmentSquared(p, v, w) {
  let l2 = distSquared(v, w);
  if (l2 == 0) {
    return distSquared(p, v);
  }
  
  let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  
  return distSquared(p, [
                        v[0] + t * (w[0] - v[0]), 
                        v[1] + t * (w[1] - v[1])
  ]);
}

function distToSegment(p, v, w) { 
  return Math.sqrt(distToSegmentSquared(p, v, w)); 
}