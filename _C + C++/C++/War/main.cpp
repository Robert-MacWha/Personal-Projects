#include <iostream>
#include <cstring>
#include <random>
#include <chrono>
#include <thread>

using namespace std;

string _suits[] = {
		"Spades",
		"Hearts",
		"Diamonds",
		"Clubs"
};

string _cards[] = {
		"Deuce",
		"Three",
		"Four",
		"Five",
		"Six",
		"Seven",
		"Eight",
		"Nine",
		"Ten",
		"Jack",
		"Queen",
		"King",
		"Ace"
};

string cardOrder[52];

int handSize = 4;

struct Pile {
	string pName = "Default";

	string cards[52];
	string discards[52];
	int cardCount    = 0;
	int discardCount = 0;

	void pushCard(string c) {
		cards[cardCount] = c;
		cardCount ++;
	}

	void pushCardToDiscard(string c) {
		discards[discardCount] = c;
		discardCount ++;
	}

	string popCard() {
		cardCount --;
		return cards[cardCount];
	}

	string popDiscard() {
		discardCount --;
		return discards[discardCount];
	}

	int getCardValue(int i) {
		string c = cards[i];

		// Find the index of c in the cardOrder array
		int j = 0;
		while(cardOrder[j] != c) {
			j ++;
		}

		return j;
	}

	void debugDeck() {
		cout << "Player: " + pName << endl;
		cout << "Cards:  " + to_string(cardCount) << endl;
		for (int i = 0; i < cardCount; i ++) {
			cout << cards[i] + " | ";
		}

		cout << endl;
	}

	void debugDiscard () {
		cout << "Player: " + pName << endl;
		cout << "Cards:  " + to_string(discardCount) << endl;
		for (int i = 0; i < discardCount; i ++) {
			cout << discards[i] + " | ";
		}

		cout << endl;
	}
};

void populateCardOrder() {
	int k = 0;
	for (int i = 0; i < 13; i ++) {
		for(int j = 0; j < 4; j ++) {
			cardOrder[k] = _cards[i] + " of " + _suits[j];
			k ++;
		}
	}
}

void shuffleDeck(string cards[], int degree, int maxRange=51) {

	std::random_device rd;                         // obtain a random number from hardware
	std::mt19937 gen(rd());                        // seed the generator with said random number
	std::uniform_int_distribution<int> distr(0, maxRange);  // define the range of the random generator

	for (int i = 0; i < degree; i ++) {
		int rA = distr(gen);
		int rB = distr(gen);

		string tempA = cards[rA];
		cards[rA] = cards[rB];
		cards[rB] = tempA;
	}
}

void selectHand (Pile &p, string hand[]) {
	for (int i = 0; i < handSize; i ++) {
		hand[i] = p.popCard();
	}
}

string selectHandOrder () {
	int selected = 0;
	string cardOrder;
	while(selected == 0) {
		selected = 1;
		cout << "Please select your hand's order: (ex: 1234)" << endl;

		// Store Response
		cin >> cardOrder;

		// Make sure the length of the response is valid
		if (cardOrder.length() != handSize)
			selected = 0;

		// Make sure that the response contains all the required strings
		for (int i = 0; i < handSize; i ++) {
			string recS = to_string(i+1); // Starts at because humans do

			if (cardOrder.find(recS) == std::string::npos) {
				selected = 0;
			}
		}
	}

	return cardOrder;
}

void swapHandOrder (string hand[], string order) {
	string newHand[handSize];

	for (int i = 0; i < handSize; i ++) {
		int j = order.at(i) - '1';
		newHand[i] = hand[j];
	}

	for (int i = 0; i < handSize; i ++) {
		hand[i] = newHand[i];
	}
}

int findCardIndex(string card) {
	for(int i = 0; i < 52; i ++) {
		if (cardOrder[i] == card) {
			return i;
		}
	}

	return 0;
}

void selectWinners (int winners[], string hand1[], string hand2[]) {

	// Loop over each item in the hands, find the value of each item, compare them, and select the winner
	for(int i = 0; i < handSize; i ++) {
		int h1Val = findCardIndex(hand1[i]);
		int h2Val = findCardIndex(hand2[i]);

		if (h1Val > h2Val) {
			winners[i] = 0;
		} else {
			winners[i] = 1;
		}
	}

}

bool playerHasEnoughCards (Pile &p) {
	if (p.cardCount < handSize) {

		if (p.discardCount + p.cardCount >= handSize) {
			cout << "Re-shuffling " + p.pName + "'s deck" << endl;

			// Move all the cards from the discard deck to the cards deck and shuffle the deck
			while (p.discardCount > 0) {
				p.pushCard(p.popDiscard());
			}

			shuffleDeck(p.cards, 50, p.cardCount-1);
		} else {

			return false;

		}

	}

	return true;
}

