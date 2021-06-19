let block1; let block2;

let count = 0;
let digits = 5;
let timeSteps = 1000000; 

let countDiv;

function setup () {
  createCanvas(400, 150);
  frameRate(30);
  //Create the first block with a velocity of 0
  block1 = new Block(100, 20, 0, 1, 0);
  //Create the second block with the correct velocity
  const m = pow(100, digits-1);
  block2 = new Block(150, 100, -2/timeSteps, m, 20);
  //Create a div that will show the # of collisions
  countDiv = createDiv(count);
  countDiv.style("font-size", "72px");
}

function draw () {
  background(21);
  let hasCollided = false;
  //Do this multiple times per frame
  for(let i = 0; i < timeSteps; i ++) {
    //See if the blocks collide
    if (block1.collide(block2)) {
      const v1 = block1.bounce(block2);
      const v2 = block2.bounce(block1);
      block1.v = v1;
      block2.v = v2;
      count ++;
    }
    if (block1.hitWall()) {
      block1.reverse();
      count++;
    }
    block1.update();
    block2.update();
  }
  block1.show();
  block2.show();
  
  //Update the countDiv
  countDiv.html(nf(count, digits));
}