#include "Flight.h"

// constructors
Flight::Flight(int id, int nS) {

	flightID = id;
	numSeats = nS;
	numFullSeats = 0;

	departure = "__UNDEFINED__";
	destination = "__UNDEFINED__";

	departureTime = -1;

	seats = new Seat[numSeats];

}

Flight::Flight(int id, int nS, string dep, string dest, string depTime) {

	flightID = id;
	numSeats = nS;
	numFullSeats = 0;

	departure = dep;
	destination = dest;

	departureTime = depTime;

	seats = new Seat[numSeats];

}

// helper functions
void Flight::printInfo(int dMode, int sMode) {

	// sort the array
	Seat* sorted;

	if (sMode == 0) {
		sorted = sortNumeric();
	}
	else {
		sorted = sortAlphabetic();
	}

	if (dMode == 2) { // print out everything

		cout << ">> " << departure << " : " << destination << ", " << departureTime << endl;

		for (int i = 0; i < numFullSeats; i++) {
			cout << sorted[i].getIndex() << ". ";
			sorted[i].printInfo(1);
		}

	}
	else if (dMode == 1) { // print out basic seat info

		cout << ">> Flight " << flightID << ", " << departure << " : " << destination << ", " << departureTime << endl;

		for (int i = 0; i < numFullSeats; i++) {
			cout << sorted[i].getIndex() << ". ";
			sorted[i].printInfo(0);
		}

	}
	else { // print out only plane info

		cout << ">> Flight " << flightID << ", " << departure << " : " << destination << ", " << departureTime << endl;

	}

	delete[] sorted;

}

// helper function
Seat* Flight::sortNumeric() {

	int fullCount = 0;
	for (int i = 0; i < numSeats; i++) {
		if (seats[i].getAvalible() == false) {
			fullCount++;
		}
	}

	Seat* full = new Seat[fullCount];
	fullCount = 0;

	for (int i = 0; i < numSeats; i++) {
		if (seats[i].getAvalible() == false) {
			full[fullCount] = seats[i];
			full[fullCount].setIndex(i);
			fullCount ++;
		}
	}

	return full;

}

Seat* Flight::sortAlphabetic() {

	Seat* full = sortNumeric();

	// selection sort the array
	for (int i = 0; i < numFullSeats; i++) {

		int highest = i;

		for (int j = i+1; j < numFullSeats; j++) {

			if (full[highest].getPerson().getFName() > full[j].getPerson().getFName()) {
				highest = j;
			}

		}

		// swap the two
		Seat temp = full[highest];
		full[highest] = full[i];
		full[i] = temp;

	}

	return full;

}