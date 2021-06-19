package racecar.states;

import java.awt.Graphics;
import java.awt.Graphics2D;
import java.io.File;

import racecar.KeyboardManager;
import racecar.MouseManager;
import racecar.Program;
import racecar.Vector;
import racecar.assets.Assets;
import racecar.gui.*;
import racecar.map.*;

public class LevelEditor {
	private UIManager uiManager;
	private Assets assetManager;
	private Map map;
	
	private File mapFile;
	private boolean hasMap;
	
	// Position the cars start at
	public static Vector startPos = new Vector(125, Program.programHeight - 200);
	
	public void init () {
		// Load the map
		mapFile = new File("assets/map.txt");
		hasMap = false;
		map = new Map();
		Environment.startPosition = startPos;
		
		// Create management objects
		uiManager    = new UIManager();
		assetManager = new Assets();
		
		// If the mapFile exists, load it
		if (mapFile.exists()) {
			map.loadMap("assets/map.txt");
		}
		
		// Load assets + gui
		loadAssets();
		loadGUI();
	}
	
	public void tick (MouseManager m, KeyboardManager k) {
		int[] mP = m.getMousePos();
		this.map.tick(m, k);
		
		// Check UI
		if (uiManager.isPosOverButton(1, mP[0], mP[1])) {
			// Clear button
			if (m.getLeftPressedOnTick())
				this.map.clearMap();
		} else if (uiManager.isPosOverButton(2, mP[0], mP[1])) {
			// Save button
			if (m.getLeftPressedOnTick())
				this.map.saveMap("assets/map.txt");
		} else if (uiManager.isPosOverButton(0, mP[0], mP[1])) {
			// Return button
			if (m.getLeftPressedOnTick())
				Program.bufferedState = Program.STATES.MENU;
		}
	}
	
	public void render (Graphics g) {
		// Create a graphics2D object
		Graphics2D g2 = (Graphics2D) g;
		
		this.map.render(g2, (int)startPos.x, (int)startPos.y);
		
		// Draw the start pos marker
		g2.drawImage(assetManager.getSprite(1, 0), (int)startPos.x-12, (int)startPos.y-12, 25, 25, null);
		
		// Load U on top of the map
		uiManager.renderUI(g);
	}
	
	private void loadAssets () {
		String[] paths = new String[] {
			"assets/UI.png",
			"assets/Start_Marker.png"
		};
		
		int[] spriteSizeXs = new int[] {
			32,
			16
		};
		
		int[] spriteSizeYs = new int[] {
			32,
			16
		};
		
		assetManager.loadAssets(paths, spriteSizeXs, spriteSizeYs);
	}
	
	private void loadGUI () {
		// Return to menu button
		uiManager.addButton(new Button(Program.programWidth - 60, 10, 40, 40, assetManager.getSprite(0, 8), assetManager.getSprite(0, 9)));
		
		// Clear map button
		uiManager.addButton(new Button(Program.programWidth - 120, 10, 40, 40, assetManager.getSprite(0, 4), assetManager.getSprite(0, 5)));
		
		// Save button
		uiManager.addButton(new Button(Program.programWidth - 180, 10, 40, 40, assetManager.getSprite(0, 6), assetManager.getSprite(0, 7)));
	}
}