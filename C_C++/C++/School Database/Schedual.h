#pragma once
#include <string>
#include <vector>
#include <iostream>

#include "Class.h"

class Schedual
{
	
private:
	int periods = 0;
	vector<vector<Class>> schedual;

public:
	Schedual();
	Schedual(int periods);
	
	// returns false if class is already there or if [p] > [periods]
	bool addClass(int p, Class c);
	Class* getClass(string id);
	void delClass(string id);

	string toString();


};