package NEAT;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;

import NEAT.Node.NODE_TYPES;

// NEAT implementation based on this paper: http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
public class Network {
	private ArrayList<Node> nodes;
	private ArrayList<Connection> connections;
	
	private Random random;
	
	public Network () {
		random = new Random();
		
		nodes = new ArrayList<Node>();
		connections = new ArrayList<Connection>();
	}
	
	// Returns a crossover of the two given networks, with parentA being the dominant expressor
	public static Network CrossoverNetworks(Network parentA, Network parentB) {
		Random random = new Random();
		
			// Note: The child network will get all its topology from the dominant parent, with the recessive parent only randomly giving weight info
		Network child = new Network();
		
		ArrayList<Node>         parent_a_nodes  = parentA.GetNodes();
		ArrayList<Connection>   parent_a_connections = parentA.GetConnections();
		ArrayList<Connection>   parent_b_connections = parentB.GetConnections();
		
		// Firstly, give the child all the nodes from the parentA network
		for(int i = 0; i < parent_a_nodes.size(); i ++) {
			child.AddNode(parent_a_nodes.get(i).DeepCopy());
		}
		
		// Secondly, loop over all the connections in the parentA network
		for(int i = 0; i < parent_a_connections.size(); i ++) {
			// See if parentB also has this connection
			Connection parent_a_connection = parent_a_connections.get(i);
			Connection parent_b_connection = parentB.GetSameConnection(parent_a_connection);
			
			Connection child_connection = new Connection(parent_a_connection.GetInNode(), parent_a_connection.GetOutNode());
			
			if (parent_b_connection != null) {
				// Randomly select a parent to derive the connection from 
				if (random.nextBoolean()) {
					child_connection.SetWeight(parent_a_connection.GetWeight());
					child_connection.SetEnabled(parent_a_connection.GetEnabled());
					child_connection.SetInnovation(parent_a_connection.GetInnovation());
				} else {
					child_connection.SetWeight(parent_b_connection.GetWeight());
					child_connection.SetEnabled(parent_b_connection.GetEnabled());
					child_connection.SetInnovation(parent_b_connection.GetInnovation());
				}
			} else {
				// Derive the connection from parent A
				child_connection.SetWeight(parent_a_connection.GetWeight());
				child_connection.SetEnabled(parent_a_connection.GetEnabled());
				child_connection.SetInnovation(parent_a_connection.GetInnovation());
			}
			
			// Give the child this new connection
			child.AddConnection(child_connection);
			
		}
		
		return child;
	}
	
	// Create a deep copy of a given network
	public static Network DeepCopyNetwork (Network base) {
		Network new_network = new Network();
		
		ArrayList<Node>         original_nodes  = base.GetNodes();
		ArrayList<Connection>   original_connections = base.GetConnections();
		
		// Firstly, give the new network all the nodes from the original network
		for(int i = 0; i < original_nodes.size(); i ++) {
			new_network.AddNode(original_nodes.get(i).DeepCopy());
		}
		
		// Secondly, loop over all the connections in the original network and give them to the new network
		for(int i = 0; i < original_connections.size(); i ++) {
			
			Connection original_connection = original_connections.get(i);
			Connection new_connection = new Connection(original_connection.GetInNode(), original_connection.GetOutNode());
			
			new_connection.SetWeight(original_connection.GetWeight());
			new_connection.SetEnabled(original_connection.GetEnabled());
			new_connection.SetInnovation(original_connection.GetInnovation());
			
			new_network.AddConnection(new_connection);
			
		}
		
		return new_network;
	}
	
