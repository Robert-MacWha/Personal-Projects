package racecar.map;

import java.awt.Graphics;

import racecar.Vector;

public class Line {
	public Vector pos1;
	public Vector pos2;
	
	// If 0, neither are hovered.  if 1, the first one is and if 2 the second one is
	public int isHovered;
	
	public Line (Vector pos1, Vector pos2) {
		this.pos1 = pos1;
		this.pos2 = pos2;
		
		isHovered = 0;
	}
	
	public void render (Graphics g) {
		g.drawLine((int)pos1.x, (int)pos1.y, (int)pos2.x, (int)pos2.y);
		
		// If the mouse is close enough to one of the points, highlight it
		if (isHovered == 1)
			g.fillOval((int)pos1.x-5, (int)pos1.y-5, 10, 10);
		
		if (isHovered == 2)
			g.fillOval((int)pos2.x-5, (int)pos2.y-5, 10, 10);
		
		isHovered = 0;
	}
	
	// Return the collision point between this line and another
	public Vector collides (float x3, float y3, float x4, float y4) {
		Vector out = null;
		
		float x1 = this.pos1.x;
		float y1 = this.pos1.y;
		float x2 = this.pos2.x;
		float y2 = this.pos2.y;
		
		//Check to see if the ray collides with the wall
        float den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            //Div by 0 protection
        if (den == 0) {
            return null;
        }
            //More of the equation
        float t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        float u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
        if (t > 0 && t < 1 && u > 0) {
            //Get the point that the lines intersect at and return it
            out = new Vector(
            	x1 + t * (x2 - x1),
            	y1 + t * (y2 - y1)
            	);
            return out;
        } else {
            return null;
        }
	}
	
	// Return a copy of this object
	public Line clone () {
		return new Line(pos1, pos2);
	}
}
