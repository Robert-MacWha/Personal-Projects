package racecar.neat;

import java.util.ArrayList;

enum NODETYPES {
	INPUT,
	HIDDEN,
	OUTPUT
}

public class NodeGene {
	private NODETYPES type;
	private int id;
	
	// Data stored from previous evaluation
	private ArrayList<Float> inputs;
	private float output;
	
	private float bias;
 
	public NodeGene (NODETYPES type, int id, float bias) {
		this.type = type;
		this.id = id;
		this.bias = bias;
		
		this.inputs = new ArrayList<Float>();
	}
	
	// Feed in an input from one of the connections
	public void acceptInput (float i) {
		this.inputs.add(i);
	}
	
	// Update the output value of the node
	public void updateOutput () {
		// Sum up all inputs and apply the activation function
		float sum = 0;
		for (float f : this.inputs) {
			sum += f;
		}
		
		// Apply activation (currently sigmoid)
		float e = (float) Math.E;
		sum = (float) ((Math.pow(e, sum) - Math.pow(e, -sum))
				/ (Math.pow(e, sum) + Math.pow(e, -sum)));
		
		// Set the output
		if (this.inputs.size() > 0)
			this.output = sum;
		else 
			this.output = 0;
		
		// Reset the inputs
		this.inputs = new ArrayList<Float>();
	}
	
	public float getOutput () {
		return output;
	}
	  
	// Get the type of the node
	public NODETYPES getType () {
		return(type); 
	}
	  
	// Get the id of the gene
	public int getId () {
		return(id);
	}
	  
	public float getBias () {
		return bias;
	}
	
	public void setBias (float b) {
		bias = b;
	}
	
	// Create a copy of the gene
	public NodeGene getCopy () {
		NodeGene c = new NodeGene(type, id, bias);
		return (c);
	}
}
