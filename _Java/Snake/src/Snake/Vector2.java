package Snake;

public class Vector2 {
	
	public int x;
	public int y;
	
	public Vector2(int x, int y) {
		
		this.x = x;
		this.y = y;
		
	}
	
	public Vector2 add (Vector2 other) {
		
		return new Vector2(this.x + other.x, this.y + other.y);
		
	}
	
	public Vector2 add(int x, int y) {
		
		return new Vector2(this.x + x, this.y + y);
	
	}
	
	public Boolean equals(Vector2 other) {
		
		return this.x == other.x && this.y == other.y;
		
	}
	
	public Boolean equals (int x, int y) {
		
		return this.x == x && this.y == y;
		
	}
	
}
