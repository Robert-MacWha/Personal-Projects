#include <sstream>
#include "Fraction.h"

using namespace std;

Fraction::Fraction() {

	num = 0;
	den = 0;

}

Fraction::Fraction(int n, int d) {

	num = n;
	den = d;

}
 
int Fraction::getNum()  { return num; }
int Fraction::getDen()  { return den; }
double Fraction::getFrac() { return double(num) / double(den); }

void Fraction::setNum(int n) { num = n; }
void Fraction::setDen(int d) { den = d; }

string Fraction::toString() {

	stringstream ss;

	ss << num;
	ss << "/";
	ss << den;
	
	return ss.str();

}