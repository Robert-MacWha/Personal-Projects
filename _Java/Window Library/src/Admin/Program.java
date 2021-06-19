package Admin;
import java.awt.Graphics;
import java.awt.image.BufferStrategy;

import Assets.AssetManager;
import Inputs.KeyboardManager;
import Inputs.MouseManager;

public class Program implements Runnable {
	
	// States the program can be in (IE menu, game, results, ect)
	public enum PROGRAM_STATES {
		INIT
	};
	
	// Program info
	public static int width, height;
	public static String name;
	
	public static PROGRAM_STATES state;
	
	// Thread variables
	private boolean running;
	private Thread thread;
	
	// Inputs
	private KeyboardManager keyManager;
	private MouseManager mouseManager;
	
	// Assets
	AssetManager assetManager;
	
	// Scenes
	
	// Outputs
	private Display display;
	private BufferStrategy bs;
	private Graphics g;
	
	public Program (String n, int w, int h) {
		name = n;
		width = w;
		height = h;
	}
	
	// Initialize the program
	private void Init () {
		// Initialize display
		display = new Display();
		display.createDisplay(name, width, height);
		
		// Implement mouse manager
		mouseManager = new MouseManager();
		display.getFrame().addMouseListener(mouseManager);
		display.getFrame().addMouseMotionListener(mouseManager);
		display.getCanvas().addMouseListener(mouseManager);
		display.getCanvas().addMouseMotionListener(mouseManager);
		
		// Implement keyboard manager
		keyManager = new KeyboardManager();
		display.getFrame().addKeyListener(keyManager);
		
		// Import all assets
		assetManager = new AssetManager();
		
		// assetManager.load_spritesheet(path, spriteSizeX, spriteSizeY)
		
		// Set the program state to the default state
		state = PROGRAM_STATES.INIT;
		
		// Create all scenes
		// initScene = new InitScene(assetManager)
	}
	
	// Main program loop
	public void run () {
		Init();
		
		// Game loop
		while (running) {
			// Update all variables and then draw to the screen
			Tick();
			Render();
		}
		
		// Stops the program
		Stop();
	}
	
	// Update the current scene
	private void Tick () {
		// All transformative code
		
			// Run code depending on the current scenes
		if (state == PROGRAM_STATES.INIT) {
		}
	}
	
	// Render the current scene
	private void Render () {
		// Reset the buffer (buffer is ram used to store future frames)
		bs = display.getCanvas().getBufferStrategy(); 
		
		// If there are no buffers, create some
		if (bs == null) {
			display.getCanvas().createBufferStrategy(3);
			return;
		}
		
		// Set the graphics object to the buffer's graphics
		g = bs.getDrawGraphics();
		
		// Clear the screen
		g.clearRect(0, 0, width, height);
		
		// Now we can start drawing!
		
			// Run code depending on the current scenes
		if (state == PROGRAM_STATES.INIT) {
		}
		
		// Finished drawing, so update the buffer and destroy the graphics obj
		bs.show();
		g.dispose();
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