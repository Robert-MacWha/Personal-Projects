package World;

import java.awt.Color;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.HashMap;

import World.Tile.TILE_TYPES;

public class World {
	public BufferedImage spritemap;
	public int scale;
	
	private ArrayList<Tile> tiles;
	private int x_size;
	private int y_size;
	
	public World (BufferedImage sprite, int scale) {
		this.spritemap = sprite;
		this.scale = scale;
		
		tiles = new ArrayList<Tile>();
	}
	
	public void GenerateWorldTiles (HashMap<Color, TILE_TYPES> tile_hashmap) {
		this.x_size = this.spritemap.getWidth();
		this.y_size = this.spritemap.getHeight();
		
		// Loop over each pixel in the spritemap
		for(int x = 0; x < this.x_size; x ++) {
			for(int y = 0; y < this.y_size; y ++) {
				// Get the pixels colors
				Color pixel_color = new Color(this.spritemap.getRGB(x, y));
				
				// Load a tile and set its type depending on the pixel's color
				Tile t = new Tile(tile_hashmap.get(pixel_color), x, y);
				
				this.tiles.add(t);
			}
		}
	}
}
