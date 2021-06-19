package racecar.gui;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

// Progress_Bar class contains a empty image, full image, position, and size
public class Progress_Bar {
	private int x, y;
	private int sizeX, sizeY;
	private BufferedImage empty;
	private BufferedImage full;
	
	private boolean enabled;
	
	// Current level variable must be out of 100
	private int progress;
	
	public Progress_Bar (int x, int y, int sizeX, int sizeY, BufferedImage empty, BufferedImage full) {
		this.x     = x;
		this.y     = y;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.empty = empty;
		this.full  = full;
		
		this.progress = 0;
		this.enabled = true;
	}
	
	// Update the progress level
	public void updatePrograss (int p) {
		progress = p;
	}
	
	// Enable / disable the object
	public void enable () {
		enabled = false;
	}
	
	public void disable () {
		enabled = true;
	}
	
	// I think this should work, if not sorry
	public void render (Graphics g) {
		// Only draw if the object is enabled
		if (!this.enabled)
				return;
		
		// Calculate how much of each image needs to be displayed
		int offset = (int)(100 - progress);
		
		// Grab the correct about from each image
		BufferedImage a = full.getSubimage(0, 0, offset, full.getHeight());
		BufferedImage b = empty.getSubimage(offset, 0, empty.getWidth(), empty.getHeight());
		
		// Display them so that it looks like just one
		g.drawImage(a, x, y, sizeX, sizeY, null);
		g.drawImage(b, x+(a.getWidth() / full.getWidth() * offset), y, sizeX, sizeY, null);
	}
}
