package Inputs;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

public class MouseManager implements MouseListener, MouseMotionListener {
	private int x = 0;
	private int y = 0;
	private Boolean leftPressed = false;
	private Boolean rightPressed = false;
	
	// Helper functions
	public int[] getMousePos () {
		return new int[] {x, y};
	}
	
	public Boolean getLeftPressed () {
		return leftPressed;
	}
	
	public Boolean getRightPressed () {
		return rightPressed;
	}
	
	@Override
	// Detect clicks
	public void mousePressed (MouseEvent e) {
		if (e.getButton() == MouseEvent.BUTTON1) {
			leftPressed = true;
		} else if (e.getButton() == MouseEvent.BUTTON2) {
			rightPressed = true;
		}
	}
	
	@Override
	// Detecting releases
	public void mouseReleased (MouseEvent e) {
		if (e.getButton() == MouseEvent.BUTTON1) {
			leftPressed = false;
		} else if (e.getButton() == MouseEvent.BUTTON2) {
			rightPressed = false;
		}
	}
	
	// Detection motion
	@Override
	public void mouseMoved (MouseEvent e) {
		x = e.getX();
		y = e.getY();
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseClicked(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseEntered(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void mouseExited(MouseEvent e) {
		// TODO Auto-generated method stub
		
	}
}