package Admin;

import java.awt.Canvas;
import java.awt.Dimension;
import javax.swing.JFrame;

public class Display {
	
	private JFrame frame;
	private Canvas canvas;
	
	private String title;
	private int width;
	private int height;
	
	public void createDisplay (String title, int width, int height) {
		// Get the variables for the frame
		this.title = title;
		this.width = width;
		this.height = height;
		
		// Setup the frame object
		frame = new JFrame(title);                             // Give it a name
		frame.setSize(width, height);                          // Set it's size
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  // Force it to close
		frame.setResizable(false);                             // Stop it from being resizable
		frame.setLocationRelativeTo(null);                     // Start in center of screen
		frame.setVisible(true);                                // Show the frame
		
		// Setup the canvas object
		canvas = new Canvas();
			// Force the canvas to stay the size of the frame
		canvas.setPreferredSize(new Dimension(width, height));
		canvas.setMaximumSize(new Dimension(width, height));
		canvas.setMinimumSize(new Dimension(width, height));
		canvas.setFocusable(false);
		
		// Add the canvas to the frame
		frame.add(canvas);
		frame.pack();
	}
	
	public JFrame getFrame() {
		return frame;
	}
	
	public Canvas getCanvas () {
		return canvas;
	}
}