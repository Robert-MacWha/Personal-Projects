let vehicles = [];
let food = [];
let poison = [];

let mr = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //Create the base food objects
  for(let i = 0; i < 60; i ++) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x, y));
  }
  //Create the base poison objects
  for(let i = 0; i < 40; i ++) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x, y));
  }
  //Create the vehicles
  for(let i = 0; i < 20; i ++) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x, y));
  }

}

function draw() {
  background(51);

  //Add more food
  if (random(1) < 0.1 && food.length < 250) {
    let x = random(width);
    let y = random(height);
    food.push(createVector(x, y));
  }
  //Add more poison
  if (random(1) < 0.04 && poison.length < 120) {
    let x = random(width);
    let y = random(height);
    poison.push(createVector(x, y));
  }

  //Draw the food
  for(let i = 0; i < food.length; i ++) {
    fill(0, 200, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }
  //Draw the poison
  for(let i = 0; i < poison.length; i ++) {
    fill(200, 20, 20);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }

  for(let i = vehicles.length-1; i >= 0; i --) {
    // Call the appropriate steering behaviors for our agents
    vehicles[i].behaviors(food, poison);
    //v.seek(target);
    vehicles[i].update();
    vehicles[i].boundaries();
    vehicles[i].display();

    let child = vehicles[i].clone();
    if (child != null) {
      vehicles.push(child); 
    }

    if (vehicles[i].dead()) {
      food.push(createVector(vehicles[i].pos.x, vehicles[i].pos.y));
      vehicles.splice(i, 1);
    }
  }
  //Add in extra critters as needed
  while (vehicles.length < 5) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x, y));
  }
}