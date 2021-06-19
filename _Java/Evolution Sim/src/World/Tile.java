package World;

public class Tile {
	public static enum TILE_TYPES {WATER, BEACH, GRASS};
	
	private int x_pos;
	private int y_pos;
	private TILE_TYPES tile_type;
	
	public Tile (TILE_TYPES type, int x, int y) {
		this.tile_type = type;
		this.x_pos = x;
		this.y_pos = y;
	}
}
