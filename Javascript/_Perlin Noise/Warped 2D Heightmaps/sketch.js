let frequency = 0.005;
let threshold = 0.2;
let island = false;
let warped = false;
let warpFrequency = 0.1;
let warpAmplitude = 0.5;

let frequencySlider;
let thresholdSlider;
let islandButton;
let warpButton;
let wFrequencySlider;
let wAmplitudeSlider;

let oceanColor  = [17,173,193];
let sandColor   = [247,182,158];
let grassColor  = [91,179,97];
let forestColor = [30,136,117];
let rockColor   = [96,108,129];
let snowColor   = [255, 255, 255];

function setup() {
  createCanvas(600, 600);
  background(255);
  
  frequencySlider = createSlider(0, 0.1, 0.01, 0.0001);
  let frequencyLabel = createP('- Frequency');
  frequencyLabel.position(140, height - 15);
  
  thresholdSlider = createSlider(0, 1, 0.2, 0.01);
  thresholdSlider.position(0, height + 30);
  let thresholdLabel = createP('- Threshold');
  thresholdLabel.position(140, height + 15);
  
  islandButton = createButton('Toggle Island Mode');
  islandButton.position(0, height + 60);
  islandButton.mousePressed(() => {
    
    island = ! island;
    generateNoiseTexture();
    
  });
  
  warpButton = createButton('Toggle Warping');
  warpButton.position(0, height + 90);
  warpButton.mousePressed(() => {
    
    warped = ! warped;
    generateNoiseTexture();
    
  });
  
  wFrequencySlider = createSlider(0, 0.1, 0.05, 0.001);
  wFrequencySlider.position(0, height + 120);
  let wFrequencyLable = createP('- Warped Frequency');
  wFrequencyLable.position(140, height + 103);
  
  wAmplitudeSlider = createSlider(0, 50, 20, 0.01);
  wAmplitudeSlider.position(0, height + 150);
  let wAmplitudeLable = createP('- Warped Amplitude');
  wAmplitudeLable.position(140, height + 133);
}

function draw() {
  
  if (frequencySlider.value() != frequency) {
    
    frequency = frequencySlider.value();
    generateNoiseTexture();
    
  }
  
  if (thresholdSlider.value() != threshold) {
    
    threshold = thresholdSlider.value();
    generateNoiseTexture();
    
  }
  
  if (wFrequencySlider.value() != warpFrequency) {
    
    warpFrequency = wFrequencySlider.value();
    generateNoiseTexture();
    
  }
  
  if (wAmplitudeSlider.value() != warpAmplitude) {
    
    warpAmplitude = wAmplitudeSlider.value();
    generateNoiseTexture();
    
  }
    
}

function generateNoiseTexture() {
  
  let min = 1;
  let max = 0;
  let noiseArray = [];
  
  // generate the array of heights, saving the min and the max
  for(let x = 0; x < width; x ++) {
    noiseArray.push([]);
    for(let y = 0; y < height; y ++) {
      let height = generateHeight(x, y);
      
      noiseArray[x].push(height);
      
      if (height < min) {
        min = height;
      } else if (height > max) {
        max = height;
      }
      
    }
  }
  
  // normalize the array of heights 
  for(let x = 0; x < width; x ++) {
    for(let y = 0; y < height; y ++) {
      
      noiseArray[x][y] = map(noiseArray[x][y], min, max, 0, 1);
      
    }
  }
  
  // render the array of heights
  loadPixels();
  
  let i = 0;
  
  for(let x = 0; x < width; x ++) {
    for(let y = 0; y < height; y ++) {
      let height = noiseArray[x][y];
      
      if (height < 0.1) {
        colorPixel(oceanColor, i);
      } else if (height < 0.25) {
        colorPixel(sandColor, i);
      } else if (height < 0.6) {
        colorPixel(grassColor, i);
      } else if (height < 0.8) {
        colorPixel(forestColor, i);
      } else if (height < 0.95) {
        colorPixel(rockColor, i);
      } else {
        colorPixel(snowColor, i);
      }
      
      i += 4;
    }
  }
  
  updatePixels();
  
}

function generateHeight(x, y) {
  
  let h = noise(x * frequency, y * frequency);
  
  // warp the noise
  if (warped) {
    
    let pX = x + (noise((x + 20) * warpFrequency, (y)      * warpFrequency) - 0.5) * warpAmplitude;
    let pY = y + (noise((x)      * warpFrequency, (y + 20) * warpFrequency) - 0.5) * warpAmplitude;
    
    
    h = noise(pX * frequency, pY * frequency);
  }
  
  // if generating an island discount the height
  if (island) {
    
    let d = p5.Vector.dist(createVector(x, y), createVector(width / 2, height / 2));
    d /= width / 2;
    d = 1 - d;
    
    h *= d;
    
  }
  
  // subtract the threshold
  h = max(0, h - threshold);
  h /= (1 - threshold);
  
  return h;
}

function colorPixel(c, i) {
  pixels[i + 0] = c[0];
  pixels[i + 1] = c[1];
  pixels[i + 2] = c[2];
}