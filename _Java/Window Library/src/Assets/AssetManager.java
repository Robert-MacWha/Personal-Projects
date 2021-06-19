package Assets;

import java.awt.image.BufferedImage;
import java.util.ArrayList;

// Assets class can load images or spritesheets and store them in an arrayList
public class AssetManager {
	private ArrayList<SpriteSheet> spriteSheets;
	
	// Load all sprite sheets from path
	public AssetManager () {
		
		spriteSheets = new ArrayList<SpriteSheet>();

	}
	
	// Load a spritesheet from file
	public void LoadSpritesheet(String path, int spriteSizeX, int spriteSizeY) {
		
		spriteSheets.add(new SpriteSheet(path, spriteSizeX, spriteSizeY));
		
	}
	
	// Get a sprite from it's spritesheet and it's index in that sheet
	public BufferedImage GetSprite (int sheetIndex, int spriteIndex) {
		
		return spriteSheets.get(sheetIndex).getSprite(spriteIndex);
		
	}
}