#pragma once
#include <string>
#include <ctype.h>
#include <iostream>

using namespace std;

class Person
{

private:
	string firstName;
	string lastName;
	string address;

public:
	Person();
	Person(string first, string last);
	Person(string first, string last, string add);

	string getFirstName();
	string getLastName();
	string getAddress();

	void setFirstName(string first);
	void setLastName(string last);
	void setAddress(string address);

	string toString();

	virtual bool isValidId(string id) = 0;

};