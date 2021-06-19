#pragma once

#include <iostream>

#include "Person.h"
#include "Student.h"

class Teacher : public Person
{
private:
	string teachables;
	string employeeId;

	bool isValidId(string id);

public:
	Teacher(string first, string last);
	Teacher(string first, string last, string t, string id);
	Teacher(string first, string last, string a, string t, string id);

	string getTeachables();
	string getEmployeeId();

	void setTeachables(string t);
	void setEmployeeId(string id);

	void markStudentLate(Student* s);
	string toString();

};