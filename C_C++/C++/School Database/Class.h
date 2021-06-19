#pragma once
#include <string>
#include <vector>
#include <iostream>

#include "Teacher.h"
#include "Student.h"

using namespace std;

class Class
{
private:
	string name;
	string classId;
	Teacher* teacher;
	vector<Student*> students;

	int studentCount;

	bool hasStudent(string id);

public:
	Class(string id);
	Class(string id, string n);
	Class(string id, string n, Teacher* t);
	
	void setId(string id);
	void setTeacher(Teacher* teacher);
	void addStudent(Student* s);
	void removeStudent(string id);
	
	string getId();
	Teacher* getTeacher();
	Student* getStudent(string id);

	string toString();

};