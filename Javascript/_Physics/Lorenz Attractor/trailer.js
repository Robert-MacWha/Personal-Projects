class Trailer {
  constructor (offset) {
    this.offset = offset;
    
    this.color = 0;
  }
  
  show () {
     beginShape();
      for(let i = points.length-tailLength; 
          i < points.length; i ++) {
        if (i-this.offset < 0) { continue; }
        
        let p = points[
          constrain(i-this.offset, 0, points.length+1)
        ];
        
        stroke(this.color % 255, 100, 100);
        this.color += 0.05;
        vertex(p.x*scale, 
               p.y*scale, 
               p.z*scale); 
      }
    endShape();
  }
}