	// Calculates how compatible two networks are (how likely the resulting baby will work)
	public static float CalculateNetworkSimilarity (Network net1, Network net2, float c1, float c2) {
		float compatibility = 0;
		
		// Equation: [compatibility] = ((c1*e) / N) + (c3 * W)
		// Where c1 and c2 are constants, N is the number of nodes the larger network has, e is the number of excess connections, and W is the average differences of weights in matching genes
		int N = 0; int E = 0; float W = 0;
		
		// Calculate N  (Number of nodes in larger network)
		int net1_nodes = net1.GetNodes().size();
		int net2_nodes = net2.GetNodes().size();
		
		N = Math.max(net1_nodes, net2_nodes);
		
		// Calculate E       (Number of excess connections)
			// Get the higher innovation network
		int net1_innovation = net1.GetHighestInnovation();
		int net2_innovation = net2.GetHighestInnovation();
		int larger_innovation = Math.max(net1_innovation, net2_innovation);
		int smaller_innovation = Math.min(net1_innovation, net2_innovation);
		
		Network higher_innov_network = net1_innovation >= net2_innovation ? net1 : net2;
		Network lower_innov_network = net1_innovation >= net2_innovation ? net2 : net1;
		
		ArrayList<Connection> higher_innov_network_connections = higher_innov_network.GetConnections();
		ArrayList<Connection> lower_innov_network_connections = lower_innov_network.GetConnections();
		
		for(int i = 0; i < higher_innov_network_connections.size(); i ++) {
			for(int j = 0; j < lower_innov_network_connections.size(); j ++) {
				if (higher_innov_network_connections.get(i).GetInnovation() == 
						lower_innov_network_connections.get(j).GetInnovation()) {
					E ++;
				}
			}
		}
		
		E = larger_innovation - E;
		
			// Calculate W
		int same_count = 0;
		for(int i = 0; i < lower_innov_network_connections.size(); i ++) {
			if (higher_innov_network.GetSameConnection(lower_innov_network_connections.get(i)) != null) {
				same_count ++;
				W += Math.abs(lower_innov_network_connections.get(i).GetWeight() - higher_innov_network.GetSameConnection(lower_innov_network_connections.get(i)).GetWeight());
			}
		}
		
		W /= same_count;
		
		// Calculate the compatibility
		compatibility = (c1 * E) / N;
		compatibility += (c2 * W);
		
		return compatibility;
	}
	
	public void PrintNetworkSummary () {
		System.out.println("Nodes: " + nodes.size());
		System.out.println("Connections: " + connections.size());
		System.out.println("----------------------------------------");
		
		for (int i = 0; i < connections.size(); i ++) {
			System.out.println("Input: " + connections.get(i).GetInNode() + " | Output: " + connections.get(i).GetOutNode() + " | Weight: " + connections.get(i).GetWeight() + " | Innov number: " + connections.get(i).GetInnovation());
		}
	}

	// Generate a random network with input nodes, output nodes, and random connections
	public void GenerateRandomNetwork (int input_nodes, int output_nodes, int connection_count_mean, float connection_count_variance, float connection_attempt_hardmax) {
		
		// Create all the input/output nodes
		for(int i = 0; i < input_nodes; i ++) {
			nodes.add(new Node(NODE_TYPES.INPUT));
		}
		
		for(int i = 0; i < output_nodes; i ++) {
			nodes.add(new Node(NODE_TYPES.OUTPUT));
		}
		
		// Select the # of connections the network will start with  (number is between 0 and the max number of connections)
		float connection_distribution = GetNormalDistrobution(connection_count_mean, connection_count_variance);
		int connection_count = Math.round(Math.min(Math.max(connection_distribution, 1), input_nodes * output_nodes));
		
		// Generate [connection_count] random connections
		Boolean pass = false;
		for(int i = 0; i < connection_count; i ++) {
			
			// While the program can still add connections
			int connection_attempts = 0;
			while (!pass) {
				// Create a random connection and see if it's unique
				
				Connection new_connection = new Connection(
						random.nextInt(input_nodes),                   // Select a random input node
						random.nextInt(output_nodes) + input_nodes,    // Select a random output node
						random.nextFloat() * 2 - 1,                    // Generate a random value between 0 and 1
						true,
						InnovationManager.GetNewInnovation()
					);
				
				if (!ConnectionExists(new_connection)) {
					
					connections.add(new_connection);
					break;
					
					
				} else {
					
					// The connection is not unique => update the [connection_attempts] var and possibly stop adding connections
					connection_attempts += 1;
					if (connection_attempts >= connection_attempt_hardmax) {
						pass = true;
					}
				}
			}
		}
		
		
	}
	
	// Mutation to add a random connection (stipulations are that it must not already exist and that it must not go from an output to an input)
	public void MutateAddConnection (int attempt_hardmax) {
		int attempts = 0;
		
		while (attempts < attempt_hardmax) {
			// Create a random connection
			Connection new_connection = new Connection (
					random.nextInt(nodes.size()),
					random.nextInt(nodes.size()),
					1,
					true,
					InnovationManager.GetNewInnovation()
				);
			
			// Make sure the connection is valid
			Boolean is_valid = true;
			
			if (new_connection.GetInNode() == new_connection.GetOutNode()) {
				
				is_valid = false;                                                   // Connection input/output nodes are the same
				
			} else if (ConnectionExists(new_connection)) {
				
				is_valid = false;                                                   // Connection exists
				
			} else if (nodes.get(new_connection.GetInNode()).GetNodeType() == nodes.get(new_connection.GetOutNode()).GetNodeType() && nodes.get(new_connection.GetInNode()).GetNodeType() != NODE_TYPES.HIDDEN) {
				
				is_valid = false;                                                   // Connection nodes are both inputs or outputs
				
			} else if (nodes.get(new_connection.GetInNode()).GetNodeType() == NODE_TYPES.OUTPUT) {
				
				is_valid = false;                                                   // Connection starts in an output
				
			} else if (nodes.get(new_connection.GetOutNode()).GetNodeType() == NODE_TYPES.INPUT) {
				
				is_valid = false;                                                   // Connection ends in an input
				
			}
			
			if (is_valid) {
				connections.add(new_connection);
				break;
			} else {
				attempts ++;
			}
		}
		
	}
	
