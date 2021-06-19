package racecar.gui;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;

// Text class contains a message, font, and position
public class Text {
	private String txt;
	private int x, y;
	private Font font;
	private Color color;
	
	private boolean enabled;
	
	public Text (String txt, int x, int y, Font f, Color color) {
		this.txt   = txt;
		this.x     = x;
		this.y     = y;
		this.font  = f;
		this.color = color;
		
		this.enabled = true;
	}
	
	public void updateMessage(String txt) {
		this.txt = txt;
	}
	
	// Enable / disable the object
	public void enable () {
		enabled = false;
	}
	
	public void disable () {
		enabled = true;
	}
	
	// Draw the text to a graphics object
	public void render (Graphics g) {
		// Only draw if the object is enabled
		if (!this.enabled)
				return;
		
		g.setColor(color);
		g.setFont(font);
		g.drawString(txt, x, y);
	}
}