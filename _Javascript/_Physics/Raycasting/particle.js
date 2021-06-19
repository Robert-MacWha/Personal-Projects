class Particle {
    constructor () {
        this.pos = createVector(mouseX, mouseY);
        this.rays = [];
        for(let a = 0; a < 360; a += 1) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }

    update (mouseX, mouseY) {
        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }

    show () {
        fill(255);
        ellipse (this.pos.x, this.pos.y, 16, 16);
        for(let ray of this.rays) {
            ray.show();
        }
    }
    
    look (walls) {
        for(let ray of this.rays) {
            let closest = null;
            let record  = Infinity;
            for(let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = p5.Vector.dist(this.pos, pt);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
}