#include "Teacher.h"

Teacher::Teacher(string first, string last) : Person(first, last) {
	teachables = "NULL";
	employeeId = "Invalid ID";
}

Teacher::Teacher(string first, string last, string t, string id) : Person(first, last) {

	teachables = t;
	if (isValidId(id))
		employeeId = id;
	else
		employeeId = "Invalid ID";
}

Teacher::Teacher(string first, string last, string a, string t, string id) : Person(first, last, a){

	teachables = t;
	if (isValidId(id))
		employeeId = id;
	else
		employeeId = "Invalid ID";
}

string Teacher::getTeachables() {
	return teachables;
}
string Teacher::getEmployeeId() {
	return employeeId;
}

void Teacher::setTeachables(string t) {
	teachables = t;
}
void Teacher::setEmployeeId(string id) {
	if (isValidId(id))
		employeeId = id;
	else
		employeeId = "Invalid ID";
}

void Teacher::markStudentLate(Student* s) {
	s->addLate();
}

string Teacher::toString() {

	return Person::toString() + ", Teachables: " + teachables + ", Employee Id: " + employeeId;

}

bool Teacher::isValidId(string id) {
	//? teacher ID is valid if it starts with an 'C' and is followed by 5 digits
	if (id.length() != 6)
		return false;

	if (id.at(0) != 'C')
		return false;

	for (int i = 1; i < 6; i++) {

		if (!isdigit(id.at(i))) {
			return false;
		}

	}

	return true;
}