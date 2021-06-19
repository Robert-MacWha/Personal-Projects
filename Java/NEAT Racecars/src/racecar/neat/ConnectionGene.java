package racecar.neat;

public class ConnectionGene {
	private int inNode;
	private int outNode;
	private float weight;
	private boolean expressed;
	private int innovation;
	  
	public ConnectionGene (int inNode, int outNode, float weight, boolean expressed, int innovation) {
		super();
		this.inNode = inNode;
		this.outNode = outNode;
		this.weight = weight;
		this.expressed = expressed;
		this.innovation = innovation;
	}
	  
	// Disable the gene, can no longer act as a connection
	public void disable () {
		this.expressed = false; 
	}
	  
	// Get the input node for this connection
	public int getInNode () {
		return(inNode); 
	}
	  
	// Get the output node for this connection
	public int getOutNode () {
		return(outNode); 
	}
	  
	// Get the weight for this connection
	public float getWeight () {
		return(weight); 
	}
	  
	//Set the weight to a new value
	public void setWeight (float weight) {
		this.weight = weight;
	}
	  
	// Get the innovation for this connection
	public int getInnovation () {
		return(innovation); 
	}
	  
	// Create a copy of this connection
	public ConnectionGene getCopy () {
		ConnectionGene c = new ConnectionGene(inNode, outNode, weight, expressed, innovation);
		return(c);
	}
	  
	// Print out a summary of the connection
	public void printCon () {
		System.out.println("Input Node: "  + inNode);
		System.out.println("Output Node: " + outNode);
		System.out.println("Weight: "      + weight);
		System.out.println("Innovation: "  + innovation);
		System.out.println("Expressed: "   + expressed);
		System.out.println("----------------------------");
	}
}
