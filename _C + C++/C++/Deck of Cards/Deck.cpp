#include <vector>

#include "Deck.h"
#include "Card.h"
using namespace std;


Deck::Deck() {

	cards = new Card[Card::FACE_COUNT * Card::SUIT_COUNT];
	// loop over each face & suit

	int i = 0;
	for (int f = 0; f < Card::FACE_COUNT; f++) {
		for (int s = 0; s < Card::SUIT_COUNT; s++) {

			cards[i] = Card(f, s);
			
			i++;

		}
	}

	currentCard = SIZE_OF_DECK - 1;
}

Deck::~Deck() {

	delete[] cards;

}

void Deck::shuffle() {

	srand(time(NULL));

	// only shuffle if there is more than 1 card (can't otherwise)
	if (currentCard <= 1)
		return;

	// loop over each card
	for (int i = 0; i < currentCard; i++) {

		// swap it with a random other card
		int o = rand() % currentCard;
		while (o == i)
			o = rand() % currentCard;

		swap(cards[i], cards[o]);

	}

}

Card Deck::dealCard() {

	// get the top card
	Card to_return = cards[currentCard];
	currentCard--;

	return to_return;

}

bool Deck::moreCards() {

	return (currentCard >= 0);

}
