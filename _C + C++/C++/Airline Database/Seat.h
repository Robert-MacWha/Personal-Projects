#pragma once

#include "Person.h"

/// @brief Contains information on a seat and functionality relating to setting passengers
class Seat
{
private:
	/// @brief Whether the seat is avalible or not
	bool avalible;
	/// @brief Person object
	Person person;

	/// @brief Index of the seat - used when displaying avalible seats so that correct index is shown
	int index;

public:
	/// @brief Default constructor
	Seat();
	/// @brief Paramaterized construction
	/// @param p : person object
	Seat(Person p);

	/// @brief Get whether the seat is avalible
	bool getAvalible() { return avalible; }
	/// @brief Get the person in the seat
	Person getPerson() { return person; }
	/// @brief Get index of the seat
	int getIndex()     { return index; }

	/// @brief Set the person in the seat
	void setPerson(Person p) { person = p; avalible = false; }
	/// @brief Remove the person currently in the seat
	void removePerson()      { avalible = true; }
	/// @brief Set the index of the seat
	void setIndex(int i)     { index = i; }

	/// @brief Prints out the seat's information.  Recurses down to Person.printInfo when applicable
	/// @param mode : determins how much information is printed. \n A mode of 0 prints out the avalibility of the seat. \n A mode of 1 prints out the person within the seat, if applicable
	void printInfo(int mode);
};