package racecar;

import java.awt.Graphics;
import java.awt.image.BufferStrategy;

import racecar.states.*;

public class Program implements Runnable {
	
	public enum STATES {
		MENU,
		LEVELEDITOR,
		ENVIRONMENT
	}
	
	// Program info
	public static int programWidth, programHeight;
	public static String windowName;
	public static STATES programState;
	
	public static STATES bufferedState;
	
	// States
	private Menu menuState;
	private LevelEditor levelState;
	private Environment enviroState;
	
	// Thread variables
	private boolean running;
	private Thread thread;
	
	// Inputs
	private KeyboardManager keyManager;
	private MouseManager mouseManager;
	
	// Outputs
	private Display display;
	private BufferStrategy bs;
	private Graphics g;
	
	public Program (String n, int w, int h) {
		windowName = n;
		programWidth = w;
		programHeight = h;
		programState = STATES.MENU;
		
		menuState = new Menu();
		levelState = new LevelEditor();
		enviroState = new Environment();
	}
	
	private void init () {
		// Initialize display
		display = new Display();
		display.createDisplay(windowName, programWidth, programHeight);
		
		// Implement mouse manager
		mouseManager = new MouseManager();
		display.getFrame().addMouseListener(mouseManager);
		display.getFrame().addMouseMotionListener(mouseManager);
		display.getCanvas().addMouseListener(mouseManager);
		display.getCanvas().addMouseMotionListener(mouseManager);
		
		// Implement keyboard manager
		keyManager = new KeyboardManager();
		display.getFrame().addKeyListener(keyManager);
		
		// Initialize all states
		menuState.init();
	}
	
	public void run () {
		init();
		
		// Game loop
		while (running) {
			// Update all variables and then draw to the screen
			tick();
			render();
		}
		
		// Stops the program
		stop();
	}
	
	private void tick () {
		// If there is a bufferedState, load it
		if (bufferedState != null) {
			programState = bufferedState;
			
			// Initialize the new state
			if (programState == STATES.MENU) {
				menuState.init();
			} else if (programState == STATES.LEVELEDITOR) {
				levelState.init();
			} else if (programState == STATES.ENVIRONMENT) {
				enviroState.init();
			}
			
			// Reset the bufferedState variable
			bufferedState = null;
		}
		
		// All transformative code
		if (programState == STATES.MENU) {
			menuState.tick(mouseManager);
		} else if (programState == STATES.LEVELEDITOR) {
			levelState.tick(mouseManager, keyManager);
		} else if (programState == STATES.ENVIRONMENT) {
			enviroState.tick();
		}
		
		// Reset mouseManager variables
		mouseManager.tick();
	}
	
	private void render () {
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
		g.clearRect(0, 0, programWidth, programHeight);
		
		// Now we can start drawing!
		if (programState == STATES.MENU) {
			menuState.render(g);
		} else if (programState == STATES.LEVELEDITOR) {
			levelState.render(g);
		} else if (programState == STATES.ENVIRONMENT) {
			enviroState.render(g);
		}
		
		// Finished drawing, so update the buffer and destroy the graphics obj
		bs.show();
		g.dispose();
	}
	
	// Start a new thread
	public synchronized void start () {
			// If the program is already running, then don't start it up!
			if (running)
				return;
			
			running = true;      // Activates the main game loop
			thread = new Thread(this);
			thread.start();      // Calls the run method in the this class
		}
		
	// Stop the current thread
	public synchronized void stop () {
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
