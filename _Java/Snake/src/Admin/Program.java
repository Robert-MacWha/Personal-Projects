package Admin;

import Assets.StringWritter;
import Snake.Game;

public class Program implements Runnable {
	
	public int ticks = 1;
	private int gamesPerTick = 2;
	private int currentGame = 0;
	
	private int gameSize = 10;
	private int maxGameLen = 100;
	
	String outputString = "";
	
	// Thread variables
	private boolean running;
	private Thread thread;
	
	// Main program loop
	public void run () {	
		
		// Game loop
		while (running) {
			
			Tick();
			
		}
		
		// Stops the program
		Stop();
		
	}
	
	// Update the current scene
	private void Tick () {
		
		// All transformative code
		System.out.println("Completed " + (currentGame * gamesPerTick) + " out of " + (ticks * gamesPerTick) + " total simulations\n");
		
		for(int i = 0; i < gamesPerTick; i ++) {
			
			Game g = new Game(gameSize, maxGameLen);
			outputString += g.ConvertStatesToString();
			
		}
		
		currentGame ++;
		
		// Write the output str to file
		StringWritter.WriteStrToFile("D:\\Projects\\Java\\Snake\\dataset.txt", outputString);
		outputString = "";
		
		if (currentGame >= ticks)
			running = false;
		
	}
	
	
	// Start a new thread
	public synchronized void Start () {
		
		// If the program is already running, then don't start it up!
		if (running)
			return;
		
		running = true;      // Activates the main game loop
		thread = new Thread(this);
		thread.start();      // Calls the run method in the this class
		
	}
	
	
	// Stop the current thread
	public synchronized void Stop () {
		
		// If the program is not running, then don't stop it!
		if (!running)
			return;
		
		running = false;     // Deactivates main game loop
		try {
			
			thread.join();   // Closes the thread
			
		} catch (InterruptedException e) {
			
			e.printStackTrace();
			
		}
		
	}
	
}