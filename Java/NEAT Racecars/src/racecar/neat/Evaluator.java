package racecar.neat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

public class Evaluator {
		// Receive genomes and their related scores as input
	public static ArrayList<Genome> evaluate (ArrayList<Genome> genomes, ArrayList<Float> scores, float mutationChance) {
		// Sort the genomes by the scores
		HashMap<Float, Genome> sortedG = sort(genomes, scores);
		
		// Save the best two genomes 
		Genome best1 = ((Genome) sortedG.get(sortedG.keySet().toArray()[0])).getDeepCopy();
		Genome best2 = ((Genome) sortedG.get(sortedG.keySet().toArray()[1])).getDeepCopy();
		
		// Delete half of the genomes plus two
		ArrayList<Genome> purged = purgeGenomes(sortedG);
		
		// Breed all remaining genomes to produce a new generation, add in the two saved genomes twice each
		ArrayList<Genome> newGeneration = breedGenomes(purged, mutationChance);
		newGeneration.add(best1);
		newGeneration.add(best1);
		newGeneration.add(best2);
		newGeneration.add(best2);
	
		// Return the population
		return newGeneration;
	}
	
	public static HashMap<Float, Genome> sort (ArrayList<Genome> genomes, ArrayList<Float> scores) {
		// Initialize the output hash
		HashMap<Float, Genome> output = new HashMap<Float, Genome>();
		
		// Loop over each input genome
		for(int i = 0; i < genomes.size(); i ++) {
			// See if the output contains a value that equals the current key
			genomes.get(i).setFitness(scores.get(i));
			while(output.containsKey(scores.get(i))) {
				// It does, change the score slightly
				scores.set(i, scores.get(i)-0.01f);
			}
			
			// I know that I will not over right any of the outputs
			output.put(scores.get(i), genomes.get(i));
		}
		
		// Return the hashmap
		return output;
	}

	public static ArrayList<Genome> purgeGenomes (HashMap<Float, Genome> genomes) {
		Collection<Genome> values = genomes.values(); 
		ArrayList<Genome> output = new ArrayList<Genome>(values);
		
		// Delete the worst half of the genomes plus two
		for(int i = 0; i < (output.size()/2) + 2; i ++) {
			output.remove(i);
		}
		
		return output;
	}

	public static ArrayList<Genome> breedGenomes (ArrayList<Genome> genomes, float mutationChance) {
		ArrayList<Genome> output = new ArrayList<Genome>();
		
		// While there are still genomes
		int i; Genome g1, g2, child;
		while(genomes.size() != 0) {
			// Select two random genomes
			i = (int) (Math.random() * genomes.size());
			g1 = genomes.get(i).getDeepCopy();
			genomes.remove(i);
			
			i = (int) (Math.random() * genomes.size());
			g2 = genomes.get(i).getDeepCopy();
			genomes.remove(i);
			
			// Breed the two genomes four times, randomly mutate each offspring
			for(int j = 0; j < 4; j ++) {
				// Crossover the child
				if (g1.getFitness() > g2.getFitness()) {
					child = g1.crossover(g1, g2);
				} else {
					child = g1.crossover(g2, g1);
				}
				
				// Mutate the child
				child.mutateWeights();
				child.mutateBias();
				if (Math.random() < mutationChance) {
					child.addConnectionMutation();
				}
				if (Math.random() < mutationChance) {
					child.addNodeMutation();
				}
				if (Math.random() < mutationChance) {
					child.mutateBiasInput();
				}
				
				// Add the child to the new generation
				output.add(child.getDeepCopy());
			}
		}
		
		return output;
	}
}
