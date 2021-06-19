package racecar;

// Vector class used to store positions
public class Vector {
	public float x;
	public float y;
	
	public Vector (float x, float y) {
		this.x = x;
		this.y = y;
	}
	
	public float getDist (Vector o) {
		float dSquared = (x - o.x) * (x - o.x) + (y - o.y) * (y - o.y);
		return (float) Math.sqrt(dSquared);
	}
}
