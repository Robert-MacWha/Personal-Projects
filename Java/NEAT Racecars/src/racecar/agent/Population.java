package racecar.agent;

import java.awt.BasicStroke;
import java.awt.Graphics2D;
import java.util.ArrayList;

import racecar.map.Map;
import racecar.neat.Evaluator;
import racecar.neat.Genome;
import racecar.states.Environment;

public class Population {
	private ArrayList<Racecar> population;
	private ArrayList<Racecar> deadCars;
	
	public void loadPopulation (int pop) {
		population = new ArrayList<Racecar>();
		
		// Load in x random agents, each of them with a random genome
		Genome g;
		for(int i = 0; i < pop; i ++) {
			g = new Genome();
			g.initialiseRandomGenome(8, 1, 2, 3);
			population.add(new Racecar(
				Environment.AgentSpeed, 
				Environment.AgentRotationSpeed, 
				Environment.AgentSightDistance,
				g, 
				(float) ((Math.random() * 4) - 2),
				Environment.startPosition, 
				(float) Math.toRadians(270)));
		}
	}
	
	public void tick (Map map) {
		// Update each agent
		for (Racecar a : this.population) {
			a.tick(map);
		}
	}
	
	public void render (Graphics2D g) {
		g.setStroke(new BasicStroke(4));
		for (Racecar a : this.population) {
			a.render(g);
		}
	}
	
	public void startNewGeneration (Map map) {
		// Get all genomes with their coresponding scores
		ArrayList<Genome> brains = new ArrayList<Genome>();
		ArrayList<Float> scores = new ArrayList<Float>();
		
		for (Racecar a : this.population) {
			a.calculateScore(map);
			a.brain.setBias(a.bias);
			brains.add(a.brain);
			scores.add(a.score);
		}
		
		// Get the new population
		brains = Evaluator.evaluate(brains, scores, Environment.MutationChance);
		
		// Pop the brains into new agents
		population = new ArrayList<Racecar>();
		
		for(int i = 0; i < Environment.PopulationSize; i ++) {
			population.add(new Racecar(
				Environment.AgentSpeed, 
				Environment.AgentRotationSpeed, 
				Environment.AgentSightDistance,
				brains.get(i), 
				brains.get(i).getBias(),
				Environment.startPosition, 
				(float) Math.toRadians(270)));
		}
	}
}
