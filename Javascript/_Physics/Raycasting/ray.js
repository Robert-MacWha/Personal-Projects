class Ray {
    constructor(position, angle) {
        this.pos = position;
        this.dir = p5.Vector.fromAngle(angle);
    }

    show() {
        //Create a line from the ray's pos in the direction of the ray's direction by x
        stroke(255, 100);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.dir.x*10, this.dir.y*10);
        pop();
    }

    lookAt(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }

    cast (wall) {
        //Get the start and end points of the wall
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        //Get the ray's start pos and the "end point"
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;
        //Calculate the demoninator(same for both equations)
        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) {
            //This means that the line and the ray are parallel
            return(null);
        }
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        //If 0<t<1 and 0<u then the lines have an intersection point
        if (t > 0 && t < 1 && u > 0) {
            const pt = createVector();
            pt.x = x1 + t * (x2 - x1);
            pt.y = y1 + t * (y2 - y1);
            return(pt);
        }
        else {
            return(null);
        }
    }
}