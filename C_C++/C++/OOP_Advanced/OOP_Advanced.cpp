// Advanced.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include "Fraction.h"

using namespace std;

int main()
{

    Fraction f(1, 2);
    Fraction f2(1, 4);
    Fraction f3(1, 8);

    f.add(f2);
    Fraction f4 = Fraction::multiply(f2, f3);
    f2.divide(f4);

    cout << f.toString() << endl;
    cout << f2.toString() << endl;
    cout << f3.toString() << endl;
    cout << f4.toString() << endl;
}