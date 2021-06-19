let heights = [];

let res = 500;
let scale = 10;
let ocean = 0.1;
let size = 1;

function setup() {
  createCanvas(res, res);

  generate();
  render();
}

function draw() {

}

function generate() {
  heights = [];
  for (let x = 0; x < res; x++) {
    heights[x] = [];
    for (let y = 0; y < res; y++) {
      heights[x][y] = getHeight(x, y);
    }
  }
}

function render() {
  for (let x = 0; x < res; x++) {
    for (let y = 0; y < res; y++) {
      let c = color(heights[x][y], heights[x][y], heights[x][y]);
      set(x, y, c);
    }
  }
  updatePixels();
}

function getHeight(x, y) {
  let d = distance_squared(x, y);

  x *= scale;
  y *= scale;

  let n = noise(x / res, y / res);
  
  if (n > ocean + d / size) {
    return n * 255;
  } else {
    return 0; 
  }

  //return d * 255;
}

function distance_squared(x, y) {
    dx = 2 * x / res - 1
    dy = 2 * y / res - 1
    return dx*dx + dy*dy
}