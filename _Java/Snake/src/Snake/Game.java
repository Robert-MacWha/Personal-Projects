package Snake;
import java.util.ArrayList;
import java.util.concurrent.ThreadLocalRandom;

public class Game {
	
	public ArrayList<State> states;
	
	private ArrayList<Vector2> snake;
	private Vector2 snakeDir;
	private int snakeLen = 3;
	
	private Vector2 food;
	
	private Boolean done = false;
	
	public Game (int size, int maxLen) {
		
		// Initialize variables
		states = new ArrayList<State>();
		snake = new ArrayList<Vector2>();
		snakeDir = new Vector2(0, 0);
		done = false;
		
		// Select random starting positions for the snake and the food
		int randX = ThreadLocalRandom.current().nextInt(0, size);
		int randY = ThreadLocalRandom.current().nextInt(0, size);
		snake.add(new Vector2(randX, randY));
		
		food = GetVectorNotOnSnake(size);
		
		states.add(new State(snake, food, size, new Vector2(0, 0)));
		
		// Loop until the game ends or it hits the max length
		for(int i = 0; i < maxLen; i ++) {
			
			// Get the input for this tick
			Vector2 input = GetInputVector();
			
			// Update the snake's direction if an input is given
			if (!input.equals(0, 0))
				snakeDir = input;
			
			Vector2 newHeadPos = snake.get(0);
			
			// Only move the snake IF it is actually moving			
			if (!snakeDir.equals(0,  0)) {

				// Move the snake in its current direction
				newHeadPos = snake.get(0).add(snakeDir);
				snake.add(0, newHeadPos);
				
			}
			
			// Trim the snake's body if it's too long
			if (snake.size() > snakeLen) {
				
				snake.remove(snake.size() - 1);
				
			}
			
			// See if the snake has collided with obstacles
				// Walls
			if (newHeadPos.x < 0 || newHeadPos.x > size || newHeadPos.y < 0 || newHeadPos.y > size) {
				
				done = true;
				
			}
			
				// Snake's body
			for(int j = 1; j < snake.size(); j ++) {
				
				if (newHeadPos.equals(snake.get(j))) {
					
					done = true;
					
				}
				
			}
			
			// See if the snake has collided with the food
			if (newHeadPos.equals(food)) {
				
				// Update the snake's size and reposition the food
				snakeLen += 2;
				food = GetVectorNotOnSnake(size);
				
			}
			
			// Save the current state in the states variable
			states.add(new State(snake, food, size, input));
			
			if (done) {
				
				return;
				
			}
			
		}
		
	}
	
	public String ConvertStatesToString() {

		String out = "Game Start\n";
		
		// Loop over each state
		for(int i = 0; i < states.size(); i ++) {
			
			out += states.get(i).WriteStateToString();
			
		}
		
		out += "Game End\n\n";
		
		return out;
		
	}
	
	public Vector2 GetVectorNotOnSnake (int max) {
		
		int randX = ThreadLocalRandom.current().nextInt(0, max);
		int randY = ThreadLocalRandom.current().nextInt(0, max);
		Vector2 v = new Vector2(randX, randY);
		
		while(snake.get(0).equals(v)) { /* Makes sure that the food is not on top of the snake's head */
			
			randX = ThreadLocalRandom.current().nextInt(0, max);
			randY = ThreadLocalRandom.current().nextInt(0, max);
			v = new Vector2(randX, randY);
			
		}
		
		return v;
		
	}
	
	public Vector2 GetInputVector() {
		
		// 0-5 = no input, 6/7/8/9 = the 4 cardinal directions
		int weightedInput = ThreadLocalRandom.current().nextInt(0, 10);
		
		if (weightedInput < 6) {
			
			return new Vector2(0, 0);
			
		} else if (weightedInput == 6) {
			
			return new Vector2(1, 0);
			
		} else if (weightedInput == 7) {
			
			return new Vector2(-1, 0);
			
		} else if (weightedInput == 8) {
			
			return new Vector2(0, 1);
			
		} else {
			
			return new Vector2(0, -1);
			
		}
		
	}
	
}
