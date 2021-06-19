#include "Student.h"

Student::Student(string first, string last) : Person(first, last) {
	grade = -1;
	studentId = "S----------";
	numLates = 0;
}

Student::Student(string first, string last, int g, string id) : Person(first, last) {
	grade = g;
	numLates = 0;
	if (isValidId(id))
		studentId = id;
	else
		studentId = "Invalid ID";
}

Student::Student(string first, string last, string a, int g, string id) : Person(first, last, a) {
	grade = g;
	numLates = 0;
	if (isValidId(id))
		studentId = id;
	else
		studentId = "Invalid ID";
}

int Student::getGrade() {
	return grade;
}
string Student::getStudentId() {
	return studentId;
}
int Student::getNumLates() {
	return numLates;
}

void Student::setGrade(int g) {
	grade = g;
}
void Student::setStudentId(string id) {
	if (isValidId(id))
		studentId = id;
	else
		studentId = "Invalid ID";
}
void Student::addLate() {
	numLates ++;
}

string Student::toString() {
	return Person::toString() + ", Grade: " + to_string(grade) + ", Student Id: " + studentId + ", Lates: " + to_string(numLates);
}

bool Student::isValidId(string id) {
	//? student ID is valid if it starts with an 'S' and is followed by 9 digits
	if (id.length() != 10)
		return false; 

	if (id.at(0) != 'S')
		return false; 

	for (int i = 1; i < 10; i++) {
		
		if (!isdigit(id.at(i)))
			return false;

	}

	return true;
}