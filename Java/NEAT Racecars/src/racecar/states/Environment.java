package racecar.states;

import java.awt.BasicStroke;
import java.awt.Graphics;
import java.awt.Graphics2D;

import racecar.Vector;
import racecar.agent.Population;
import racecar.assets.Assets;
import racecar.gui.UIManager;
import racecar.map.Map;
import racecar.neat.InnovationGenerator;

public class Environment {
	private UIManager uiManager;
	private Assets assetManager;
	private Map map;
	private Population population;
	
	// Static variables
	public static float AgentSpeed           = 0.1f;
	public static float AgentRotationSpeed = 0.005f;  // Uses radians not degrees
	public static int AgentSightDistance   = 100;
	public static Vector startPosition;
	
	public static int PopulationSize       = 200;
	public static int GenerationLength     = 5000;
	public static float MutationChance     = 0.2f;
	
	private int generationTimer;
	
	public void init () {
		// Setup all parent objects
		uiManager    = new UIManager();
		assetManager = new Assets();
		map          = new Map();
		population   = new Population();
		
		startPosition = LevelEditor.startPos;
		
		// Load the map + population
		map.loadMap("assets/map.txt");
		population.loadPopulation(PopulationSize);
		generationTimer = GenerationLength;
	}
	
	public void tick () {
		// Update all agents
		population.tick(map);
		
		// Update scoreboard information
		
		// Start new gen if necessary
		generationTimer --;
		if (generationTimer <= 0) {
			System.out.println(InnovationGenerator.currentInnovation);
			generationTimer = GenerationLength;
			population.startNewGeneration(map);
		}
	}
	
	public void render (Graphics g) {
		// Create a graphics2D object
		Graphics2D g2 = (Graphics2D) g;
		
		g2.setStroke(new BasicStroke(1));
		
		population.render(g2);
		
		map.render(g2, (int)startPosition.x, (int)startPosition.y);
	}
}