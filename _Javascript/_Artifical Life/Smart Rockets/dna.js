class DNA {
    constructor (genes) {
        //If a genes array is provided use it otherwise make a random list
        if (genes) {
            this.genes = genes;
        }
        else {
            this.genes = [];
            for(let i = 0; i < lifeSpan; i ++) {
                this.genes[i] = p5.Vector.random2D(); 
                this.genes[i].setMag(maxForce);
            }
        }
    }

    crossover (partner) {
        let newGenes = [];
        //Find a midpoint between the two parents
        let midpoint = floor(random(this.genes.length));
        //And give the child the dna from parent 1 before reaching the midpoint and the dna from parent 2       after th midpoint
        for(let i = 0; i < this.genes.length; i ++) {
            if (i > midpoint) {
                newGenes[i] = this.genes[i];
            }
            else {
                newGenes[i] = partner.genes[i];
            }
        }
        //Return the new DNA
        return new DNA(newGenes);
    }

    mutate (chance) {
        //Loop through each gene and randomly mutate them
        for(let i = 0; i < this.genes.length; i ++) {
            if (random(10) < chance) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxForce);
            }
        }
    }
}