let frequency = 0.005;

let frequencySlider;

function setup() {
  createCanvas(400, 400);
  background(255);
  
  frequencySlider = createSlider(0, 0.1, 0.005, 0.0001);
  
  generateNoiseTexture();
}

function draw() {
  
  if (frequencySlider.value() != frequency) {
    
    frequency = frequencySlider.value();
    background(255);
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
      
      pixels[i + 0] = height * 255;
      pixels[i + 1] = height * 255;
      pixels[i + 2] = height * 255;
      
      i += 4;
    }
  }
  
  updatePixels();
  
}

function generateHeight(x, y) {
  let height = noise(x * frequency, y * frequency);
  
  height = abs((height - 0.5) * 2);
  
  height = 1 - height;
  
  return height;
}