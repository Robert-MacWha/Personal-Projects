#include <iostream>
#include<windows.h>

#include "Deck.h"

using namespace std;

int main() {
	
	// create the deck
	Deck deck;

	// shuffle the deck
	deck.shuffle();

	// deal the deck

	cout << "Dealing a deck:" << endl << "---------------------" << endl;

	int i = 0;
	while (deck.moreCards()) {

		Card c = deck.dealCard();
		cout << c << endl;

		Sleep(20);
		i++;

	}

	cout << "---------------------" << endl << "Dealt " << i << " cards" << endl;

}
