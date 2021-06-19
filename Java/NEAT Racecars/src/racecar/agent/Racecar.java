package racecar.agent;

import java.awt.Color;
import java.awt.Graphics2D;
import java.util.ArrayList;

import racecar.Vector;
import racecar.map.Line;
import racecar.map.Map;
import racecar.neat.Genome;

// This class will contain all information on the racecar plus all of it's functions
public class Racecar {
	private float baseSpeed      = 0;
	private float rotationSpeed  = 0;
	private int sightDist        = 0;
	
	private Vector startPos;
	private float startRotation;
	
	public Genome brain          = null;
	public float bias            = 0;
	
	private Vector position      = new Vector(0, 0);
	private Vector velocity      = new Vector(0, 0);  // Used to implement drifting
	private float rotation       = 4.7f;
	
	public float score            = 0;
	private int currentCheckpoint = -1;
	private boolean isColliding   = false;
	
	private ArrayList<Float> inputs;
	private ArrayList<Float> outputs;
	
	public Racecar (float baseSpeed, float rotationSpeed, int sightDist, Genome brain, float bias, Vector pos, float rotation) {
		this.baseSpeed     = baseSpeed;
		this.rotationSpeed = rotationSpeed;
		this.sightDist     = sightDist;
		
		this.brain         = brain;
		this.bias          = bias;
		
		this.position = new Vector(pos.x, pos.y);
		startPos = new Vector(pos.x, pos.y);
		this.rotation = rotation;
		startRotation = rotation;
	}
	
	public void tick (Map map) {
		if (isColliding) // Do nothing if it's colliding
			return;
		
		// Get inputs
		inputs = new ArrayList<Float>();
		float[] senses = getInputs(map);
		for(float f : senses) {
			inputs.add(f);
		}
		
		// Pass inputs though the genome
		outputs = this.brain.feedForwards(inputs);
		
		// React to outputs
		this.rotation += outputs.get(0) * this.rotationSpeed;
		//this.rotation += this.rotationSpeed;
		this.velocity.x += Math.cos(this.rotation) * outputs.get(1) * this.baseSpeed;
		this.velocity.y += Math.sin(this.rotation) * outputs.get(1) * this.baseSpeed;
	
		this.move();
		
		// Check for collisions
		this.checkCollisions(map);
		
		// Update score
		checkCheckpointCollision(map);
	}
	
	// ATM just draw a line
	public void render (Graphics2D g) {		
		if(this.isColliding) {
			g.setColor(Color.red);
		} else {
			g.setColor(Color.black);
		}
		
		g.drawLine(
			(int)(this.position.x+(Math.cos(this.rotation)*4)), 
			(int)(this.position.y+(Math.sin(this.rotation)*4)), 
			(int)(this.position.x-(Math.cos(this.rotation)*4)), 
			(int)(this.position.y-(Math.sin(this.rotation)*4)));
		
	}

	public void calculateScore (Map map) {
		if (this.isColliding) {
			this.score = (float) Math.pow(1.25, this.currentCheckpoint+10);
		} else {
			this.score = (float) Math.pow(2, this.currentCheckpoint+10);
			this.currentCheckpoint --;
			if (this.currentCheckpoint > -1)
				this.score += (getDistToCheckpoint(map) / 10);
		}
	}
	
	private void move () {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		
		this.velocity.x *= 0.8f;
		this.velocity.y *= 0.8f;
	}
	
	private float[] getInputs (Map map) {
		float[] output = new float[8];
		
		// Loop over each angle
		for(float i = 0; i < 360; i += 45) {
			float angle = (float) (Math.toRadians(i)) + this.rotation;
			// Create two points for line calculations
			float x1 = this.position.x;
			float y1 = this.position.y;
			
			float dirX = (float) Math.cos(angle);
			float dirY = (float) Math.sin(angle);
			
			//System.out.println(dirX + ", " + dirY);
			
			float x2 = (this.position.x) + (dirX * this.sightDist);
			float y2 = (this.position.y) + (dirY * this.sightDist);
			
			// Output is normalized and inverted so it gives a better input to NEAT
			output[(int)(i/45)] = 1 - (map.getIntersection(x1, y1, x2, y2, this.sightDist) / this.sightDist);
		}
		
		return output;
	}
	
	private void checkCollisions(Map map) {
		float intersection = map.getIntersection(
				(int)(this.position.x+(Math.cos(this.rotation)*4)), 
				(int)(this.position.y+(Math.sin(this.rotation)*4)), 
				(int)(this.position.x-(Math.cos(this.rotation)*4)), 
				(int)(this.position.y-(Math.sin(this.rotation)*4)),
				8);
		
		// The car is colliding
		if (intersection < 8) {
			this.isColliding = true;
		} else {
			this.isColliding = false;
		}
	}

	private void checkCheckpointCollision (Map map) {	
		// If the car is close enough, count it as touched
		float dist = getDistToCheckpoint(map);
		if (dist < 8) {
			currentCheckpoint++;
		}
	}
	
	private float getDistToCheckpoint (Map map) {
		// Get the checkpoint
		Line c = map.getCheckpoint(currentCheckpoint+1);
		
		// See if the car is colliding with the next checkpoint
		float num = Math.abs(
			((c.pos2.y - c.pos1.y)*this.position.x) - 
			((c.pos2.x - c.pos1.x)*this.position.y) +
			(c.pos2.x*c.pos1.y) -
			(c.pos2.y*c.pos1.x));
		
		float den = (float) Math.sqrt(
			Math.pow(c.pos2.y - c.pos1.y, 2) + 
			Math.pow(c.pos2.x - c.pos1.x, 2));
		
		return (num / den);
	}
}
