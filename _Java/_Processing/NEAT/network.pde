class Network {

    ArrayList<Node> nodes;
    ArrayList<Connection> connections;

    int input_count;
    int output_count;

    // Initialize the network as a random network
    Network(int inputs, int outputs, int connections) {

        // Initialize the nodes
        this.input_count = inputs;
        this.output_count = outputs;

        // Initialize node array
        this.nodes = new ArrayList<Node>();

        for(int i = 0; i < inputs + outputs; i ++)
            this.nodes.add(new Node(i));

        // Initialize the connections array
        this.connections = new ArrayList<Connection>();

        for(int i = 0; i < connections; i ++) {

            add_Random_Connection();

        }

    }

    // Initialize the network as the sum of two parents
    Network (Network p1, Network p2) {

        // Get the input_count from the first parent
        input_count = p1.input_count;
        output_count = p1.output_count;

        // Grab all nodes from p1
        nodes = new ArrayList<Node>();
        for(Node n : p1.nodes) {

            nodes.add(n.copy());

        }

        // Grab all connections from p1 - if p2 also has that connection randomly select which transfers it
        connections = new ArrayList<Connection>();
        for(Connection c : p1.connections) {

            int p2_connection_index = p2.has_Connection(c.innovation);

            Connection base_connection = c.copy();

            if (p2_connection_index != -1 && random(1) <= 0.5) 
                base_connection = p2.connections.get(p2_connection_index);

            connections.add(base_connection);

        }

    }

    // Generates a list of outputs given a list of inputs
    public float[] predict (float[] inputs) {

        // Make sure that the input list is valid
        if (inputs.length != input_count)
            return null;

        // Set the value of the input nodes to the inputs
        for(int i = 0; i < input_count; i ++) {

            nodes.get(i).value = inputs[i];

        }

        // Call each connection's propogate function to pass the values to the next node
        for(Connection c : connections) {

            if (!c.enabled)
                continue;

            int c_in_node  = c.in_node;
            int c_out_node = c.out_node;
            float c_weight = c.weight;

            float c_out_value = nodes.get(c_in_node).value * c_weight;

            nodes.get(c_out_node).buffer_value += c_out_value;

        }

        // Update the values of each node to its buffer value
        for(Node n : nodes) {

            n.value = n.buffer_value;
            n.buffer_value = 0;
            
        }

        // Return a list comprised of the values of the output nodes
        float[] outputs = new float[output_count];
        for(int i = 0; i < output_count; i ++) {

            outputs[i] = nodes.get(input_count + i).value;

        }

        return outputs;

    }

    // Mutates the network randomly - parameters are precentage (0-1) chances for a given thing to happen
    public void mutate (float node_mutations, float connection_mutations, float weight_mutations) {

        // Add random nodes onto connections
        float rn = random(1);
        while (rn < node_mutations) {
            rn = random(1);
            add_Random_Node();
        }
        
        // Add random connections
        rn = random(1);
        while (rn < connection_mutations) {
            rn = random(1);
            add_Random_Connection();
        }

        // Mutate random weights
        rn = random(1);
        while (rn < weight_mutations) {
            rn = random(1);
            mutate_Random_Weight();
        }

    }

    // Creates a deep copy of the network
    public Network copy () {

        Network net = new Network(input_count, output_count, 0);

        // Transfer the nodes & connections
        net.nodes = new ArrayList<Node>();
        net.connections = new ArrayList<Connection>();

        for (Node n : nodes) {

            net.nodes.add(n.copy());

        }

        for(Connection c : connections) {

            net.connections.add(c.copy());

        }

        return net;

    }

    // Prints out a summary of the network
    public void summary () {
        
        println("Node Count: " + nodes.size());
        println("Connection count: " + connections.size());

        println("Connections: ");
        for(Connection c : connections) {

            c.summary();
            println();

        }

    }

    // Renders a graph representation of the network
    public void render_Summary (float node_size, float connection_width, float column_spacing, float graph_width, float connection_strength, float repulsion_strength) {

        // Minimize connection distance
        for(Connection c : connections) {

            int c_in_node  = c.in_node;
            int c_out_node = c.out_node;

            // Calculate distance squared between two nodes
            float d_squared = (float)Calc.dist_Squared(nodes.get(c_out_node).pos, nodes.get(c_in_node).pos);

            // Calculate the direction the two nodes need to move in
            PVector dir = PVector.sub(nodes.get(c_out_node).pos, nodes.get(c_in_node).pos);
            dir.normalize();
            dir.mult(min((float)((connection_strength / 100) * d_squared), 10));
            dir.mult(0.1);

            // Move the two nodes
            nodes.get(c_in_node).pos.add(dir);
            nodes.get(c_out_node).pos.sub(dir);

        }

            // Maximize node distance
        
        for(Node n1 : nodes) {
            for(Node n2 : nodes) {

                if (n1.id != n2.id) {

                    // Calculate distance squared between two nodes
                    float d_squared = (float)Calc.dist_Squared(n1.pos, n2.pos);

                    // Calculate the direction the two nodes need to move in
                    PVector dir = PVector.sub(n2.pos, n1.pos);
                    dir.normalize();
                    dir.mult(min(max((-repulsion_strength * d_squared) + node_size, 0), 10));
                    dir.mult(0.1);

                    // Move the two nodes away from each other
                    n1.pos.sub(dir);
                    n2.pos.add(dir);

                }

            }
        }

        // Lock the input nodes into a column at x=0
        for(int i = 0; i < input_count; i ++)
            nodes.get(i).pos = new PVector(0, i * column_spacing);

        // Lock the output nodes into a column at x=graph_width
        for(int i = 0; i < output_count; i ++)
            nodes.get(input_count + i).pos = new PVector(graph_width, i * column_spacing);

        // Render each node at its position
        stroke(31, 28, 33, 200);
        strokeWeight(5);
        fill(185, 192, 215, 255);

        for(Node n : nodes) {

            ellipse(n.pos.x, n.pos.y, node_size, node_size);

        }

        // Render each connection
        strokeWeight(connection_width);
        
        for(Connection c : connections) {

            if(!c.enabled)
                continue;
            
            PVector p1 = nodes.get(c.in_node).pos;
            PVector p2 = nodes.get(c.out_node).pos;

            float weight = c.weight;
            float adjusted_weight = (weight + 1) / 2;

            stroke(lerp(250, 163, adjusted_weight), lerp(70, 222, adjusted_weight), lerp(89, 131, adjusted_weight), 200);

            line(p1.x, p1.y, p2.x, p2.y);

        }

    }

    // Returns whether the network has a given connection - returns -1 if it doesn't
    public int has_Connection (int innovation) {

        for (int i = 0; i < connections.size(); i ++) {

            if (connections.get(i).innovation == innovation)
                return i;

        }

        return -1;

    }

    // Adds a node to a give connection
    void add_Node (int c_index) {

        Connection c = connections.get(c_index);

        // Disable the old connection
        connections.get(c_index).enabled = false;

        // Create a new node at the average position between the two old nodes
        int new_node_id = nodes.size();
        
        nodes.add(new Node(new_node_id));

        // Create two new connections, one from the in_node to the new node and one from the new node to the out_node
        Connection c1 = new Connection(c.in_node, new_node_id , 1       , Innovation_Manager.get_Innovation(c.in_node  , new_node_id));
        Connection c2 = new Connection(new_node_id, c.out_node, c.weight, Innovation_Manager.get_Innovation(new_node_id, c.out_node));

        connections.add(c1);
        connections.add(c2);

    }

    // Adds a random connection to the network
    void add_Random_Connection () {

        int node_count = nodes.size() - 1;

        if (node_count < 2) 
            return;

        // See if the max number of connections has been reached
        int connection_count = connections.size() - 1;

        if (connection_count == (node_count * node_count - 1) / 2)
            return;

        // If there are still possible connections, try and create one of them (limit the number of tries to 20, unlikely that it will ever be hit but stops infinite loop)
        int attempt_count = 0;
        while(attempt_count <= 20) {

            attempt_count ++;

            // Select two random different nodes
            int in_node = round(random(node_count));
            int out_node = round(random(node_count));

            while (out_node == in_node) {

                out_node = round(random(node_count));

            }

            boolean unique = true;

            // See if a connection already exists between these nodes
            for(Connection c : connections) {

                if (c.is_Equivalent(in_node, out_node)) {

                    unique = false;
                    continue;

                }

            }
            
            if (unique) {

                // These two nodes form a unique connection - create it
                float weight = random(-1, 1);

                connections.add(new Connection(in_node, out_node, weight, Innovation_Manager.get_Innovation(in_node, out_node)));
                break;

            }

        }

    }

    // Adds a random node to the network
    void add_Random_Node () {

        // Select a random connection and add a node
        int index = round(random(connections.size() - 1));

        add_Node(index);

    }

    // Mutates a random weight
    void mutate_Random_Weight () {

        // select a random connection
        int index = round(random(connections.size() - 1));

        connections.get(index).mutate_Weight();

    }

}