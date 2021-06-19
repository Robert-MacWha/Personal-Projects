#include <iostream>
#include <string>

using namespace std;

class Shape {

protected:
	string name;

public:
	Shape(string s) {
		name = s;
	}

	void setName(string s) {
		name = s;
	}

	string getName() {
		return name;
	}

	virtual double getArea() = 0;

};

class Circle : public Shape{

private:
	double radius;

public:
	Circle (string s, double r) : Shape(s) {
		radius = r;
	}

	void setRadius(double r) {
		radius = r;
	}

	double getRadius() {
		return radius;
	}

	virtual double getArea() {
		return 3.14159265 * radius * radius;
	}

};

class Rectangle : public Shape {

private:
	double width, length;

public:
	Rectangle(string s, double w, double l) : Shape(s) {
		width = w;
		length = l;
	}

	void setWidth(double w) {
		width = w;
	}

	double getWidth() {
		return width;
	}

	void setLength(double l) {
		length = l;
	}

	double getLength() {
		return length;
	}

	virtual double getArea() {
		return length * width;
	}

};

class Triangle : public Shape {

private:
	double base, height;

public:
	Triangle(string s, double b, double h) : Shape(s) {
		base = b;
		height = h;
	}

	void setBase(double b) {
		base = b;
	}

	double getBase() {
		return base;
	}

	void setHeight(double h) {
		height = h;
	}

	double getHeight() {
		return height;
	}

	virtual double getArea() {
		return base * height * 0.5;
	}

};

int main() {

	/*
	Circle c("Foo", 10);
	cout << c.getName() << ", " << c.getRadius() << ", " << c.getArea() << endl;

	Rectangle r("Bar", 10, 5);
	cout << r.getName() << ", " << r.getWidth() << ", " << r.getLength() << ", " << r.getArea() << endl;

	Triangle t("Mix", 10, 10);
	cout << t.getName() << ", " << t.getBase() << ", " << t.getHeight() << ", " << t.getArea() << endl;
	*/

	Shape* shapes[3] = {
		new Circle("Circle", 10),
		new Rectangle("Rect", 5, 5),
		new Triangle("Tri", 5, 5)
	};

	for (int i = 0; i < 3; i++)
		cout << shapes[i]->getName() << " with an area of " << shapes[i]->getArea() << endl;

	return 0;
}