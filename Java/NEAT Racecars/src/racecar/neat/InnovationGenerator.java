package racecar.neat;

public class InnovationGenerator {
	public static int currentInnovation = 0;
	  
	public static int getInnovation() {
		  return (currentInnovation ++);
	  }
}
