let textureSize = 200;
let divisions = 4;
let amplitude = 1;
let layers = 2;

let divisionsMultiple = 1.5;
let amplitudeMultiple = 0.8;

let texture;

function setup() {
  createCanvas(textureSize, textureSize);
  background(220);
  
  texture = generateTexture();
  
  for(let i = 0; i < layers; i ++) {
    
    points = whirl(divisions);
    texture = addPointsToTexture(texture, points, amplitude);
    
    divisions *= divisionsMultiple;
    amplitude *= amplitudeMultiple;
    
  }
  
  texture = normalizeTexture(texture);
  drawTexture(texture);

  console.log('done');
}

function draw() {

}

function whirl(divisions) {

  let points = [];
  let boxSize = textureSize / divisions;

  // create a point at a random position within each sector in the texture
  for (let i = 0; i < divisions; i++) {

    let x = i * boxSize;
    points[i] = [];

    for (let j = 0; j < divisions; j++) {
      let y = j * boxSize;

      let offsetX = random() * boxSize;
      let offsetY = random() * boxSize;

      points[i][j] = createVector(x + offsetX, y + offsetY);
    }

  }

  return points;

}

function generateTexture() {

  let texture = [];

  for (let i = 0; i < width; i++) {
    texture[i] = [];

    for (let j = 0; j < height; j++) {

      texture[i][j] = 0;

    }

  }

  return texture;

}

function addPointsToTexture(texture, points, amplitude) {

  // loop over each pixel in the texture and set the value to the distance to the clostet point
  let tempTexture = [];

  let maxDist = 0;
  let minDist = Infinity;

  for (let i = 0; i < width; i++) {

    let pointX = floor(i / (width / points.length));
    tempTexture[i] = [];

    for (let j = 0; j < height; j++) {

      let pointY = floor(j / (height / points[pointX].length));

      // find the closest point - it will be in one of the adjacent sectors
      let closestDistSquared = Infinity;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {

          // make sure that you're only looking at valid points
          try {

            let pX = points[pointX + x][pointY + y].x;
            let pY = points[pointX + x][pointY + y].y;
            let dSquared = (i - pX) * (i - pX) + (j - pY) * (j - pY);

            if (dSquared < closestDistSquared) {
              closestDistSquared = dSquared;
            }

          } catch (err) {

          }

        }

      }

      let closestDist = sqrt(closestDistSquared);
      tempTexture[i][j] = closestDist;

      // update the max and min distances
      if (maxDist < closestDist) {
        maxDist = closestDist;
      }

      if (minDist > closestDist) {
        minDist = closestDist;
      }

    }
  }

  // normalize the pixel values and add them to the texture
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {

      let normalizedValue = (tempTexture[i][j] - minDist) / (maxDist - minDist);
      let scaledValue = normalizedValue * amplitude;
      texture[i][j] += scaledValue;

    }
  }

  return texture;

}

function normalizeTexture(texture) {

  let maxVal = 0;
  let minVal = Infinity;
  
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let v = texture[i][j];
      maxVal = max(maxVal, v);
      minVal = min(minVal, v);
    }
  }
  
  // normalize the pixel values
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      texture[i][j] = (texture[i][j] - minVal) / (maxVal - minVal); 
    } 
  }
  
  return texture;
  
}

function drawTexture(texture) {

  push();

  loadPixels();

  let i = 0;
  for (let x = 0; x < texture.length; x++) {
    for (let y = 0; y < texture[x].length; y++) {
      let c = texture[x][y] * 255;

      let index = 4 * (y * texture[x].length + x);

      pixels[index + 0] = c;
      pixels[index + 1] = c;
      pixels[index + 2] = c;


      i += 4;

    }
  }

  updatePixels();

  pop();

}

function drawPoints(points) {

  push();
  stroke(0);
  strokeWeight(5);

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points[i].length; j++) {

      point(points[i][j]);

    }
  }

  pop();

}