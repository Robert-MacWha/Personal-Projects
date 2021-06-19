const friction = 0.8;

let string;

function setup() {
    createCanvas(800, 800);

    string = new String(createVector(width / 2, height / 2), 10, 50);
}
  
function draw() {
    background(21);

    string.update(createVector(mouseX, mouseY));
    string.draw();
}