package Assets;

import java.awt.image.BufferedImage;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.imageio.ImageIO;

// Spritesheet class can contain a single spritesheet
public class SpriteSheet {
	private ArrayList<BufferedImage> sheet;
	
	// Load the sheet from a path and cut it up
	public SpriteSheet (String path, int spriteSizeX, int spriteSizeY) {
		// Reset sheet arraylist
		sheet = new ArrayList<BufferedImage>();
		
		// Load raw image from path
		BufferedImage spriteSheet = loadImage(path);
		
		for (int x = 0; x < spriteSheet.getWidth(); x += spriteSizeX) {
			for(int y = 0; y < spriteSheet.getHeight(); y += spriteSizeY) {
				// Save it to the sprites arraylist
				sheet.add(trimImage(spriteSheet.getSubimage(x, y, spriteSizeX, spriteSizeY)));
			}
		}
	}
	
	// Get an image from the spritesheet
	public BufferedImage getSprite (int index) {
		return sheet.get(index);
	}
	
	private BufferedImage loadImage (String path) {
		try {
			return ImageIO.read(new File(path));
		} catch (IOException e) {
			e.printStackTrace();
			System.exit(1);
		}
		
		return null;
	}
	
	// This section of code is from https://stackoverflow.com/questions/3224561/crop-image-to-smallest-size-by-removing-transparent-pixels-in-java
		// Used to crop the image and remove all transparent pixels (min size)
	private static BufferedImage trimImage(BufferedImage image) {
	    WritableRaster raster = image.getAlphaRaster();
	    int width = raster.getWidth();
	    int height = raster.getHeight();
	    int left = 0;
	    int top = 0;
	    int right = width - 1;
	    int bottom = height - 1;
	    int minRight = width - 1;
	    int minBottom = height - 1;

	    top:
	    for (;top < bottom; top++){
	        for (int x = 0; x < width; x++){
	            if (raster.getSample(x, top, 0) != 0){
	                minRight = x;
	                minBottom = top;
	                break top;
	            }
	        }
	    }

	    left:
	    for (;left < minRight; left++){
	        for (int y = height - 1; y > top; y--){
	            if (raster.getSample(left, y, 0) != 0){
	                minBottom = y;
	                break left;
	            }
	        }
	    }

	    bottom:
	    for (;bottom > minBottom; bottom--){
	        for (int x = width - 1; x >= left; x--){
	            if (raster.getSample(x, bottom, 0) != 0){
	                minRight = x;
	                break bottom;
	            }
	        }
	    }

	    right:
	    for (;right > minRight; right--){
	        for (int y = bottom; y >= top; y--){
	            if (raster.getSample(right, y, 0) != 0){
	                break right;
	            }
	        }
	    }

	    return image.getSubimage(left, top, right - left + 1, bottom - top + 1);
	}
}