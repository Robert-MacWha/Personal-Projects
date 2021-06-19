package racecar.neat;

import java.util.ArrayList;
import java.util.HashMap;

public class Genome {
	private HashMap<Integer, ConnectionGene> connections;   // Array of all connections between nodes
	private HashMap<Integer, NodeGene> nodes;               // Array of all nodes
	
	private float fitness;
	private float biasInput;
	  
	public Genome () {
		connections = new HashMap<Integer, ConnectionGene>();
		nodes = new HashMap<Integer, NodeGene>();
	}
	
	public float getFitness () {
		return fitness;
	}
	
	public void setFitness (float f) {
		fitness = f;
	}
	
	public float getBias () {
		return biasInput;
	}
	
	public void setBias(float f) {
		biasInput = f;
	}
	  
	// Add a connection to the genome
	public void addConnectionGene (ConnectionGene con) {
		connections.put(con.getInnovation(), con); 
	}
	  
	// Add a node at a index to the genome
	public void addNodeGene (NodeGene node) {
		nodes.put(node.getId(), node); 
	}
	  
	// Return the arraylist of connections
	public HashMap<Integer, ConnectionGene> getConnectionGenes () {
		return(connections); 
	}
	  
	// Return the arraylist of nodes
	public HashMap<Integer, NodeGene> getNodeGenes () {
		return(nodes); 
	}
	  
	// Initialize the genome with x random nodes and y random connections
	public void initialiseRandomGenome(int inputs, int hidden, int outputs, int connections) {
		// Add the nodes
		for (int i = 0; i < inputs; i ++) {
			NodeGene n = new NodeGene(NODETYPES.INPUT, InnovationGenerator.getInnovation(), (float) ((Math.random() * 4) - 2));
			addNodeGene(n); 
		}
		    
		for (int i = 0; i < hidden; i ++) {
			NodeGene n = new NodeGene(NODETYPES.HIDDEN, InnovationGenerator.getInnovation(), (float) ((Math.random() * 4) - 2));
			addNodeGene(n); 
		}
		    
		for (int i = 0; i < outputs; i ++) {
			NodeGene n = new NodeGene(NODETYPES.OUTPUT, InnovationGenerator.getInnovation(), (float) ((Math.random() * 4) - 2));
			addNodeGene(n); 
		}
	
		//Add some connections
		for (int i = 0; i < connections; i ++) {
			addConnectionMutation();
		}
		    
		// Clean up the network
		boolean isClean = false;
		while (!isClean) {
			isClean = true;
			// Loop over each node and see if any have no connections / only input or output connections
			for (int k : new ArrayList<Integer>(nodes.keySet())) {
				NodeGene node = nodes.get(k);
				int i = 0;
				int o = 0;
				for (ConnectionGene con : this.connections.values()) {
					if (con.getInNode() == k) {
						i ++;
					} else if (con.getOutNode() == k) {
						o --; 
					}
				}
				        
				if ((i == 0 || o == 0) && (node.getType() == NODETYPES.HIDDEN)) {
					nodes.remove(k); 
					
					isClean = false;
				}
			}
			      
			// Loop over all connections and remove any with only one valid connection
			for (int k : new ArrayList<Integer>(this.connections.keySet())) {
				ConnectionGene con = this.connections.get(k);
				if (nodes.get(con.getInNode()) == null || nodes.get(con.getOutNode()) == null) {
					this.connections.remove(con.getInnovation());
					          
					isClean = false;
				}
			}
		}
	}
	
