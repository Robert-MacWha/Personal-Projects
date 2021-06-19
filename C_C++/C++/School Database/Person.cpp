
#include "Person.h"

Person::Person() {
	firstName = "NULL";
	lastName = "NULL";
	address = "NULL ISLAND";
}

Person::Person(string first, string last) {

	firstName = first;
	lastName = last;
	address = "NULL ISLAND";

}

Person::Person(string first, string last, string add) {

	firstName = first;
	lastName = last;
	address = add;

}

string Person::getFirstName() {
	return firstName;
}
string Person::getLastName() {
	return lastName;
}
string Person::getAddress() {
	return address;
}

void Person::setFirstName(string first) {
	firstName = first;
}
void Person::setLastName(string last) {
	lastName = last;
}
void Person::setAddress(string add) {
	address = add;
}

string Person::toString() {

	return "Name: " + firstName + " " + lastName + ", Address: " + address;
}