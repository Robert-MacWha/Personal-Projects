class Block {
  constructor(x, w, v, m, minx) {
    //Set components to preset values
    this.x = x;
    this.y = height - w;
    this.w = w;
    this.v = v;
    this.m = m;
    this.minX = minx;
  }

  show() {
    const x = constrain(this.x, this.minX, width);
    rect(x, this.y, this.w, this.w);
  }

  update() {
    this.x += this.v;
  }

  collide(other) {
    return (this.x + this.w > other.x);
  }

  hitWall() {
    return (this.x <= 0);
  }

  reverse() {
    this.v *= -1;
  }

  bounce(other) {
    let newV = ((this.m - other.m) / (this.m + other.m)) * this.v;
    newV += ((2 * other.m / (this.m + other.m)) * other.v);
    return (newV);
  }
}