	// Do one iteration of updating inputs and outputs, then return the final output
	public ArrayList<Float> feedForwards (ArrayList<Float> inputs) {
		// Add all inputs to the input nodes
		int counter = 0;
		for (NodeGene n : this.nodes.values()) {
			if (n.getType() == NODETYPES.INPUT) {
				n.acceptInput(inputs.get(counter));
				counter ++;
			}
		}
		
		// Loop over all connections and get the to update the inputs of all other nodes
		for (ConnectionGene c : this.connections.values()) {
			// Get inputs, output and weight
			int input = c.getInNode();
			int output = c.getOutNode();
			float weight = c.getWeight();
			
			// Apply given value to the output node
			this.nodes.get(output).acceptInput(
				this.nodes.get(input).getOutput() * weight
			);
		}
		
		// Now update the outputs of all nodes
		for (NodeGene n : this.nodes.values()) {
			n.updateOutput();
		}
		
		// Lastly, get all of the outputs from the output nodes and return them
		ArrayList<Float> outputs = new ArrayList<Float>();
		
		for (NodeGene n : this.nodes.values()) {
			if (n.getType() == NODETYPES.OUTPUT) {
				outputs.add(n.getOutput());
			}			
		}
		
		return outputs;
	}
	  
	// Function to add a random connection between two random nodes
	public void addConnectionMutation () {
		// Select random nodes
		Object[] nodeArray = this.nodes.values().toArray();
		int r = (int)(Math.random() * nodeArray.length);
		int j = (int)(Math.random() * nodeArray.length);
		NodeGene node1 = (NodeGene) nodeArray[r]; 
		NodeGene node2 = (NodeGene) nodeArray[j]; 
		
		// Make sure that both connections don't go to input/output nodes
		if ((node1.getType() != NODETYPES.HIDDEN &&  
			 node1.getType() == node2.getType()) ||
			 node1 == node2) {
			return;
		}
		
		float weight = (float)(Math.random() * 2.0f) - 1.0f;
		    
		// Make sure that the nodes are listed in the correct order
		boolean reversed = false;
		if (node1.getType() == NODETYPES.HIDDEN && node2.getType() == NODETYPES.INPUT) {
			reversed = true; 
		} else if (node1.getType() == NODETYPES.OUTPUT && node2.getType() == NODETYPES.HIDDEN) {
			reversed = true; 
		} else if (node1.getType() == NODETYPES.OUTPUT && node2.getType() == NODETYPES.INPUT) {
			reversed = true; 
		}
		
		// Make sure that the connection does not already exist
		boolean connectionExists = false;
		for (ConnectionGene con : connections.values()) {
			if (con.getInNode() == node1.getId() && con.getOutNode() == node2.getId()) {
				connectionExists = true;  // The connection exists
				break;
			} else if (con.getInNode() == node2.getId() && con.getOutNode() == node1.getId()) {
				connectionExists = true;  // The connection exists
				break;
			}
		}
		    
		if (!connectionExists) {
			ConnectionGene newCon = new ConnectionGene(
			reversed ? node2.getId() : node1.getId(), 
			reversed ? node1.getId() : node2.getId(), 
			weight, true, InnovationGenerator.getInnovation()); 
			      
			connections.put(newCon.getInnovation(), newCon);
		}
	}
	  
	// Add a node to the genome, disabling a single connection and adding two more
	public void addNodeMutation () {
		// Select a random connection
		Object[] conns = this.connections.values().toArray();
		
		// Make sure that there ARE connections to pick from
		if (conns.length == 0) {
			return;
		}
		
		int conIndex = (int) (Math.random() * conns.length);
		ConnectionGene con = (ConnectionGene) conns[conIndex];
		
		NodeGene inNode = nodes.get(con.getInNode());
		NodeGene outNode = nodes.get(con.getOutNode());
		    
		// Disable the old connection
		con.disable();
		    
		// Create a new node
		NodeGene newNode = new NodeGene(NODETYPES.HIDDEN, InnovationGenerator.getInnovation(), 0);
		    
		// Create the new connections
		ConnectionGene con1 = new ConnectionGene(inNode.getId(), newNode.getId(), 1, true, InnovationGenerator.getInnovation());
		ConnectionGene con2 = new ConnectionGene(newNode.getId(), outNode.getId(), con.getWeight(), true, InnovationGenerator.getInnovation());
		
		int connection = 0;
		for(NodeGene n : this.nodes.values()) {
			if (n.getType() == NODETYPES.OUTPUT) {
				connection ++;
			}
		}
		
		// Add the connections and node to the arrays
		nodes.put(newNode.getId(), newNode);          // This line is the bad one (FIXED!)
		
		connection = 0;
		for(NodeGene n : this.nodes.values()) {
			if (n.getType() == NODETYPES.OUTPUT) {
				connection ++;
			}
		}
		
		connections.put(con1.getInnovation(), con1);
		connections.put(con2.getInnovation(), con2);
		
		connection = 0;
		for(NodeGene n : this.nodes.values()) {
			if (n.getType() == NODETYPES.OUTPUT) {
				connection ++;
			}
		}
	}
	
