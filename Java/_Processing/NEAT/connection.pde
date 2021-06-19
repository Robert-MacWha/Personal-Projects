static float weight_mutation_factor = 0.5;

class Connection {

    public int in_node;
    public int out_node;

    public float weight;
    public int innovation;
    public boolean enabled;

    // Initialize the enabled connection
    Connection (int in_node, int out_node, float weight, int innovation) {

        this.in_node = in_node;
        this.out_node = out_node;

        this.weight = weight;
        this.innovation = innovation;  
        this.enabled = true;

    }

    // Initialize the connection with a possible non-default enabled value
    Connection (int in_node, int out_node, float weight, int innovation, boolean enabled) {

        this.in_node = in_node;
        this.out_node = out_node;

        this.weight = weight;
        this.innovation = innovation;  
        this.enabled = enabled;

    }

    public Connection copy () {
        
        return new Connection(in_node, out_node, weight, innovation, enabled);

    }

    // Returns whether the connection is comprised of the two given nodes
    public boolean is_Equivalent (int node_a, int node_b) {

        return (
            (node_a == in_node && node_b == out_node)
            );

    }

    public void summary () {

        println(" - In_Node:  " + in_node);
        println(" - Out_Node: " + out_node);
        println(" - Weight:   " + weight);

    }

    public void mutate_Weight() {

        weight += random(-weight_mutation_factor, weight_mutation_factor);

    }

}