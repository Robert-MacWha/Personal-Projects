class Wave {
    constructor(maxLen) {
        this.points = [];
        this.maxLen = maxLen;
    }

    add_point(y) {
        this.points.unshift(y);

        if (this.points.length > this.maxLen) {
            this.points.pop();
        }
    }

    draw() {
        noFill();
        stroke(20);
        strokeWeight(0.5);

        beginShape();

        for(let i = 0; i < this.points.length; i ++) {
            
            vertex(i, this.points[i]);

        }

        endShape();
    }
}