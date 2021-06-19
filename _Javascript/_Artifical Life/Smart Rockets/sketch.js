let population;
let graph;
let graph2;
let graph3;
let graph4;
let lifeSpan = 300;
let simSpeed;
let mChance;
let maxForce = 0.2;

let count = 0;
let generation = 1;
let averageD = 0;
let bestD = 0;
let averageT = 0;
let bestT = 0;
let showG = true;
let hyperSpeed = false;
let noMutations = false;
let paused = false;
let target;

let rx = 100; 
let ry = 150;
let rw = 200;
let rh = 10;

let lifeP;
let lifeSpanP;
let averageDistP;
let bestDistP;
let averageTimeP;
let bestTimeP;
let generationP;
let mutationP;
let sSlider;
let mSlider;

function setup() {
  createCanvas(800, 400);
  population = new Population(200);
  graph = new Graph(createVector(210,105,30));
  graph.add(400);
  graph2 = new Graph(createVector(255,215,0))
  graph2.add(400);
  graph3 = new Graph(createVector(0, 0, 205));
  graph3.add(400);
  graph4 = new Graph(createVector(0, 206, 209))
  graph4.add(400);
  sSlider = createSlider(1, 50, 5);
  mSlider = createSlider(1, 500, 10);

  generationP = createP();
  lifeP = createP();
  lifeSpanP = createP();
  averageDistP = createP();
  bestDistP = createP();
  averageTimeP = createP();
  bestTimeP = createP();
  mutationP = createP();
  target = createVector(200, 50);
}

function draw() {
  background(21);
  //Slider controlling the simulation speed
  //simSpeed = sSlider.value();
  //mChance = mSlider.value()/100;
  //Update the rockets
  if (hyperSpeed) {
    simSpeed = 400;
  }
  else {
    simSpeed = sSlider.value();
  }
  if (noMutations) {
    mChance = 0.001;
  }
  else {
    mChance = mSlider.value()/100;
  }
  for(let i = 0; i < simSpeed; i ++) {
    population.run();
  }
  population.show();
  //Show the count var (as a pharagraph) and update it
  generationP.html("Current Generation: " + generation);
  lifeP.html("Timer: " + count);
  lifeSpanP.html("Current Lifespan: " + lifeSpan);
  averageDistP.html("Average Distance From Target(in last gen): " + averageD);
  bestDistP.html("Best Distance From Target(in last gen): " + bestD);
  averageTimeP.html("Average Time It Took To Hit The Target(in last gen): " + averageT);
  bestTimeP.html("Best Time It Took To Hit The Target(in last gen): " + bestT);
  mutationP.html("Mutation Chance: " + mChance);

  if (count >= lifeSpan) {
    //population = new Population(100);
    //Evaluate and re-create the population
    population.evaluate();
    population.selection(mChance);
    count = 0;
    generation ++;
    averageD = constrain(averageD, 0, 400)
    //Add to the graph
    graph.add(averageD);
    graph2.add(bestD);
    graph3.add(averageT);
    graph4.add(bestT);
  }
  //Draw the target
  fill(255);
  ellipse(target.x, target.y, 16, 16);
  //Draw the obstacle
  fill(255);
  rect(rx, ry, rw, rh);
  fill(0);
  rect(390, 0, 10, height);
  //Draw the graph
  if (showG) {
    graph.draw();
    graph2.draw();
    graph3.draw();
    graph4.draw();
  }
  //Draw the guide lines (at intervals of 5)
  push();
  strokeWeight(1);
  stroke(255, 255, 255, 50);
  line(400, 30, 800, 30);
  line(400, 60, 800, 60);
  stroke(255, 255, 255, 200);
  line(400, 90, 800, 90);
  stroke(255, 255, 255, 50);
  line(400, 120, 800, 120);
  line(400, 150, 800, 150);
  stroke(255, 255, 255, 200);
  line(400, 180, 800, 180);
  stroke(255, 255, 255, 50);
  line(400, 210, 800, 210);
  line(400, 240, 800, 240);
  stroke(255, 255, 255, 200);
  line(400, 270, 800, 270);
  stroke(255, 255, 255, 50);
  line(400, 300, 800, 300);
  line(400, 330, 800, 330);
  stroke(255, 255, 255, 120);
  line(400, 360, 800, 360);
  stroke(255, 255, 255, 50);
  line(400, 390, 800, 390);
  pop();
}

function keyPressed () {
  if (key == "g") {
    showG = !showG;
  }
  if (key == "h") {
    hyperSpeed = !hyperSpeed;
    showG = false;
  }
  if (key == "p") {
    paused = !paused;
  }
  if (key == "m") {
    noMutations = !noMutations;
  }
  if (paused) {
    frameRate(0);
  }
  else {
    frameRate(30);
  }
}