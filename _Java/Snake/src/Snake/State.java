package Snake;
import java.util.ArrayList;

public class State {
	
	public ArrayList<ArrayList<Integer>> scene;
	public Vector2 input;
	
	public State (ArrayList<Vector2> snake, Vector2 food, int size, Vector2 input) {
		
		// Set the state's input to the given input
		this.input = input;
		
		// Initialize the scene var
		scene = new ArrayList<ArrayList<Integer>>();
		
		// Loop over all items in the scene var
		for(int x = 0; x < size; x ++) {
			
			scene.add(new ArrayList<Integer>());
			
			for(int y = 0; y < size; y ++) {
				
				// Determine the cell's state
				int cellState = 0;
				
				// See if any of the snake is on this cell
				for(int i = 0; i < snake.size(); i ++) {
					
					if (snake.get(i).equals(x, y)) {
						
						cellState = 1;
						
					}
					
				}
				
				// See if the food falls on this cell
				if (food.equals(x, y)) {
					
					cellState = 2;
					
				}
				
				// Set the corresponding Integer to the cell's state
				scene.get(x).add(cellState);
				
			}
			
		}
		
	}
	
	public String WriteStateToString () {
		
		String output = " - Action:\n";
		
		output += input.x + ", " + input.y;
		
		output += "\n - State:\n";
		
		for(int y = 0; y < scene.size(); y ++) {
			
			for(int x = 0; x < scene.get(y).size(); x ++) {
				
				output += scene.get(x).get(y).toString();
				
			}
		
			output += "\n";
		
		}
		
		return output;
		
	}
	
}
