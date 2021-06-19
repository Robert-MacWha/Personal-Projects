let model;

let resolution = 5;
let cols;
let rows;
let inputs;
let xs;

const train_xs = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);

function setup() {
  createCanvas(400, 400);
  cols = width/resolution;
  rows = height/resolution;

  model = tf.sequential();
  //Add the hidden + output layers to the moddle
  model.add(tf.layers.dense({
    inputShape: [2],
    units: 4,
    activation: "sigmoid"
  }));

  model.add(tf.layers.dense({
    units: 1,
    activation: "sigmoid"
  }));

  model.compile({
    optimizer: tf.train.adam(0.1), //Learning Rate
    loss: "meanSquaredError"
  });

  //Create the inputs for the model
  inputs = [];
  //Loop over each pixel
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //Get the input
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2]);
    }
  }

  xs = tf.tensor2d(inputs);

  setTimeout(train, 20);
}

function train () {
  trainModel().then(result => {
    console.log(result.history.loss[0]);
    setTimeout(train, 10);
  });
}

function trainModel () {
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 1
  });
}

function draw() {
  background(0);
  //Train the network
  let ys;

  tf.tidy(() => {
    //Get the outputs
    ys = model.predict(xs).dataSync();
  });
  //Draw the results
  noStroke();
  let index = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let br = ys[index] * 255;
      fill(br);
      rect(i * resolution, j * resolution, resolution, resolution);
      fill(255-br);
      // textSize(8);
      // textAlign(CENTER, CENTER);
      // text(nf(ys[index], 1, 2), i * resolution + resolution/2, j * resolution + resolution/2)

      index ++;
    }
  }
}
