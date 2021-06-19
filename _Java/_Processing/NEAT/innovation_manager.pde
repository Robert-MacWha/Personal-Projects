static class Innovation_Manager {

    public static ArrayList<PVector> history = new ArrayList<PVector>();

    public static int get_Innovation (int in, int out) {
        
        PVector gene = new PVector(in, out);
        if (history.contains(gene)) {

            return history.indexOf(gene);

        } else {

            // Add the gene to the history list and return the length of the list
            history.add(gene);
            return history.size() - 1;

        }

    }

}