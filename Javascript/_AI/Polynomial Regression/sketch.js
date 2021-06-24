let x_vals = [];
let y_vals = [];

let power = 500;

let multipliers = [];

let pSlider;
let pP;

const learningRate = 0.5;
let optimizer = tf.train.adam(learningRate);

function setup() {
  createCanvas(400, 400);

  for(let i = 0; i < power; i ++) {
    multipliers[i] = tf.variable(tf.scalar(random(-1, 1)));
  }

  pSlider = createSlider(1, 10, 5);
  pP = createP();
}

function draw () {
  background(220);

  power = pSlider.value();
  pP.html('Current polynomial degree: ' + (power-1));

  tf.tidy (() => {
    if (x_vals.length > 0) {
      const ys = tf.tensor1d(y_vals);
      optimizer.minimize(  function() {
        return (loss(predict(x_vals), ys));
      });
    }
})

  stroke(0, 0, 0, 100);
  strokeWeight(2);
  fill(45, 74, 83, 200);
  for(let i = 0; i < x_vals.length; i ++) {
    let px = map(x_vals[i], -1, 1, 0, width)
    let py = map(y_vals[i], -1, 1, height, 0);

    ellipse(px, py, 8, 8);
  }

  const curveX = [];
  for (let i = -1; i < 1.001; i += 0.02) {
    curveX.push(i);
  }
  const ys = tf.tidy(() => predict(curveX));
  let curveY = ys.dataSync();
  ys.dispose();

  beginShape();
  noFill();
  stroke(50);
  strokeWeight(4);
  for (let i = 0; i < curveX.length; i ++) {
    let x = map(curveX[i], -1, 1, 0, width);
    let y = map(curveY[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let x = map(mouseX, 0, width, -1, 1);
    let y = map(mouseY, 0, height, 1, -1);

    x_vals.push(x);
    y_vals.push(y);
  }
}

function predict (x) {
  const xs = tf.tensor1d(x);
  let ys = xs.mul(0);
  //y = ax^3 + bx^2 + cx + d
  //ys = xs.pow(3).mul(multipliers[0]).
  //add(xs.pow(2).mul(multipliers[1])).
  //add(xs.pow(1).mul(multipliers[2]).
  //add(xs.pow(0).mul(multipliers[3])));  

  for (let i = 0; i < power; i ++) {
    ys = tf.add(xs.pow((power-1)-i).mul(multipliers[i]), ys);
  }
  
  return(ys);
}

function loss (pred, labels) {
  return (pred.sub(labels).square().mean());
}