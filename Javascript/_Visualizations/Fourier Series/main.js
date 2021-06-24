const frame_rate = 100;
const time_per_loop = 5;

let time = 0;
let delta_time = 0;

const base_rad = 50;

const wave = new Wave(500);

function setup() {
    createCanvas(400, 300);
    frameRate(frame_rate);

    delta_time = (TWO_PI / frame_rate) / time_per_loop;
}
  
function draw() {
    background(220);
    translate(width/4, height/2);

    let x = 0;
    let y = 0;

    for (let i = 0; i < 10; i ++) {

        const n = i * 2 + 1;

        const rad = base_rad * (4 / (n * PI));
        const new_x = x + rad * cos(n * time);
        const new_y = y + rad * sin(n * time);

        fill(20);
        noStroke();
        ellipse(new_x, new_y, rad / 10);

        stroke(20, 100);
        strokeWeight(2);
        line(x, y, new_x, new_y);

        x = new_x;
        y = new_y;

    }

    line(x, y, 2 * base_rad, y);

    translate(2 * base_rad, 0);

    wave.add_point(y);
    wave.draw();

    time -= delta_time;
}