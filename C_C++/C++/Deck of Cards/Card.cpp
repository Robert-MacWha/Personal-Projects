#include "Card.h"

Card::Card(){

	face = 0;
	suit = 0;

}

Card::Card(int f, int s) {

	face = f;
	suit = s;

}

Card::Card(const Card& other) {

	face = other.face;
	suit = other.suit;

}

Card& Card::operator=(const Card& other) {
	
	face = other.face;
	suit = other.suit;

	return *this;

}

ostream& operator<<(std::ostream& out, Card& card) {
	out << card.GetFaceName() << " of " << card.GetSuitName() << "s";
	return out;
}

int Card::GetFace() {
	return face;
}

int Card::GetSuit() {
	return suit;
}

string Card::GetFaceName() {
	return faces[face];
}

string Card::GetSuitName() {
	return suits[suit];
}

void Card::SetFace(int f) {
	face = f;
}

void Card::SetSuit(int s) {
	suit = s;
}
