class Node {

    int id;

    float buffer_value;
    float value;

    // Used when rendering the network graph
    public PVector pos;

    Node (int id) {

        this.id = id;
        this.value = 0;
        this.buffer_value = 0;

        this.pos = new PVector(50, 100);

    }

    Node (int id, PVector pos) {

        this.id = id;
        this.value = 0;
        this.buffer_value = 0;

        this.pos = pos;

    }

    public Node copy () {

        return new Node(id, pos);

    }
}