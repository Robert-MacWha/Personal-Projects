let pi = 4;
let iterations = 0;
let speed = 1;
let history = [];
let div; 
let PIY;

function setup() {
  frameRate(20);
  createCanvas(400, 200);
  //Create the div containing the displayed value
  div = createDiv("").style("font-size", "2em");
  //Calculate the Y value 0f Pi
  PIY = map(PI, 2.8, 3.5, height, 0);
}

function draw() {
  background(220);
  for(let i = 0; i < speed; i ++) {
    //Calculate the denominator
    let den = iterations * 2 + 3;
    //If on a negative number subtract otherwise add fraction
    if (iterations % 2 == 0) {
      pi -= 4/den; 
    } else {
      pi += 4/den;
    }
    iterations ++;
  }
  //Draw PI
  strokeWeight(2);
  stroke(200);
  line(0, PIY, width, PIY);
  //Draw the history
  stroke(0); strokeWeight(2); noFill();
  beginShape();
    let spacing = width/history.length;
    for(let i = 0; i < history.length; i ++) {
      let x = i * spacing;
      let y = map(history[i], 2.8, 3.5, height, 0);
      vertex(x, y);
    }
  endShape();
  history.push(pi);
  //Update the div
  div.html(pi);
}