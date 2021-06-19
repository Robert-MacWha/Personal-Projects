package NEAT;

public class Connection {
	
	private int in;               // Input node for this connection
	private int out;              // Output node for this connection
	private float weight;         // Weight for this connection
	private Boolean enabled;      // Whether this connection is enabled or not
	private int innovation;       // Innovation number for this connection (used to calculate how different two networks are for breeding)
	
	public Connection (int in, int out) {
		this.in = in;
		this.out = out;
		
		this.weight = -1;
		this.enabled = false;
		this.innovation = -1;
	}
	
	public Connection (int in, int out, float weight, Boolean enabled, int innovation) {
		this.in = in;
		this.out = out;
		this.weight = weight;
		this.enabled = enabled;
		this.innovation = innovation;
	}
	
	public void SetWeight (float new_weight) {
		// Update the weight's value and clamp it to 0-1
		this.weight = new_weight;
	}
	
	public void SetEnabled (Boolean enabled) {
		this.enabled = enabled;
	}
	
	public void SetInnovation (int i) {
		this.innovation = i;
	}
	
	public int GetInNode () {
		return this.in;
	}
	
	public int GetOutNode () {
		return this.out;
	}
	
	public float GetWeight () {
		return this.weight;
	}
	
	public Boolean GetEnabled () {
		return this.enabled;
	}
	
	public int GetInnovation () {
		return this.innovation;
	}
}
