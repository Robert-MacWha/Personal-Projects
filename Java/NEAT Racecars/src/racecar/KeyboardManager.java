package racecar;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyboardManager implements KeyListener {
	
	private boolean[] keys;
	
	public KeyboardManager () {
		// Initialize keys array
		keys = new boolean[256];
		
		for (@SuppressWarnings("unused") boolean b : keys) {
			b = false;
		}
	}
	
	// Helper functions
	public boolean getKeyState (int e) {
		return keys[e];
	}

	@Override
	// Whenever user presses a key
	public void keyPressed(KeyEvent e) {
		keys[e.getKeyCode()] = true;
	}

	@Override
	// Whenever user releases a key
	public void keyReleased(KeyEvent e) {
		keys[e.getKeyCode()] = false;
	}

	@Override
	public void keyTyped(KeyEvent e) {
		
	}
}
