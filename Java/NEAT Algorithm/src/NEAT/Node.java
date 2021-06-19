package NEAT;

public class Node {
	public static enum NODE_TYPES {
		INPUT,
		HIDDEN,
		OUTPUT
	}
	
	private NODE_TYPES node_type;
	
	// Value of the node, used when evaluating the outputs of the network
	private float value;
	
	public Node (NODE_TYPES type) {
		this.node_type = type;
		this.value = 0;
	}
	
	public Node (NODE_TYPES type, float value) {
		this.node_type = type;
		this.value = value;
	}
	
	public Node DeepCopy () {
		Node new_node = new Node(this.node_type, this.value);
		
		return new_node;	
	}
	
	public NODE_TYPES GetNodeType () {
		return this.node_type;
	}
	
	public void UpdateNodeValue (float f) {
		this.value += f;
	}
	
	public void ResetNodeValue () {
		this.value = 0;
	}
	
	public float GetNodeValue () {
		return this.value;
	}
}
