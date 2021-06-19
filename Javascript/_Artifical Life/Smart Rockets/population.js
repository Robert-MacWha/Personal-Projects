class Population {
    constructor (popSize) {
        this.rockets = [];
        this.popSize = popSize;
        this.matingPool = [];
        //Populate the rockets array with popSize rockets
        for(let i = 0; i < this.popSize; i ++) {
            this.rockets.push(new Rocket());
        }
    }

    evaluate () {
        this.matingPool = [];
        //Loop through each rocket and calculate the fitness
        let maxFit = 0;
        for (let i = 0; i < this.popSize; i ++) {
            this.rockets[i].calcFitness();
            //Also find the highest fitness so you can normalise them
            if (this.rockets[i].fit > maxFit) {
                maxFit = this.rockets[i].fit;
                this.bestRocket = this.rockets[i];
            }
        }
        //Normalise the fitnesses of the rockets
        for (let i = 0; i < this.popSize; i ++) {
            this.rockets[i].fit /= maxFit;
        }
        //Then loop through them and add them to the mating pool according to their fitness
        for (let i = 0; i < this.popSize; i ++) {
            let n = this.rockets[i].fit * 100;
            for(let j = 0; j < n; j ++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
        //Get the average fitness of the generation
        let avgD = 0;
        let bD = 1000;
        let avgT = 0;
        let bT = 1000;
        let rc = 0;
        for (let i = 0; i < this.popSize; i ++) {
            avgD += this.rockets[i].d;
            if (this.rockets[i].completed) {
                avgT += this.rockets[i].time;
                rc++;
            }
            if (this.rockets[i].d < bD) {
                bD = this.rockets[i].d;
            }
            if (this.rockets[i].time < bT && this.rockets[i].completed) {
                bT = this.rockets[i].time;
            }
        }
        avgD /= this.popSize;
        averageD = avgD;
        bestD = bD;
        avgT /= rc;
        averageT = avgT;
        if (bT == 1000) {bT /= rc;}
        bestT = bT;
    }

    selection (chance) {
        let newRockets = [];
        for (let i = 0; i < this.popSize-1; i ++) {
            //Get the new parents
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;
            let child = parentA.crossover(parentB);
            child.mutate(chance);
            newRockets[i] = new Rocket(child);
        }
      
      this.bestRocket = new Rocket(this.bestRocket.dna);
      newRockets.push(this.bestRocket);
        this.rockets = newRockets;
    }

    run () {
        count++;
        for(let i = 0; i < this.popSize; i ++) {
            this.rockets[i].update();
        }
    }

    show () {
        for(let i = 0; i < this.popSize; i ++) {
            this.rockets[i].show();
        }
    }
}