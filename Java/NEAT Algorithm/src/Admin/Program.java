package Admin;

import NEAT.Network;

public class Program implements Runnable {
	// Program info
	public static int width, height;
	public static String name;
	
	// Thread variables
	private boolean running;
	private Thread thread;
	
	public Program (String n, int w, int h) {
		name = n;
		width = w;
		height = h;
	
	}
	
	// Main program loop
	public void run () {
		Network net = new Network();
		
		net.GenerateRandomNetwork(2, 5, 1, 0.1f, 5);
		
		// Stops the program
		Stop();
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