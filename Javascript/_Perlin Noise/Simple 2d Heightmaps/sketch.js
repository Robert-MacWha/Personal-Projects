let frequency = 0.005;

let frequencySlider;

function setup() {
  createCanvas(600, 600);
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
  
  loadPixels();
  
  let i = 0;
  
  for(let x = 0; x < width; x ++) {
    for(let y = 0; y < height; y ++) {
      let height = generateHeight(x, y);
      
      pixels[i + 0] = height * 255;
      pixels[i + 1] = height * 255;
      pixels[i + 2] = height * 255;
      
      i += 4;
    }
  }
  
  
  
  updatePixels();
  
}

function generateHeight(x, y) {
  let height = noise(x * frequency, y * frequency)
  return height;
}