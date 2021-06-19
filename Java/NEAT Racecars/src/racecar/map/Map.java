package racecar.map;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics2D;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;

import racecar.KeyboardManager;
import racecar.MouseManager;
import racecar.Vector;
import racecar.states.Environment;

// Program representation of a map
public class Map {
	private ArrayList<Line> walls;
	private ArrayList<Line> checkpoints;
	
	Vector mousePos;
	
		// Whether the user is currently moving a line's point or not
	private boolean isMovingLine;
	private Line selectedLine;
	private int selectedVector;
	
		// Whether the user is currently creating a new line
	private boolean isPlacingLine;
	private Vector newPos1;
	private boolean isWall;  // Whether the new line is a wall or a checkpoint
	
	public Map () {
		walls = new ArrayList<Line>();
		checkpoints = new ArrayList<Line>();
		
		mousePos = null;
		
		isMovingLine   = false;
		selectedLine   = null;
		selectedVector = 0;
		
		isPlacingLine = false;
		newPos1       = null;
		isWall        = false;
	}
	
	public Line getCheckpoint (int index) {
		return checkpoints.get(index % (checkpoints.size()-1));
	}

	public void tick (MouseManager m, KeyboardManager k) {
		mousePos = new Vector(m.getMousePos()[0], m.getMousePos()[1]);
		
		// If the user is pressing the correct button, create a new line
			// W (for wall), C (for checkpoint)
		if ((k.getKeyState(87) || k.getKeyState(67)) && isPlacingLine == false) {   
			isPlacingLine = true;
			newPos1 = mousePos;
			isWall = true;
			
			if (k.getKeyState(67))
				isWall = false;
			
			return;
		}
		
		// Logic for selecting the second pos in a wall
		if (isPlacingLine) {
			if (m.getLeftPressedOnTick()) {
				Line l = new Line(newPos1, mousePos);
				
				if (isWall)
					walls.add(l);
				else
					checkpoints.add(l);
				
				isPlacingLine = false;
				return;
			}
		}
		
		// Logic for deleting walls
		if (isMovingLine) {
			
			// If the user pressed 'D' while moving a vector, delete said wall
			if (k.getKeyState(68)) {
				if (this.walls.contains(selectedLine)) {
					this.walls.remove(selectedLine);
				}
				if (this.checkpoints.contains(selectedLine)) {
					this.checkpoints.remove(selectedLine);
				}
				return;
			}
		}   
		
		
		// If the user is moving a line, update it's position
		if (isMovingLine) {
			if (selectedVector == 1)
				selectedLine.pos1 = mousePos;
			
			if (selectedVector == 2)
				selectedLine.pos2 = mousePos;
			
			// If the user clicks, place the line
			if (m.getLeftPressedOnTick()) {
				isMovingLine = false;
				return;
			}
		}
		
		// If the user is not currently moving \ placing a line, see if they want to
		if (!isMovingLine && !isPlacingLine) {
			// See if the user is hovering over any of the lines, if so draw a larger circle
			 if (checkArrayList(this.walls, m))
				 return;
			 
			 if (checkArrayList(this.checkpoints, m))
				 return;
		}
	}
	
	public void render (Graphics2D g, int startX, int startY) {
		// Draw all walls as grey
		g.setStroke(new BasicStroke(5));
		g.setColor(Color.DARK_GRAY);
		
		for (Line l : this.walls) {
			l.render(g);
		}
		
		// Draw all checkpoints as green
		g.setStroke(new BasicStroke(2));
		g.setColor(Color.green);
		
		for (Line c : this.checkpoints) {
			c.render(g);
		}
		
		// If the user is currently placing a line, render it
		if (isPlacingLine) {
			// Draw with proper styles
			g.setStroke(new BasicStroke(5));
			g.setColor(Color.DARK_GRAY);
			
			if (!isWall) {
				g.setStroke(new BasicStroke(2));
				g.setColor(Color.green);
			}
			
			g.drawLine((int)newPos1.x, (int)newPos1.y, (int)mousePos.x, (int)mousePos.y);
		}
		
		// Only show the line order if there are lines
		if (this.checkpoints.size() < 1)
			return;
		
		// Render a line representing the order of the checkpoints, starting at the S
			// Get an array of deep-copied lines
		ArrayList<Line> container = new ArrayList<Line>();
		ArrayList<Vector> points  = new ArrayList<Vector>();
			points.add(new Vector(startX, startY));         // Add the startx/y to the points
		for (Line c : this.checkpoints) {
			container.add(c.clone());
		}
		
		// Sort the checkpoints
		int minDist = 100000;
		Line l = container.get(0);
		Vector closestPos = new Vector(0, 0);
		Vector prevPos = new Vector(startX, startY);
		while(container.size() != 0) {       // While there are lines not sorted
			for(Line c : container) {        // Loop over each line
				                             // Calculate distance between two lines
				Vector linePos = new Vector(
						(c.pos1.x + c.pos2.x) / 2, 
						(c.pos1.y + c.pos2.y) / 2);
				
				int dist = (int) linePos.getDist(prevPos);
				
				// If it's the lowest so far, save the dist + the line
				if (dist < minDist) {
					minDist = dist;
					l = c;
					closestPos = linePos;
				}
			}
			
			// Remove the closest line from the container, add it to the orderdC, and reset the minDist
			points.add(closestPos);
			prevPos = closestPos;
			container.remove(l);
			minDist = 10000;
		}
		
		points.add(new Vector(startX, startY));
		
		// Now draw all the lines
		g.setColor(Color.lightGray);
		g.setStroke(new BasicStroke(1));
		for(int i = 1; i < points.size(); i ++) {
			g.drawLine(
				(int)points.get(i-1).x, 
				(int)points.get(i-1).y, 
				(int)points.get(i).x, 
				(int)points.get(i).y);
		}
	}
	