void singleplayerGame (Pile p1, Pile p2) {

	cout << "Please enter your name" << endl;
	cin >> p1.pName;

	bool speedMode = false;
	if (p1.pName == "Robert" || p1.pName == "Ocsa" || p1.pName == "Hudson" || p1.pName == "hudson") {
		cout << "Speed mode activated (press c to start)";
		string c;
		cin >> c;
		speedMode = true;
	}

	p2.pName = "Bob the Bot";

	bool gameEnded = false;
	int t = 0;
	while (!gameEnded) {
		t ++;
		cout << p1.pName + "'s turn #" + to_string(t) << endl;
		cout << " - Dealing hand..." << endl;
		cout << " - Hand:" << endl;

		// Get the player's hand
		string hand1[handSize];
		selectHand(p1, hand1);

		// Get the bot's hand
		string hand2[handSize];
		selectHand(p2, hand2);

		// Print out the player's hand
		for (int i = 0; i < handSize; i ++) {
			cout << "  - " + hand1[i] << endl;
		}

		if (p1.pName != "Robert" && p1.pName != "Ocsa" && p1.pName != "Hudson" && p1.pName != "hudson") {
			// Allow the player to select their hand's order
			string handOrder = selectHandOrder();

			// Swap the order of the hand to the specified order
			swapHandOrder(hand1, handOrder);
		}

		int winners[handSize];
		selectWinners(winners, hand1, hand2);

		// Print out scoreboard and re-distribute cards
		cout << "Processed battles:" << endl;
		for(int i = 0; i < handSize; i ++) {

			if (winners[i] == 0) {
				cout << " - " + hand1[i] + " > " + hand2[i] + " - " + p1.pName + " wins!" << endl;
				p1.pushCardToDiscard(hand1[i]);
				p1.pushCardToDiscard(hand2[i]);
			} else {
				cout << " - " + hand1[i] + " < " + hand2[i] + " - " + p2.pName + " wins!" << endl;
				p2.pushCardToDiscard(hand1[i]);
				p2.pushCardToDiscard(hand2[i]);
			}
		}

		cout << endl;
		cout << "Summary: " << endl;
		cout << " - " + p1.pName + "'s status: " + to_string(p1.cardCount) + " cards | " + to_string(p1.discardCount) + " discarded cards" << endl;
		cout << " - " + p2.pName + "'s status: " + to_string(p2.cardCount) + " cards | " + to_string(p2.discardCount) + " discarded cards" << endl;

		// See if either player needs more cards
		bool p1Lost = !playerHasEnoughCards(p1);
		bool p2Lost = !playerHasEnoughCards(p2);

		if (p1Lost) {
			cout << p1.pName + " lost on round " + to_string(t) << endl;
			gameEnded = true;
		} else if (p2Lost) {
			cout << p2.pName + " lost on round " + to_string(t) << endl;
			gameEnded = true;
		}

		if (speedMode) {
			using namespace std::this_thread; // sleep_for, sleep_until
			using namespace std::chrono; // nanoseconds, system_clock, seconds

			sleep_for(nanoseconds(100000000));
		}
	}

}

