package racecar.states;

import racecar.MouseManager;
import racecar.Program;
import racecar.assets.Assets;
import racecar.gui.*;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.io.File;

public class Menu {
	private UIManager uiManager;
	private Assets assetManager;
	
	private File mapFile;
	
	public void init () {
		// Create management objects
		uiManager    = new UIManager();
		assetManager = new Assets();
		
		// Load the map file
		mapFile = new File("assets/map.txt");
		
		loadAssets();
		generateUI();
	}
	
	public void tick (MouseManager mouseManager) {
		// Check all buttons to see which the mouse is over
		int[] mousePos = mouseManager.getMousePos();
		
		int selectedButton = -1;
		
		if (uiManager.isPosOverButton(0, mousePos[0], mousePos[1]))
			selectedButton = 0;
		
		if (uiManager.isPosOverButton(1, mousePos[0], mousePos[1]))
			selectedButton = 1;
		
		// If necessary respond to inputs
		if (selectedButton == 0 && mouseManager.getLeftPressed())
			Program.bufferedState = Program.STATES.LEVELEDITOR;
		
		if (selectedButton == 1 && mouseManager.getLeftPressed())
			if (mapFile.exists())
				Program.bufferedState = Program.STATES.ENVIRONMENT;
	}
	
	public void render (Graphics g) {
		// Create a graphics2D object
		Graphics2D g2 = (Graphics2D) g;
		
		// Enable / disable no map file warning text
		if (mapFile.exists()) {
			uiManager.enableText(3);
			uiManager.enableText(4);
		} else {
			uiManager.disableText(3);
			uiManager.disableText(4);
		}
		
		uiManager.renderUI(g2);
	}

	private void loadAssets () {
		String[] paths = new String[] {
			"assets/Logo.png",
			"assets/UI.png"
		};
		
		int[] spriteSizeXs = new int[] {
			1000,
			32
		};
		
		int[] spriteSizeYs = new int[] {
			1000,
			32
		};
		
		assetManager.loadAssets(paths, spriteSizeXs, spriteSizeYs);
	}
	
	private void generateUI () {
		// All fonts used in the program
		Font h1 = new Font("Gadugi", Font.BOLD, 40);
		Font h3 = new Font("Gadugi", Font.BOLD, 20);
		Font p = new Font("Gadugi", Font.PLAIN, 12);
		
		// Title
		uiManager.addText(new Text("Racecar Evolution", Program.programWidth/2 - 170, 90, h1, Color.darkGray));
		
		// Logo
		uiManager.addImage(new Image(10, 10, 80, 80, assetManager.getSprite(0, 0)));
		
		// Editor button
		uiManager.addButton(new Button(Program.programWidth/2 - 200, Program.programHeight/2 - 100, 150, 50, assetManager.getSprite(1, 0), assetManager.getSprite(1, 1)));
		uiManager.addText(new Text("Track Editor", Program.programWidth/2 - 183, Program.programHeight/2 - 70, h3, Color.darkGray));
		
		// Simulation Button
		uiManager.addButton(new Button(Program.programWidth/2 + 50, Program.programHeight/2 - 100, 150, 50, assetManager.getSprite(1, 0), assetManager.getSprite(1, 1)));
		uiManager.addText(new Text("Simulation", Program.programWidth/2 + 75, Program.programHeight/2 - 70, h3, Color.darkGray));
	
			// Warning for non-existing files (under simulation button)
		uiManager.addText(new Text("No map file found, please create a", Program.programWidth/2 + 40, Program.programHeight/2 - 30, p, Color.red));
		uiManager.addText(new Text("map in the editor program", Program.programWidth/2 + 65, Program.programHeight/2 - 15, p, Color.red));
	
		// Instructions for editor
		uiManager.addText(new Text("Instructions for level editor:", 50, Program.programHeight/2 + 50, h3, Color.BLACK));
		uiManager.addText(new Text("To add a wall press W", 70, Program.programHeight/2 + 70, p, Color.BLACK));
		uiManager.addText(new Text("To add a checkpoint press C", 70, Program.programHeight/2 + 85, p, Color.BLACK));
		uiManager.addText(new Text("Checkpoints will automaticly link up", 70, Program.programHeight/2 + 100, p, Color.BLACK));
		uiManager.addText(new Text("Save/Delete the track with the buttons", 70, Program.programHeight/2 + 115, p, Color.BLACK));
		uiManager.addText(new Text("in the top left of the screen", 80, Program.programHeight/2 + 130, p, Color.BLACK));
		uiManager.addText(new Text("Cars will spawn at the S marker", 70, Program.programHeight/2 + 145, p, Color.BLACK));
	}
}