	// Reset the map and clear all walls/checkpoints
	public void clearMap () {
		this.walls = new ArrayList<Line>();
		this.checkpoints = new ArrayList<Line>();
	}
	
	// Load a map from a string
	public void loadMap (String scr) {
		// Clear both line arrays
		walls = new ArrayList<Line>();
		checkpoints = new ArrayList<Line>();
		
		// Load the map into a string (Try/catch is to stop java from whining, not important)
		String content = "";
		try {
			content = Files.readString(Paths.get(scr));
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		String[] lines = content.split("\\r?\\n");
		
		// Loop over every line
		int loadingState = 0;
		for (String s : lines) {
			// Check to see if loading walls or checkpoints
			if (s.equals("Walls")) {
				loadingState = 1;
				continue;
			}
			if (s.equals("Checkpoints")) {
				loadingState = 2;
				continue;
			}
			
			// Load the string, process it, and place it into the correct array
			Line l = null;
			if (loadingState == 1 || loadingState == 2)
				l = generateLine(s);
			
			if (loadingState == 1)
				walls.add(l);
			else if (loadingState == 2)
				checkpoints.add(l);
		}
	}
		
	// Save all lines to the map.txt file
	public void saveMap (String scr) {
		// Don't save if map doesn't have any checkpoints / walls
		if (this.checkpoints.size() == 0 || this.walls.size() == 0)
			return;
		
		String out = "";
		// Add walls to str
		out += "Walls\n";
		for (Line l : this.walls) {
			out += l.pos1.x + "," + l.pos1.y + "," + l.pos2.x + "," + l.pos2.y + "\n";
		}
		
		// Add checkpoints to str
		this.sortCheckpoints(Environment.startPosition);
		out += "Checkpoints\n";
		for (Line l : this.checkpoints) {
			out += l.pos1.x + "," + l.pos1.y + "," + l.pos2.x + "," + l.pos2.y + "\n";
		}
		
		// Save str to the map.txt file
		PrintWriter o;
		try {
			o = new PrintWriter(scr);
			o.print(out);
			o.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	private void sortCheckpoints (Vector start) {
		ArrayList<Line> sorted = new ArrayList<Line>();
		Vector prev = Environment.startPosition;
		while(this.checkpoints.size() > 0) {
			float closest = 1000000;
			Line closestLine = this.checkpoints.get(0);
			for(Line l : this.checkpoints) {
				if (distance(l.pos1, prev) < closest) {
					closest = distance(l.pos1, prev);
					closestLine = l;
				}
			}
			
			prev = closestLine.pos1;
			sorted.add(closestLine.clone());
			this.checkpoints.remove(closestLine);
		}
		
		this.checkpoints = sorted;
	}
	
	// Return normalized dist from line to map
	public float getIntersection(float x1, float y1, float x2, float y2, float maxD) {
		float output = maxD;
		
		// Loop over all lines in the map
		for(Line l : this.walls) {
			// Find the collision point
			Vector col = l.collides(x1, y1, x2, y2);
			if (col == null)
				continue;
			
			// If the point is closer than the current output
			int d = distance(
					new Vector((int)x1, (int)y1), 
					new Vector((int)col.x, (int)col.y));
			
			if (d < output) {
				output = d;
			}
		}
		
		return output;
	}
	
	// See if any vectors are being pressed by the mouse
	private boolean checkArrayList (ArrayList<Line> lines, MouseManager m) {
		for (Line l : lines) {
			
			if (distance(l.pos1, mousePos) < 10) {
				l.isHovered = 1;
				
				// See if the user is pressing the mouse
				if (m.getLeftPressedOnTick()) {
					// Update selected line info
					isMovingLine = true;
					selectedLine = l;
					selectedVector = 1;
				}
				
				return true;
			}
			
			if (distance(l.pos2, mousePos) < 10) {
				l.isHovered = 2;

				// See if the user is pressing the mouse
				if (m.getLeftPressedOnTick()) {
					// Update selected line info
					isMovingLine = true;
					selectedLine = l;
					selectedVector = 2;
				}
				
				return true;
			}
		}
		
		return false;
	}
	
	// Return the distance between two points
	private int distance (Vector v1, Vector v2) {
		float f = (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y);
		
		return (int) Math.sqrt(f);
	}

	// Generate a line from its for vectors
	private Line generateLine (String s) {
		// Split the string
		String[] v = s.split(",");
		
		// Parse the ints
		Vector v1 = new Vector(Float.parseFloat(v[0]), Float.parseFloat(v[1]));
		Vector v2 = new Vector(Float.parseFloat(v[2]), Float.parseFloat(v[3]));
		
		// Return the line
		return new Line(v1, v2);
	}
}
