class Path {
    constructor(maxLen) {
        this.points = [];
        this.maxLen = maxLen;
    }

    add_point(x, y) {
        this.points.unshift(createVector(x, y));

        if (this.points.length > this.maxLen) {
            this.points.pop();
        }
    }

    draw() {
        noFill();
        stroke(255);

        for(let i = 0; i < this.points.length - 1; i ++) {
            
            let w = map(i, 0, this.points.length, 1, 0);
            strokeWeight(w);

            let p1 = this.points[i];
            let p2 = this.points[i + 1];

            line(p1.x, p1.y, p2.x, p2.y);

        }

    }
}