package racecar.assets;

import java.awt.image.BufferedImage;
import java.util.ArrayList;

// Assets class can load images or spritesheets and store them in an arrayList
public class Assets {
	private ArrayList<SpriteSheet> spriteSheets;
	
	public Assets () {
		spriteSheets = new ArrayList<SpriteSheet>();
	}
	
	// Load assets from the specified path
	public void loadAssets (String[] paths, int[] spriteSizeX, int[] spriteSizeY) {
		// Loop over all sheets and import them all
		for (int i = 0; i < paths.length; i ++) {
			spriteSheets.add(new SpriteSheet(paths[i], spriteSizeX[i], spriteSizeY[i]));
		}
	}
	
	// Get a sprite from it's spritesheet and it's index in that sheet
	public BufferedImage getSprite (int sheetIndex, int spriteIndex) {
		return spriteSheets.get(sheetIndex).getSprite(spriteIndex);
	}
}
