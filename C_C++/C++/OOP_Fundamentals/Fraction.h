#pragma once

using namespace std;

class Fraction
{
private:
	int num, den;

public:
	Fraction();
	Fraction(int, int);

	int getNum();
	int getDen();
	double getFrac();

	void setNum(int);
	void setDen(int);

	string toString();

};