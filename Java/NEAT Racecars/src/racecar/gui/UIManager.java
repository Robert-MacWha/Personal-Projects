package racecar.gui;

import java.awt.Graphics;
import java.util.ArrayList;

public class UIManager {
	private ArrayList<Text> strings;
	private ArrayList<Button> buttons;
	private ArrayList<Image> images;
	
	public UIManager () {
		strings = new ArrayList<Text>();
		buttons = new ArrayList<Button>();
		images = new ArrayList<Image>();
	}
	
	public void renderUI (Graphics g) {
		// Loop over each UI element and render it
		for (int i = 0; i < images.size(); i ++) {
			images.get(i).render(g);
		}
		
		for (int i = 0; i < buttons.size(); i ++) {
			buttons.get(i).render(g);
		}
		
		for (int i = 0; i < strings.size(); i ++) {
			strings.get(i).render(g);
		}
	}
	
	public void addText (Text t) {
		strings.add(t);
	}
	
	public void updateText (int index, String txt) {
		strings.get(index).updateMessage(txt);
	}
	
	public void enableText (int index) {
		strings.get(index).enable();
	}
	
	public void disableText (int index) {
		strings.get(index).disable();
	}
	
	public void addButton (Button b) {
		buttons.add(b);
	}
	
	public void enableButton (int index) {
		buttons.get(index).enable();
	}
	
	public void disableButton (int index) {
		buttons.get(index).disable();
	}

	public boolean isPosOverButton (int index, int x, int y) {
		return buttons.get(index).isPointOver(x, y);
	}
	
	public void addImage (Image i) {
		images.add(i);
	}
	
	public void enableImage (int index) {
		images.get(index).enable();
	}
	
	public void disableImage (int index) {
		images.get(index).disable();
	}
}
