const frame_rate = 60;
let time = 0;

const origin_dist = 0.6;
const origin_offset = 25;

const path = new Path(200);

let fourierX;
let fourierY;

function setup() {
    createCanvas(300, 300);
    frameRate(frame_rate);

    let xs = [];
    let ys = [];

    for(let i = 0; i < 200; i ++) {
        
        let angle = map(i, 0, 200, 0, TWO_PI);
        xs[i] = 50 * tan(angle / 10);
        ys[i] = 50 * sin(angle);

    }
    
    fourierX = dft(xs);
    fourierY = dft(ys);
}

function draw() {
    background(0);

    let vx;
    let vy;

    push();

        translate(width * origin_dist, origin_offset);

        vx = fourier(fourierX, 0);

    pop();

    push();

        translate(origin_offset, height * origin_dist);

        vy = fourier(fourierY, HALF_PI);

    pop();

    push();

        translate(width * origin_dist, height * origin_dist);
        path.add_point(vx.x, vy.y);
        path.draw();

    pop();

    const dt = TWO_PI / fourierY.length;
    time -= dt;
}

function fourier(f, offset) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < f.length; i ++) {

        const freq = f[i].freq;
        const rad = f[i].amp;
        const phase = f[i].phase;

        const new_x = x + rad * cos(freq * time + phase + offset);
        const new_y = y + rad * sin(freq * time + phase + offset);

        fill(255);
        noStroke();
        ellipse(new_x, new_y, rad / 10);

        stroke(255, 100);
        strokeWeight(1);
        line(x, y, new_x, new_y);

        x = new_x;
        y = new_y;

    }

    return createVector(x, y);
}