#pragma once

#include <string>
#include <iostream>

using namespace std;

class Card
{
private:
	int face;
	int suit;

	const string faces[14] = {
		"ace",
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
		"ten",
		"jack",
		"queen",
		"king"
	};

	const string suits[4] = {
		"club",
		"diamond",
		"heart",
		"spade"
	};

public:
	static const int FACE_COUNT = 14;
	static const int SUIT_COUNT = 4;

	Card();
	Card(int, int);
	Card(const Card&);
	Card& operator=(const Card& other);
	friend ostream& operator << (ostream&, Card&);

	int GetFace();
	int GetSuit();
	string GetFaceName();
	string GetSuitName();

	void SetFace(int);
	void SetSuit(int);

};
