#pragma once

#include "Seat.h";

/// @brief Contains information on a flight and functions relating to updatings its passengers
class Flight
{
private:
	/// @brief Unique ID of the flight
	int flightID;

	/// @brief Starting location of the flight
	string departure;
	/// @brief Destination of the flight
	string destination;

	/// @brief Departure time of the flight.
	string departureTime;

	/// @brief Number of seats in the plane
	int numSeats;
	/// @brief Number of filled seats in the plane.  Number of passengers
	int numFullSeats;
	/// @brief Array containing all [numSeats] seats
	Seat* seats;

	/// @brief Sorts the seats numerically
	/// @return A dynamically generated array containing all filled seats
	Seat* sortNumeric();
	/// @brief Sorts the seats by the passenger's first name
	/// @return A dynamically generated array containing all filled seats
	Seat* sortAlphabetic();

public:
	/// @brief Default constructor
	/// @param id : flightID
	/// @param nS : numSeats
	Flight(int id, int nS);
	/// @brief Paramaterized constructor
	/// @param id : flightID
	/// @param nS : numSeats
	/// @param dep : departure
	/// @param dest : destination
	/// @param depTime : departureTime
	Flight(int id, int nS, string dep, string dest, string depTime);

	/// @brief Get flight departure
	string getDeparture()     { return departure; };
	/// @brief Get flight destination
	string getDestination()   { return destination;  };
	/// @brief Get flight departure time
	string getDepartureTime() { return departureTime; };
	/// @brief Get number of seats on the flight
	int getNumSeats()         { return numSeats; };
	/// @brief get the number of filled seats on the flight 
	int getNumFullSeats()     { return numFullSeats; }
	/// @brief Get a pointer to the seats on the flight
	Seat* getSeat(int i)      { return &seats[i]; };
	/// @brief Get flight id
	int getId()               { return flightID; }

	// setters
	/// @brief Set fight departure
	void setDeparture(string dep)       { departure = dep; };
	/// @brief Set fight destination
	void setDestination(string dest)    { destination = dest; };
	/// @brief Set fight departure time
	void setDepartureTime(string dTime) { departureTime = dTime; };
	/// @brief Adds a passenger to a specific seat
	void addPassenger(int i, Person p)  { seats[i].setPerson(p); numFullSeats++; }
	/// @brief Removes a passenger from a specific seat
	void removePassenger(int i)         { seats[i].removePerson(); numFullSeats --; }

	// no setter for numSeats because that can't change IRL.
	// no setter for Id because it has no reason to change. It's just a unique identifier for the code to manage

	/// @brief Prints out flight information.  Recurses to Seat.printInfo when applicable.
	/// @param dMode : determins how much information is printed. \n A mode of 0 prints only flight-specific info. \n A mode of 1 prints out flight info and seat avalibility. \n A mode of 2 prints out flight info and all passengers
	/// @param sMode : determins how passengers are sorted when displayed. \n A mode of 0 sorts them numerically. \n A mode of 1 sorts them alphabetically.
	void printInfo(int dMode, int sMode);
};

