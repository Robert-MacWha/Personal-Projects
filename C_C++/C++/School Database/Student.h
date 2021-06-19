#pragma once
#include "Person.h"

class Student : public Person
{

private:
	int grade;
	string studentId;
	int numLates;

	bool isValidId(string id);

public:
	Student(string first, string last);
	Student(string f, string l, int g, string id);
	Student(string f, string l, string a, int g, string id);

	int getGrade();
	string getStudentId();
	int getNumLates();

	void setGrade(int g);
	void setStudentId(string id);
	void addLate();

	string toString();

};