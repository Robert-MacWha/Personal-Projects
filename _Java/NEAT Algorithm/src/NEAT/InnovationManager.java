package NEAT;

public class InnovationManager {
	public static int innovation_number = 0;
	
	public static int GetNewInnovation() {
		innovation_number += 1;
		return innovation_number;
	}
}
