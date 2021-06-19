package Admin;
public class Launcher {
	public static Program program;
	
	public static void main(String[] args) {
		// Create and start the program
		program = new Program();
		program.Start(); 
	}
}