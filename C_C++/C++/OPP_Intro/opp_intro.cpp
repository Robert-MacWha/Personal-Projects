#include <iostream>

using namespace std;

class Sphere {

    float pi = 3.14159265;

    public:
        float radius;
        float density;

        Sphere(float r, float d) {

            radius = r;
            density = d;

        }

        float Volume() { return (4.0 / 3.0) * pi * radius * radius * radius; }
        float Mass()   { return Volume() * density; }

};

int main()
{
    Sphere s1(1, 2);
    Sphere s2(5, 10);

    cout << "Sphere #1: " << s1.Volume() << ", " << s1.Mass() << endl;
    cout << "Sphere #2: " << s2.Volume() << ", " << s2.Mass() << endl;
}