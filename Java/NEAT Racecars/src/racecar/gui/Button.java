package racecar.gui;

import java.awt.Graphics;
import java.awt.image.BufferedImage;

// Button class contains image, hoverImage, position, and size
public class Button {
	private int x, y;
	private int sizeX, sizeY;
	private BufferedImage normal;
	private BufferedImage hovered;
	private boolean isHovered;
	
	private boolean enabled;
	
	public Button (int x, int y, int sizeX, int sizeY, BufferedImage normal, BufferedImage hovered) {
		this.x         = x;
		this.y         = y;
		this.sizeX     = sizeX;
		this.sizeY     = sizeY;
		this.normal    = normal;
		this.hovered   = hovered;
		
		this.isHovered = false;
		this.enabled   = true;
	}
	
	// See if a point is over the button
	public Boolean isPointOver (int x, int y) {
		// Return false if the button is not enabled
		if (!enabled)
			return false;
		
		Boolean overX = (x > this.x && x < this.sizeX + this.x);
		Boolean overY = (y > this.y && y < this.sizeY + this.y);
		
		isHovered = (overX && overY);
		return (overX && overY);
	}
	
	// Enable / disable the object
	public void enable () {
		enabled = false;
	}
	
	public void disable () {
		enabled = true;
	}
	
	// Draw button to graphics object
	public void render (Graphics g) {
		// Only draw if the object is enabled
		if (!this.enabled)
				return;
		
		if (isHovered) {
			g.drawImage(hovered, x, y, sizeX, sizeY, null);
		} else {
			g.drawImage(normal, x, y, sizeX, sizeY, null);
		}
		
		isHovered = false;
	}
}
