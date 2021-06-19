let stepSize = 1;
let tickFrequency = 25;

let inputScale = 1 / 20;
let xScale = 600;
let yScale = 600;

let originX = 400;
let originY = 400;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);

  // graphFunction(aproximation, [200, 50, 50], 6);
  // graphFunction(curious, [50, 200, 50], 4);
  
  graphComplexFunction([50, 50, 175], 4);
  
  drawBgGraph();
  
  xScale *= 0.99;
  yScale *= 0.99;
}

function graphFunction(estimator, color, weight) {
  
  push();
    noFill();
    stroke(color[0], color[1], color[2]);
    strokeWeight(weight);
    beginShape();

    for(let i = 0; i < width; i += stepSize) {

      let x = i - originX;
      x /= tickFrequency;
      //x = round(x);
      let estimation = estimator(x) * tickFrequency;
      let y = originY - estimation;

      vertex(i, y);

    }

    endShape();
  pop();
  
}

function graphComplexFunction(color, weight) {
  
  push();
    noFill();
    stroke(color[0], color[1], color[2]);
    strokeWeight(weight);
    translate(originX, originY);
    beginShape();
  
    for(let i = -stepSize; i <= width + stepSize; i += stepSize) {
      
      let n = i - originX;
      n *= inputScale;
      let c = math.eval(
        n + ' * cos(' + n  +' + i * ' + n + ')'
      );
      
      // print(c);
      
      // 'sin(' + n + '+i *' + n + ' ) + cos(i * ' + n + ')'
      // '(1 / sqrt(5)) * ((((1 + sqrt(5)) / 2) ^ ' + n + ') - (((1 - sqrt(5)) / 2) ^ ' + n + '))'
      
      if (c && c.re && c.im) {
        let re = c.re * xScale;
        let im = c.im * yScale;
        vertex(re, im);
        
        //if (abs(im) < 1) {
          //print(c);
        //}
      }
      
    }

    endShape();
  pop();
  
}

function aproximation(n) {
  let t1 = 1 / sqrt(5);
  let t2 = pow((1 + sqrt(5)) / 2, n);
  let r = t1 * t2;
  
  return r;
}

function curious(n) {
  let t1 = 1 / sqrt(5);
  let t2 = pow((1 + sqrt(5)) / 2, n);
  let t3 = pow(abs(1 - sqrt(5)) / 2, n);
  
  let r = t1 * (t2 - t3);
  
  return r;
}

function drawBgGraph() {
  line(0, originY, width, originY);
  line(originX, 0, originX, height);
  
  // draw the tick marks
  let x = 0;
  while(x < width) {
    
    x += tickFrequency;
    
    push();
      
      stroke(80);
      translate(x, originY - 5);
      line(0, 0, 0, 10);
    
    pop();
    
  }
  
  // draw the tick marks
  let y = 0;
  while(y < height) {
    
    y += tickFrequency;
    
    push();
      
      stroke(80);
      translate(originX - 5, y);
      line(0, 0, 10, 0);
    
    pop();
    
  }
}