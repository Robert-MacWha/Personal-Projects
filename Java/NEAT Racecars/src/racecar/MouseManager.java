package racecar;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

public class MouseManager implements MouseListener, MouseMotionListener {
	private int x;
	private int y;
	private boolean leftPressed;
	private boolean rightPressed;
	
	private boolean leftPressedOnTick;
	private boolean rightPressedOnTick;
	
	public MouseManager () {
		x                  = 0;
		y                  = 0;
		leftPressed        = false;
		rightPressed       = false;
		leftPressedOnTick  = false;
		rightPressedOnTick = false;
	}
	
	// Reset left/right pressed on tick variables
	public void tick () {
		leftPressedOnTick = false;
		rightPressedOnTick = false;
	}
	
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
	
	public Boolean getLeftPressedOnTick () {
		return leftPressedOnTick;
	}
	
	public Boolean getRightPressedOnTick () {
		return rightPressedOnTick;
	}
	
	@Override
	// Detect clicks
	public void mousePressed (MouseEvent e) {	
		if (e.getButton() == MouseEvent.BUTTON1) {
			leftPressed = true;
			leftPressedOnTick = true;
		} else if (e.getButton() == MouseEvent.BUTTON2) {
			rightPressed = true;
			rightPressedOnTick = true;
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
