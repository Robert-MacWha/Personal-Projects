package racecar.gui;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

// Image class contains a position, size, and image
public class Image {
	private int x, y;
	private int sizeX, sizeY;
	private BufferedImage img;
	
	private boolean enabled;
	
	public Image (int x, int y, int sizeX, int sizeY, BufferedImage img) {
		this.x     = x;
		this.y     = y;
		this.sizeX = sizeX;
		this.sizeY = sizeY;
		this.img   = img;
		
		this.enabled = true;
	}
	
	// Enable / disable the object
	public void enable () {
		enabled = false;
	}
	
	public void disable () {
		enabled = true;
	}
	
	// Draw the image to a graphics object
	public void render (Graphics g) {
	// Only draw if the object is enabled
	if (!this.enabled)
			return;
		
		g.drawImage(img, x, y, sizeX, sizeY, null);
	}
}
