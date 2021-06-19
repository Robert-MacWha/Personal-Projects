class Graph {
    constructor (color) {
        this.data = [];
        if (color) {
            this.color = color;
        }
        else {
            this.color = createVector(0, 0, 0);
        }
    }

    add (value) {
        this.data.push(value);
    }

    draw () {
        //Draw each element and then connect them with lines
        for(let i = 0; i < this.data.length; i ++) {
            let vA = this.data[i];
            let ia = constrain(i+1, 0, this.data.length);
            let vB = this.data[ia]
            //Draw the ellipses
            push();
            fill(this.color.x, this.color.y, this.color.z);
            stroke(this.color.x, this.color.y, this.color.z);
            strokeWeight(3);
            if (this.data.length < 30) {
                ellipse(((i/this.data.length)*400)+400, vA*1, 5, 5);
            }
            //Draw the conecting lines
            line(((i/this.data.length)*400)+400, vA*1, ((ia/this.data.length)*400)+400, vB*1);
            pop();
        }
    }
}