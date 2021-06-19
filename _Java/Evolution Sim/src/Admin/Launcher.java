package Admin;
public class Launcher {
	public static Program program;
	
	public static void main(String[] args) {
		// Setup parameters for window
		String windowName = "Default Window";
		int windowWidth = 1000;
		int windowHeight = 600;
		
		// Create and start the program
		program = new Program(windowName, windowWidth, windowHeight);
		program.Start(); 
	}
}