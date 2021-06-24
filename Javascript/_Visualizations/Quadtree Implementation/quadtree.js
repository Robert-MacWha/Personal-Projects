class Rectangle {

    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(point) {

        return (point.x > this.x - this.w && 
                point.x < this.x + this.w &&
                point.y > this.y - this.h && 
                point.y < this.y + this.h);

    }

}

class Quadtree {

    constructor(boundary, n) {

        this.boundary = boundary;
        this.capacity = n;

        this.particles = [];

        this.divided = false;

    }

    insert(particle) {

        // make sure that the point is within the boundary
        if (this.boundary.contains(particle.pos)) {

            if (this.particles.length < this.capacity) {

                // add the point to the quadtree
                this.particles.push(particle);

            } else {

                if (!this.divided) {

                    // subdivide the quadtree
                    this.subdivide();

                }

                this.ne.insert(particle);
                this.nw.insert(particle);
                this.se.insert(particle);
                this.sw.insert(particle);

            }
            
        }

        return false;

    }

    subdivide () {

        let ne = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        let nw = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y - this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        let se = new Rectangle(this.boundary.x + this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);
        let sw = new Rectangle(this.boundary.x - this.boundary.w / 2, this.boundary.y + this.boundary.h / 2, this.boundary.w / 2, this.boundary.h / 2);

        this.ne = new Quadtree(ne, this.capacity);
        this.nw = new Quadtree(nw, this.capacity);
        this.se = new Quadtree(se, this.capacity);
        this.sw = new Quadtree(sw, this.capacity);

        this.divided = true;


    }

    show() {

        stroke(255);
        strokeWeight(2);
        noFill();
        rectMode(CENTER);

        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);

        if(this.divided) {

            this.ne.show();
            this.nw.show();
            this.se.show();
            this.sw.show();

        }

        strokeWeight(5);
        for(let p of this.particles) {

            point(p.pos.x, p.pos.y);

        }

    }

}