void multiplayerGame (Pile p1, Pile p2) {

	std::random_device rd;                         // obtain a random number from hardware
	std::mt19937 gen(rd());                        // seed the generator with said random number
	std::uniform_int_distribution<int> distrEvent(0, 4);  // define the range of the random generator
	std::uniform_int_distribution<int> distrResult(2, 6);  // define the range of the random generator

	cout << "Player one, please enter your name" << endl;
	cin >> p1.pName;
	cout << "Player two, please enter your name" << endl;
	cin >> p2.pName;

	bool gameEnded = false;
	int t = 0;
	string temp;
	while (!gameEnded) {
		t ++;
		cout << p1.pName + "'s turn #" + to_string(t) << endl;
		cout << " - Dealing hand... make sure " + p2.pName + " is looking away (type c to continue)" << endl;
		cin >> temp;
		cout << " - Hand:" << endl;

		// Get the player's hand
		string hand1[handSize];
		selectHand(p1, hand1);

		// Print out the player's hand
		for (int i = 0; i < handSize; i ++) {
			cout << "  - " + hand1[i] << endl;
		}

		// Allow the player to select their hand's order
		string handOrder = selectHandOrder();

		// Swap the order of the hand to the specified order
				swapHandOrder(hand1, handOrder);

		cout << p2.pName + "'s turn now, please make sure that " + p1.pName + " isn't peeking! (type c to continue)" << endl;
		cin >> temp;
		cout << " - Hand:" << endl;

		// Get the player's hand
		string hand2[handSize];
		selectHand(p2, hand2);

		// Print out the player's hand
		for (int i = 0; i < handSize; i ++) {
			cout << "  - " + hand2[i] << endl;
		}

		// Allow the player to select their hand's order
		handOrder = selectHandOrder();

		// Swap the order of the hand to the specified order
		swapHandOrder(hand2, handOrder);

		int winners[handSize];
		selectWinners(winners, hand1, hand2);

		// Print out scoreboard and re-distribute cards
		cout << "Processed battles:" << endl;
		for(int i = 0; i < handSize; i ++) {

			if (winners[i] == 0) {
				cout << " - " + hand1[i] + " > " + hand2[i] + " - " + p1.pName + " wins!" << endl;
				p1.pushCardToDiscard(hand1[i]);
				p1.pushCardToDiscard(hand2[i]);
			} else {
				cout << " - " + hand1[i] + " < " + hand2[i] + " - " + p2.pName + " wins!" << endl;
				p2.pushCardToDiscard(hand1[i]);
				p2.pushCardToDiscard(hand2[i]);
			}
		}

		cout << endl;
		cout << "Summary: " << endl;
		cout << " - " + p1.pName + "'s status: " + to_string(p1.cardCount) + " cards | " + to_string(p1.discardCount) + " discarded cards" << endl;
		cout << " - " + p2.pName + "'s status: " + to_string(p2.cardCount) + " cards | " + to_string(p2.discardCount) + " discarded cards" << endl;

		int cardDiff = abs((p1.cardCount + p1.discardCount) - (p2.cardCount + p2.discardCount));
		if (cardDiff < handSize + 1) {
			cout << "   - Things are looking pretty even" << endl;
		} else if (cardDiff == 7) {
			cout << "   - Luck difference 7!" << endl;
		} else if (cardDiff == 42) {
			cout << "   - It's the meaning of life!" << endl;
		} else if (cardDiff == 52) {
			cout << "   - How'd you manage to loose that badly?" << endl;
		}

		int randEvent = distrEvent(gen);
		if (randEvent == 2) {
			cout << "   - EVENT!!! Changing hand size" << endl;
			int newHandSize = distrResult(gen);
			if (newHandSize == handSize) {
				handSize = newHandSize + 1;
			} else {
				handSize = newHandSize;
			}
		}

		cout << endl;

		// See if either player needs more cards
		bool p1Lost = !playerHasEnoughCards(p1);
		bool p2Lost = !playerHasEnoughCards(p2);

		if (p1Lost) {
			cout << p1.pName + " lost on round " + to_string(t) << endl;
			gameEnded = true;
		} else if (p2Lost) {
			cout << p2.pName + " lost on round " + to_string(t) << endl;
			gameEnded = true;
		}
	}
}

void Game () {
	Pile playerOne;
	Pile playerTwo;

	// Creates a copy of the cardOrder array
	string deck[52];
	for (int i = 0; i < 52; i ++) { deck[i] = cardOrder[i]; }

	// Shuffle the deck
	shuffleDeck(deck, 50);

	// Distribute the cards to the players
	for (int i = 0; i < 52; i += 2) {
		playerOne.pushCard(deck[i + 0]);
		playerTwo.pushCard(deck[i + 1]);
	}
	// Start the main game loop
	cout << "Welcome to WAR" << endl;

	// Makes sure that the player responds yes or no
	int gameMode = 0;
	while (gameMode == 0) {
		cout << "Do you want to play against an AI? (y/n)" << endl;
		string r;
		cin >> r;

		if (r == "y") {
			cout << "SinglePlayer mode selected" << endl;
			gameMode = 1;
		} else if (r == "n") {
			cout << "MultiPlayer mode selected" << endl;
			gameMode = 2;
		}
	}

	if (gameMode == 1)
		singleplayerGame(playerOne, playerTwo);
	else if (gameMode == 2)
		multiplayerGame(playerOne, playerTwo);
}

int main() {
	populateCardOrder();

	bool playing = true;
	while (playing) {
		Game();

		int selection = 0;

		// Makes sure that the player responds yes or no
		while (selection == 0) {
			cout << "Do you want to play again? (y/n)" << endl;

			string r;
			cin >> r;
			if (r == "y") {
				selection = 1;
				playing = true;
			} else if (r == "n") {
				selection = 2;
				playing = false;
			}
		}
	}
}
