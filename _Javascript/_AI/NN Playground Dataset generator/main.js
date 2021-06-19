points = [];
lables = [];

function setup() {
    createCanvas(500, 500);

    points = [];
    lables = [];
}
  
function draw() {
    background(200);

    noStroke();

    for(let i = 0; i < points.length; i ++) {
        let x = points[i].x * width;
        let y = points[i].y * height;

        if (lables[i] == 0) {
            fill(168, 54, 50);
        } else {
            fill(50, 111, 168);
        }

        ellipse(x, y, 10, 10);
    }
}

function printDataset() {
    xs = "Xs = [\n";
    for(let i = 0; i < points.length; i ++) {
        xs += "[" + points[i].x + ", " + points[i].y + "],\n";
    }

    xs += "]";

    console.log(xs);

    ys = "ys = [\n";

    for(let i = 0; i < lables.length; i ++) {
        ys += lables[i] + ",\n";
    }

    ys += "]";

    console.log(ys);
}

function keyPressed () {
    if (key == "r") {
        points.push(createVector(mouseX / width, mouseY / height));
        lables.push(0);
    } else if (key == "b") {
        points.push(createVector(mouseX / width, mouseY / height));
        lables.push(1);
    }
}