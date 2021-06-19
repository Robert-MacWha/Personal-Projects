#include "Seat.h"

Seat::Seat() {

	avalible = true;

}

Seat::Seat(Person p) {

	avalible = false;
	person = p;

}

void Seat::printInfo(int mode) {

	if (mode == 0 || avalible) {
		cout << (avalible ? "avalible" : "not avalible") << endl;
	}
	else {
		person.printInfo();
		cout << endl;
	}

}