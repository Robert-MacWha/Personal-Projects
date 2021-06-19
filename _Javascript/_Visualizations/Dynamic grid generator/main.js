let  qt;

function setup() {
    createCanvas(800, 800);
    background(21);

    qt = new Quadtree(new Rectangle(400, 400, 400, 400), 4);

}
  
function draw() {
    background(21);
    qt.show();

    if (mouseIsPressed) {

        qt.insert(new Particle(createVector(mouseX, mouseY)));

    }
}