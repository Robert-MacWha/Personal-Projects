const surface_threshold = 0.5;
const noise_frequency = 0.1;
const square_size = 8;

let z = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
  noiseSeed(42);
}

function draw() {
  background(255);
  
  let density_map = generate_Density_Map();
  // render_Density_Map(density_map);
  render_Surface(density_map);
  
  z += 0.02;
  
  // noLoop();
}

// generates a 2d array as the density map
function generate_Density_Map() {
  
  let density_map = [];
  
  for(let x = 0; x < (width / square_size) + 1; x ++) {
    
    density_map.push([]);
    
    for(let y = 0; y < (height / square_size) + 1; y ++) {
      
      let n_x = x * noise_frequency;
      let n_y = y * noise_frequency;
      
      let n = noise(n_x, n_y, z);
      
      density_map[x].push(n);
      
    }
  }
  
  return density_map;
  
}

// renders the density map as flat shaded squares on the canvas
function render_Density_Map(density_map) {
  
  for(let x = 0; x < width / square_size; x ++) {
    for(let y = 0; y < height / square_size; y ++) {
      
      push();
      
      fill(density_map[x][y] * 255);
      noStroke();
      
      let p_x = x * square_size;
      let p_y = y * square_size;
      
      rect(p_x, p_y, square_size, square_size);
      
      pop();
      
    } 
  }
}

// renders the surface of a density map
function render_Surface(density_map) {
  
  push();
  
  stroke(200, 200, 255);
  strokeWeight(2);
  noFill();
  
  for(let x = 0; x < width / square_size; x ++) {
    for(let y = 0; y < height / square_size; y ++) {
    
      // grab the 4 corners of the square and determin whether they're in our out of the surface
      let tl = density_map[x  ][y  ] >= surface_threshold;
      let tr = density_map[x+1][y  ] >= surface_threshold;
      let bl = density_map[x  ][y+1] >= surface_threshold;
      let br = density_map[x+1][y+1] >= surface_threshold;
      
      // convert the 4 bools into a single binary string
      let binary_rep = tl ? '0' : '1';
      binary_rep    += tr ? '0' : '1';
      binary_rep    += br ? '0' : '1';
      binary_rep    += bl ? '0' : '1';
      
      // conver the binary representation into an index
      let index = parseInt(binary_rep, 2);
      
      // look up the rules for this index in the squares.js file
      let connections = index_to_square[index];
      
      // draw the given connections
      push();
      
      if (connections) {
        let prev_absX = -1;
        let prev_absY = -1;
        for(let i = 0; i < connections.length; i += 4) {
          
          let p1_x = connections[i];
          let p1_y = connections[i+1];
          let p2_x = connections[i+2];
          let p2_y = connections[i+3];
          
          let d1 = density_map[p1_x][p1_y];
          let d2 = density_map[p2_x][p2_y];
          
          p1_x *= square_size;
          p1_y *= square_size;
          p2_x *= square_size;
          p2_y *= square_size;
          
          p1_x += x * square_size;
          p1_y += y * square_size;
          p2_x += x * square_size;
          p2_y += y * square_size;
          
          // let t = (surface_threshold - d1) / (d2 - d1);
          
          // let absX = p1_x + t * (p2_x - p1_x);
          // let absY = p1_y + t * (p2_y - p1_y);
          
          let absX = lerp(p1_x, p2_x, 0.5);
          let absY = lerp(p1_y, p2_y, 0.5);
          
          if (prev_absX != -1) {
  
            line(absX, absY, prev_absX, prev_absY);
            prev_absX = -1;
            
          } else {
            prev_absX = absX;
            prev_absY = absY;
          }

        }
      }
      
      pop();
      
    }
    
  }
  
  pop();
  
}