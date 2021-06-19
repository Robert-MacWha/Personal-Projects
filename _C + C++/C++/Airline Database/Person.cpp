#include "Person.h"

Person::Person() {

	fName = "__UNDEFINED__";
	lName = "__UNDEFINED__";
	address = "__UNDEFINED__";
	phoneNum = "__UNDEFINED__";

}

Person::Person(string fN, string lN, string add, string num) {

	fName = fN;
	lName = lN;
	address = add;
	phoneNum = num;

}

void Person::printInfo() {

	cout << fName << ", " << lName<< " : " << address << " : " << phoneNum;

}