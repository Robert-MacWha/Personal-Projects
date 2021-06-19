#pragma once

#include "Flight.h"

/// @brief Contains information on multiple flights and allows the user to run commands that can affect flights, seats, and passengers
class Database
{
private:
	/// @brief Vector containing all flights
	vector <Flight> flights;

	/// @brief Selected flight from [flights]
	int selectedFlight;
	/// @brief Selected seat from selected flight's seats
	int selectedSeat;

	/// @brief Counter going up to assign new flights unique IDs
	int idCounter;

	/// @brief Print out help on all commands
	void printHelp();
	/// @brief Print out information on all flights.  Calls Flight.printInfo many times
	void printFlights();
	/// @brief Print out information on selected flight.  Calls Flight.printInfo
	void printFlight();
	/// @brief Prints out information on the selected seat
	void printSeat();
	/// @brief Prints out information on the passenger in the selected seat
	void printPassenger();

	/// @brief Create a new flight.  Requires 4 parameters: \n Departure \n Destination \n Number of seats \n Departure time
	void createFlight();
	/// @brief Delete a flight.  Will prompt the user to re-assign all passengers
	void deleteFlight();
	
	/// @brief Select a flight by its index.  Used for navigation
	void selectFlight();
	/// @brief Select a seat by its index.  Used for navigation
	void selectSeat();

	// setter commands
	void setDep();
	void setDest();
	void setDepTime();
	void addPassenger();
	void setPassenger();
	void removePassenger();

public:
	// constructor
	Database();

	void runCommand(string cmd);
};
