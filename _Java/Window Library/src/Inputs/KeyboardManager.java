package Inputs;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyboardManager implements KeyListener {
	
	private Boolean[] keys;
	
	public KeyboardManager () {
		// Initialize keys array
		keys = new Boolean[256];
	}
	
	// Helper functions
	public Boolean getKeyState (int e) {
		return (keys[e] == null ? false : keys[e]);
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