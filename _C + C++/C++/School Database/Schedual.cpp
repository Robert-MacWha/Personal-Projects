#include "Schedual.h"

Schedual::Schedual() {

	periods = 0;

}
Schedual::Schedual(int p) {

	periods = p;

	for (int i = 0; i < periods; i++) {

		schedual.push_back(vector<Class>());

	}
}

bool Schedual::addClass(int p, Class c) {

	if (p >= periods)
		return false;

	for (int i = 0; i < periods; i++) {
		for (int j = 0; j < schedual[i].size(); j++) {

			if (c.getId() == schedual[i][j].getId())
				return false;

		}
	}

	schedual[p].push_back(c);
	return true;

}

Class* Schedual::getClass(string id) {

	for (int i = 0; i < periods; i++) {
		for (int j = 0; j < schedual[i].size(); j++) {

			if (schedual[i][j].getId() == id)
				return &schedual[i][j];

		}
	}

	return NULL;

}

void Schedual::delClass(string id) {

	for (int i = 0; i < periods; i++) {
		for (int j = 0; j < schedual[i].size(); j++) {

			if (schedual[i][j].getId() == id)
				schedual[i].erase(schedual[i].begin() + j);

		}
	}

}

string Schedual::toString() {

	string output = "Schedual\nPeriods: " + to_string(periods) + "\n\n";

	for (int i = 0; i < periods; i++) {

		output += "Period #" + to_string(i) + "\n------------\n";

		for (int j = 0; j < schedual[i].size(); j++) {

			output += schedual[i][j].toString() + "------------\n";

		}

		output += "\n";

	}

	return output;

}