	// Mutation to change the weight of a random connection
	public void MutateChangeConnection (float mutation_variance) {
		int target_connection_index = random.nextInt(connections.size());
		Connection target_connection = connections.get(target_connection_index);
		
		// target_connection.SetWeight(target_connection.GetWeight() * GetNormalDistrobution(0, mutation_variance));
		
		target_connection.SetWeight(0);
	}
	
	// Mutation to add a random node on a connection
	public void MutateAddNode (int attempt_hardmax) {
		
		int attempts = 0;
		while (attempts < attempt_hardmax) {
			// Select a random connection
			int target_connection_index = random.nextInt(connections.size());
			Connection target_connection = connections.get(target_connection_index);
			
			// Check to see if the old connection is enabled
			if (!target_connection.GetEnabled()) {
				attempts ++;
				continue;
			}
			
			// Disable the old connection
			target_connection.SetEnabled(false);
			
			// Create a new node
			Node new_node = new Node(NODE_TYPES.HIDDEN);
			
			// Create the two new connections
			Connection new_connection_1 = new Connection(target_connection.GetInNode(), nodes.size(), target_connection.GetWeight(), true, InnovationManager.GetNewInnovation());    // Goes from the old connection's input to the new node, has the old connection's weight
			Connection new_connection_2 = new Connection(nodes.size(), target_connection.GetOutNode(), 1, true, InnovationManager.GetNewInnovation());                               // Goes from the new node to the old connection's output, has a weight of 1s
			
			// Add the new network items
			nodes.add(new_node);
			connections.add(new_connection_1);
			connections.add(new_connection_2);
			
			break;
		}
		
	}
	
	// Add a given node to the nodes array
	public void AddNode (Node n) {
		this.nodes.add(n);
	}
	
	// Add a given connection to the connections array
	public void AddConnection (Connection c) {
		this.connections.add(c);
	}
	
	public ArrayList<Node> GetNodes() {
		return this.nodes;
	}
	
	public ArrayList<Connection> GetConnections () {
		ArrayList<Connection>   connections = new ArrayList<Connection>();
		
		for(int i = 0; i < this.connections.size(); i ++) {
			
			Connection connection = new Connection(this.connections.get(i).GetInNode(), this.connections.get(i).GetOutNode());
			
			connection.SetWeight(this.connections.get(i).GetWeight());
			connection.SetEnabled(this.connections.get(i).GetEnabled());
			connection.SetInnovation(this.connections.get(i).GetInnovation());
			
			connections.add(connection);
			
		}
		
		return connections;
	}
	
	// Returns a connection with the same input and output, or null if it does not exist
	public Connection GetSameConnection (Connection c) {
		for(int i = 0; i < this.connections.size(); i ++) {
			if (this.connections.get(i).GetInNode() == c.GetInNode() && this.connections.get(i).GetOutNode() == c.GetOutNode()) {
				Connection connection = new Connection(this.connections.get(i).GetInNode(), this.connections.get(i).GetOutNode());
				
				connection.SetWeight(this.connections.get(i).GetWeight());
				connection.SetEnabled(this.connections.get(i).GetEnabled());
				connection.SetInnovation(this.connections.get(i).GetInnovation());
				
				return connection;
			}
		}
		
		return null;
	}
	
	// Returns the highest innovation number of any connections in this network
	public int GetHighestInnovation () {
		int max = 0;
		
		for(int i = 0; i < this.connections.size(); i ++) {
			if (this.connections.get(i).GetInnovation() > max) {
				max = this.connections.get(i).GetInnovation();
			}
		}
		
		return max;
	}
	
	private float GetNormalDistrobution (int mean, float variance) {
		float noise = (float)(random.nextGaussian() * Math.sqrt(variance) + mean);
		
		return noise;
	}
	
	private Boolean ConnectionExists(Connection c) {
		
		// Make sure the connection is not a duplicate of another connection
		for (int i = 0; i < connections.size(); i ++) {
			Connection other = connections.get(i);
			
			if (other.GetInNode() == c.GetInNode() &&
				other.GetOutNode() == c.GetOutNode()) {
				return true;
			}
		}
		
		return false;
	}
}
