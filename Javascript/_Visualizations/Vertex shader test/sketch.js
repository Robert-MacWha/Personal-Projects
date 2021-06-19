const agentCount = 50;
const agentSize = 0.01;
let agents;
let agentImage;

let myShader;

function preload() {
  
  myShader = loadShader('shader.vert', 'shader.frag');
  
}

function setup() {
  createCanvas(200, 200, WEBGL);
  noStroke();
  
  // create all the agents
  agents = [];
  for(let i = 0; i < agentCount; i ++) {
    
    let pos = createVector(random(width), random(height));
    let vel = p5.Vector.random2D();
        
    agents[i] = new Agent(pos, vel);
  }
  
  agentImage = createImage(agentCount, 1);
}

function draw() {
  
  // update the agents
  for(let a of agents) {
    a.update();
  }
  
  // load the agent data to the image
  agentImage.loadPixels();
  for(let x = 0; x < agentImage.width; x ++) {
    agentImage.pixels[(x*4) + 0] = 
      (agents[x].pos.x / width) * 256;
    agentImage.pixels[(x*4) + 1] = 
      (agents[x].pos.y / height) * 256;
    
    // agentImage.pixels[(x*4) + 2] = 256;
    agentImage.pixels[(x*4) + 3] = 256;
  }
  agentImage.updatePixels();
  
  shader(myShader);

  myShader.setUniform('u_agent_size' , agentSize);
  myShader.setUniform('u_agent_tex'  , agentImage);

  rect(0,0,width,height);
  
}