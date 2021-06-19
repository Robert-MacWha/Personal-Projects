// Airline Database.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <string>

#include "Database.h"

using namespace std;

Database d;

int main()
{
    bool running = true;
    string cmd;

    cout << "Robert's Airline Command Interface - run 'help' for more info" << endl;

    while (running) {

        // log the command input
        getline(cin, cmd);

        if (cmd == "exit") // exit if it's 'exit'
            running = false;
        else // run the command
            d.runCommand(cmd);
        
        cout << endl;
    }
}