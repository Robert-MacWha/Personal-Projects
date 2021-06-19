#pragma once

#include "Card.h"

using namespace std;

class Deck
{
private:
	Card* cards;
	int currentCard = 0;

public:
	const int SIZE_OF_DECK = Card::FACE_COUNT * Card::SUIT_COUNT;

	Deck();
	~Deck();
	void shuffle();
	Card dealCard();
	bool moreCards();
};
