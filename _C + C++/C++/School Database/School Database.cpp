// School Database.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <stdlib.h>

#include "Student.h"
#include "Teacher.h"
#include "Class.h"
#include "Schedual.h"

using namespace std;

int main()
{
    Schedual schedual(6);

    // ---------- create a bunch of fake classes ---------- 
    string classNames[3] = {
        "Programming",
        "Art",
        "Science"
    };

    string teacherNames[3] = {
        "Kutschke",
        "Hudson",
        "Sass",
    };

    string studentNames[20] = {
        "Olivia",
        "Noah",
        "Emma",
        "Oliver",
        "Ava",
        "Elijah",
        "Charlotte",
        "William",
        "Sophia",
        "James",
        "Amelia",
        "Benjamin",
        "Isabella",
        "Lucas",
        "Mia",
        "Henry",
        "Evelyn",
        "Alexander",
        "Harper"
    };

    for (int i = 0; i < 6; i++) {

        for (int j = 0; j < 3; j++) {

            schedual.addClass(
                i,
                Class(to_string(i) + to_string(j), classNames[j])
            );

        }

    }

    // ugly pointer because it dies if I just use a object.  Please help I have no idea why this hates me
    vector <Teacher*> teachers;

    // ---------- add a bunch of fake teachers ---------- 
    for (int j = 0; j < 3; j++) {

        teachers.push_back(
            new Teacher(teacherNames[j], "Prof", "Colonel By", "Art, Programming, Science", "C0000" + to_string(j))
        );

        for (int i = 0; i < 6; i++)
            schedual.getClass(to_string(i) + to_string(j))->setTeacher(teachers.back());

    }

    // if you find a way to fix the pointers above, this block likely has the same issue (don't know for sure, didn't want to test)
    vector <Student*> students;

    // ---------- add a bunch of fake students ---------- 
    for (int k = 0; k < 5; k++) {

        // easy way of making unique IDs without needing to worry about multi-digit numbers
        for (int l = 0; l < 5; l++) {

            students.push_back(
                new Student(
                    studentNames[rand() % 20], studentNames[rand() % 20],
                    "The moon",
                    rand() % 12,
                    "S0000000" + to_string(k) + to_string(l))
            );
        }
    }

    // I know this will have students with multiple classes in the same period but let's just pretend that the school I'm making this for really sucks at assigning classes
    for (int i = 0; i < 6; i++) {

        for (int j = 0; j < 3; j++) {

            for (int k = 0; k < 5; k++)
                schedual.getClass(to_string(i) + to_string(j))->addStudent(students[rand() % (5 * 4)]);

        }

    }

    // ---------- Make some students late at complete random ---------- 
    for (int i = 0; i < 10; i++) {

        // I should have found a better way to do this - it's not at all obvious what line is doing what.  Well, my bad for not bothering to use nicer IDs
        teachers[rand() % teachers.size()]->markStudentLate(students[rand() % students.size()]);

    }

    cout << schedual.toString() << endl;

    // ---------- deleting my ugly pointers ----------
    for (int i = 0; i < teachers.size(); i++)
        delete teachers[i];

    for (int i = 0; i < students.size(); i++)
        delete students[i];

    // this is enough.  I have no more functionality.  Please don't use this in the real world - it won't work as intended at scale.  I'm not that commited to this assignment.

}