	// These two are exactly what they sound like
	public void mutateWeights () {
		// Loop over all of the connections
		for (ConnectionGene con : connections.values()) {
			// Try to mutate the weight.  1% new weight, 23% adding -0.5 to 0.5
			
			float r = (float)(Math.random());
			if (r < 0.01) {
				con.setWeight((float)(Math.random() * 4.0 - 2.0)); 
			} else if (r < 0.25) {
				con.setWeight(con.getWeight() + (float)((Math.random() / 8) - 0.0625f));
			}
		}
	}
	
	public void mutateBias () {
		// Loop over each node
		for (NodeGene n : this.nodes.values()) {
			// Try to mutate the node's bias.  1% new value, 23% adding -0.5 to 0.5
			
			float r = (float)(Math.random());
			if (r < 0.01) {
				n.setBias((float)(Math.random() * 4.0 - 2.0)); 
			} else if (r < 0.25) {
				n.setBias(n.getBias() + (float)((Math.random() / 8) - 0.0625f));
			}
		}
	}
	
	public void mutateBiasInput () {
		this.biasInput += Math.random() * 0.1f;
	}
	
	// Combine two parent genomes and return the child
		// This function requires the first parent to be the more fit one (IE)
	public Genome crossover (Genome parent1, Genome parent2) {
		/*
			For nodes, the child will inherit all nodes present in the most fit parent
			For connections, the child will inherit randomly from either parent if both have the connection
			If just the fitter parent has the connection then the child will also receive it
		 */
		 Genome child = new Genome();
		    
		 // Give the child all nodes
		 for (NodeGene parent1Node : parent1.getNodeGenes().values()) {
			 child.addNodeGene(parent1Node.getCopy());
		 }
		    
		 // Give the child the connections
		 for (ConnectionGene parent1Connection : parent1.getConnectionGenes().values()) {
			 //If both parent have the gene
			 if (parent2.getConnectionGenes().containsKey(parent1Connection.getInnovation())) {  
				 // The genes are the same!
				 // Add the gene from either parent
				 float r = (float)(Math.random() * 100);
				 if (r < 50) {
					 child.addConnectionGene(parent1Connection.getCopy()); 
				 } else {
					 child.addConnectionGene(parent2.getConnectionGenes().get(parent1Connection.getInnovation()).getCopy()); 
				 }
			 } else {
				 // Only the more fit parent has the gene, therefore give it to the child
				 child.addConnectionGene(parent1Connection.getCopy());
			 }
		 }
		    
		 return child;
	}
	  
	// This function works perfectly
	public Genome getDeepCopy () {
		Genome child = new Genome();
		
		// Give the child all nodes
		for (NodeGene node : this.nodes.values()) {
			child.addNodeGene(node.getCopy());
		}
		 
		// Give child all connections
		for (ConnectionGene con : this.connections.values()) {
			child.addConnectionGene(con.getCopy());
		}
		
		// Update fitness
		child.setFitness(this.fitness);
		 
		return child;
	}
	
	// Print out a summary of the genome
	public void printGenome () {
		System.out.println("Printing Summary:");
		//Loop over each connection and print it out
		for (ConnectionGene con : connections.values()) {
			con.printCon(); 
		}
	}
}
