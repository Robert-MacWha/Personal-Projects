#include <sstream>
#include "Fraction.h"

using namespace std;

/* Equation for lcm from https://www.geeksforgeeks.org/program-to-find-lcm-of-two-numbers/ */
// Recursive function to return gcd of a and b
int GCD(int a, int b)
{
	if (b == 0)
		return a;
	return GCD(b, a % b);
}

// Function to return LCM of two numbers
int LCM(int a, int b)
{
	return (a / GCD(a, b)) * b;
}

int Fraction::numOfFractions = 0;

Fraction::Fraction() {

	num = 0;
	den = 0;
	numOfFractions++;

}

Fraction::Fraction(int n, int d) {

	num = n;
	den = d;
	numOfFractions++;

}

Fraction::Fraction(Fraction& f) {

	num = f.getNumerator();
	den = f.getDenominator();
	numOfFractions++;

}

int Fraction::getNumerator() { return num; }
int Fraction::getDenominator() { return den; }

void Fraction::setNumerator(int n) { num = n; }
void Fraction::setDenominator(int d) { den = d; }

string Fraction::toString() {

	stringstream ss;

	ss << num;
	ss << "/";
	ss << den;

	return ss.str();

}

void Fraction::add(Fraction& f) {

	// find the lcm for the denominators
	int lcm = LCM(den, f.den);

	// update both numerators
	num = num * (lcm / den);
	f.num = f.num * (lcm / f.den);

	// add the two numberators together
	int new_num = num + f.num;

	// update the fraction
	num = new_num;
	den = lcm;

}

void Fraction::subtract(Fraction& f) {

	// find the lcm for the denominators
	int lcm = LCM(den, f.den);

	// update both numerators
	num = num * (lcm / den);
	f.num = f.num * (lcm / f.den);

	// subtract the numerators from each other
	int new_num = num - f.num;

	// update the fraction
	num = new_num;
	den = lcm;

}

void Fraction::multiply(Fraction& f) {

	// multiply both the numerators and the denominators
	num *= f.num;
	den *= f.den;

}

void Fraction::divide(Fraction& f) {

	// multiply this fraction by f's inverse
	num *= f.den;
	den *= f.num;

}

Fraction& Fraction::add(Fraction& f, Fraction& g) {

	// create a copy of f and add g
	static Fraction new_fraction(f);
	new_fraction.add(g);

	return new_fraction;

}

Fraction& Fraction::subtract(Fraction& f, Fraction& g) {

	// create a copy of f subtract g
	static Fraction new_fraction(f);
	new_fraction.subtract(g);

	return new_fraction;

}

Fraction& Fraction::multiply(Fraction& f, Fraction& g) {

	// create a copy of f and multiply it by g
	static Fraction new_fraction(f);
	new_fraction.multiply(g);

	return new_fraction;

}

Fraction& Fraction::divide(Fraction& f, Fraction& g) {

	// create a copy of f and divide it by g
	static Fraction new_fraction(f);
	new_fraction.divide(g);

	return new_fraction;

}
