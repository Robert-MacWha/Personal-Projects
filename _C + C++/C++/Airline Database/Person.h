#pragma once

#include <string>
#include <iostream>
#include <vector>

using namespace std;

/// @brief Contains information relation to a passenger including name and contact info
class Person
{
private:
	/// @brief The person's first name
	string fName;
	/// @brief The person's last name
	string lName;
	/// @brief The person's address
	string address;
	/// @brief The person's phone number
	string phoneNum;

public:
	/// @brief Default constructor
	Person();
	/// @brief Paramaterized constructor
	/// @param fN : first name
	/// @param lN : last name
	/// @param add : address
	/// @param num : phone number
	Person(string fN, string lN, string add, string num);

	/// @brief Get the person's first name
	string getFName()    { return fName; }
	/// @brief Get the person's last name
	string getLName()    { return lName; }
	/// @brief Get the person's address
	string getAddress()  { return address; }
	/// @brief Get the person's phone number
	string getPhoneNum() { return phoneNum; }

	/// @brief Set the person's first name
	void setFName(string fN)     { fName = fN; }
	/// @brief Set the person's last name
	void setLName(string lN)     { lName = lN; }
	/// @brief Set the person's address
	void setAddress(string add)  { address = add; }
	/// @brief Set the person's phone number
	void setPhoneNum(string num) { phoneNum = num; }

	/// @brief Print info on the person.  Structure: First name, Last name : address : phone number
	void printInfo();
};
