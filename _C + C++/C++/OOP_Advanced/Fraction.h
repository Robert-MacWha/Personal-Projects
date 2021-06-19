#pragma once

using namespace std;

class Fraction
{
private:
	int num, den;
	static int numOfFractions;

public:
	Fraction();
	Fraction(int, int);
	Fraction(Fraction&);

	int getNumerator();
	int getDenominator();
	void setNumerator(int);
	void setDenominator(int);

	string toString();

	void add(Fraction&);
	void subtract(Fraction&);
	void multiply(Fraction&);
	void divide(Fraction&);

	static Fraction& add(Fraction&, Fraction&);
	static Fraction& subtract(Fraction&, Fraction&);
	static Fraction& multiply(Fraction&, Fraction&);
	static Fraction& divide(Fraction&, Fraction&);

};