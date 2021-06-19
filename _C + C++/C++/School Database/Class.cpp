#include "Class.h"

Class::Class(string id) {
	
	classId = id;

	name = "__undefined__";
	teacher = NULL;

	studentCount = 0;

}
Class::Class(string id, string n) {

	classId = id;

	name = n;
	teacher = NULL;

	studentCount = 0;

}
Class::Class(string id, string n, Teacher* t) {

	classId = id;

	name = n;
	teacher = t;

	studentCount = 0;

}

void Class::setId(string id) {
	classId = id;
}
void Class::setTeacher(Teacher* t) {
	teacher = t;
}
void Class::addStudent(Student* s) {

	if (!hasStudent(s->getStudentId())) // only add the student if it's not already in the class
		students.push_back(s);

}
void Class::removeStudent(string id) {

	// find the index of the student and delete it
	for (int i = 0; i < students.size(); i++) {

		if (students[i]->getStudentId() == id) {
			students.erase(students.begin() + i);
		}

	}

}

string Class::getId() {
	return classId;
}
Teacher* Class::getTeacher() {
	return teacher;
}
Student* Class::getStudent(string id) {

	for (int i = 0; i < students.size(); i++) {

		if (students[i]->getStudentId() == id)
			return students[i];

	}

	return NULL;

}

string Class::toString() {

	string output = "Name: " + name + "\nId: " + classId + "\n";

	if (teacher != NULL) {
		output += "Teacher:\n";
		output += teacher->toString() + "\n";
	}

	output += "Students:\n";

	if (students.size() > 0) {
		for (int i = 0; i < students.size(); i++) {

			output += students[i]->toString();
			output += "\n";

		}
	}

	return output;

}

bool Class::hasStudent(string id) {

	for (int i = 0; i < students.size(); i ++) {
		
		if (students[i]->getStudentId() == id)
			return true;

	}

	return false;

}