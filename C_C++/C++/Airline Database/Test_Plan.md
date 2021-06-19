# Test Plan #

## Features ##
-# Invalid command
-# Creating flights
	- Creating flight correctly
	- Creating flight with invalid seat number
-# Selecting flights
	- Selecting existing flight
	- Selecting invalid flight
-# Deleting flights
	- Deleting an existing flight
	- Deleting an existing flight and canceling
-# Viewing informatin
	- Viewing information on all flights
		- Detail mode
			- Viewing information at low detail
			- Viewing information at mid detail
			- Viewing information at high detail
			- Viewing information at invalid details
		- Sort mode
			- Viewing information in sort mode 0
			- Viewing information in sort mode 1
			- Viewing information in invalid sort mode
	- Viewing information on selected flight
		- Viewing valid flight information
		- Viewing invalid flight information
	- Viewing information on selected seat
		- Viewing valid seat information
		- Viewing invalid seat information
-# Editing flight information
	- Updating flight departure
	- Updating flight destionation
	- Updating flight departure time
-# Managing passengers
	- Adding a passenger
		- Adding a passenger to a valid seat
		- Adding a passenger to an invalid seat
	- Removing a passenger
		- Removing a passenger from a valid non-avalible seat
		- Removing a passenger from a valid avalible seat

# Invalid command #
From an emptu database, run the command `qwertyuio`

The following will be retuned by the terminal

	qwertyuio
	ERROR - Unknown command

# Creating flights #
## Create flight correctly ##

From a empty database, run the command `create flight` and pass in the following parameters
	- Ottawa
	- Toronto
	- 10
	- 12:30

The following will be returned by the terminal

	create flight
	> Please enter flight departure
	Ottawa
	> Please enter flight destination
	Toronto
	> Please enter number of seats on the flight
	10
	> Please enter flight departure time
	12:30
	> Created flight

## Create flight with invalid number of seats ##

From an empty database, run the command `create flight` and pass in the following parameters
	- Ottawa
	- Toronto
	- ten
	- 12:30

The following will be returned by the terminal

	create flight
	> Please enter flight departure
	Ottawa
	> Please enter flight destination
	Toronto
	> Please enter number of seats on the flight
	ten
	> ERROR - Please enter an integer for the number of seats

# Selecting flights #
## Selecting existing flight ##
 
From an empty database, create a flight with the `create flight` command.  Then run the command `select flight` with the following parameters
	- 0

The following will be returned by the terminal

	select flight
	> Please enter the index of the flight you would like to select
	0
	> Selected flight 0

## Selecting invalid flight ##
From an empty database, create a flight with the `create flight` command.  Then run the command `select flight` with the following parameters
	- 1

The following will be returned by the terminal

	select flight
	> Please enter the index of the flight you would like to select
	1
	> ERROR - Please enter a valid index (0-0)

# Deleting flights #
## Deleting an existing flight ##
From an empty database, create a flight with the `create flight` command and select it with the `select flight` command.  Then run the command `delete flight` and input `y` to confirm the deletion

The following will be returned by the terminal

	delete flight
	> Are you sure you want to delete flight #0 (y/n)
	y
	> Deleting selected flight - please reassign all passengers
	>> Ottawa : Toronto, 12:30
	> Deleted flight 0

## Deleting an existing flight and canceling ##
From an empty database, create a flight with the `create flight` command and select it with the `select flight` command.  Then run the command `delete flight` and input `n` to cancel the deletion

The following will be returned by the terminal

	delete flight
	> Are you sure you want to delete flight #0 (y/n)
	n
	> Canceled deletion

# Viewing information #

## Viewing information on all flights ##
From each test: From an empty terminal create two flights with the `create flight` each with unique information

### Detail Mode ###

#### View information at lowest detail ####
Run the command `info all` with the following parameters
	- 0

The following will be returned by the terminal

	info all
	> Enter a detail mode (0, 1, 2)
	0
	> Flights: 2
	> 0.
	>> Flight 0, Ottawa : Toronto, 12:30
	> 1.
	>> Flight 1, Ottawa : London, 1:15

#### View information at medium detail ####
Run the command `info all` with the following parameters
	- 1
	- 0

The following will be returned by the terminal

	> Enter a detail mode (0, 1, 2)
	1
	> Enter a sort mode (0, 1)
	0
	> Flights: 2
	> 0.
	>> Flight 0, Ottawa : Toronto, 12:30
	> 1.
	>> Flight 1, Ottawa : London, 1:15

#### View information at highest detail ####
Run the command `info all` with the following parameters
	- 2
	- 0

The following will be returned by the terminal

	info all
	> Enter a detail mode (0, 1, 2)
	2
	> Enter a sort mode (0, 1)
	0
	> Flights: 2
	> 0.
	>> Ottawa : Toronto, 12:30
	> 1.
	>> Ottawa : London, 1:15

#### View information at invalid detail ####
Run the command `info all` with the following parameters
	- 3
	- 0

The following will be returned by the terminal

	info all
	> Enter a detail mode (0, 1, 2)
	3
	> Please enter a valid detail mode (0, 1, 2)

### Sort Mode ###
For each test: from the setup terminal run the command `select flight` followed by `0` as the parameter.  Then add three passengers with unique first names to different, valid, seats

#### View information at sort mode 0 ####
Run the command `info all` with the following parameters
	- 2
	- 0

The following will be returned by the terminal

	info all
	> Enter a detail mode (0, 1, 2)
	2
	> Enter a sort mode (0, 1)
	0
	> Flights: 2
	> 0.
	>> Ottawa : Toronto, 12:30
	3. Henry, Clark : Barhaven Drive : 356-127-7357
	5. Robert, Davison : Butternut Crt : 613-830-8676
	9. Christopher, MacWha : Beachview Crt : 957-654-9086
	> 1.
	>> Ottawa : London, 1:15

#### View information at sort mode 1 ####
Run the command `info all` with the following parameters
	- 2
	- 1

The following will be returned by the terminal

	info all
	> Enter a detail mode (0, 1, 2)
	2
	> Enter a sort mode (0, 1)
	1
	> Flights: 2
	> 0.
	>> Ottawa : Toronto, 5:15
	6. Ann, MacWha : Blackburn : 876-905-7067
	5. Robert, Zottoli : Butternut : 738-287-1984
	2. Zane, Jeff : Barhaven : 943-242-5644
	> 1.
	>> Ottawa : London, 10:30

#### View information at invalid sort mode ####
Run the command `info all` with the following parameters
	- 2
	- 2

The following will be returned by the terminal

	info all
	> Enter a detail mode (0, 1, 2)
	2
	> Enter a sort mode (0, 1)
	2
	> ERROR - Please enter a valid sort mode (0, 1)

## Viewing information on selected flight ##
From an empty terminal create a flight with the `create flight` then select the flight using the `select flight` command.  After that add three passengers on valid seats with unique names. Then, run the command `info flight` with the following parameters
	- 2
	- 0

The following will be returned by the terminal

	info flight
	> Enter a detail mode (0, 1, 2)
	2
	> Enter a sort mode (0, 1)
	1
	>> Ottawa : Toronto, 5:15
	6. Ann, MacWha : Blackburn : 876-905-7067
	5. Robert, Zottoli : Butternut : 738-287-1984
	2. Zane, Jeff : Barhaven : 943-242-5644

## Viewing information on selected seat ##
From an empty terminal create a flight with the `create flight` then select the flight using the `select flight` command.  After that add one passenger on seat 0. Then select the first seat using the command `select seat` and run the command `info seat` with the following parameters
	- 1

The following will be returned by the terminal

	info seat
	> Enter a mode (0, 1)
	1
	Ann, MacWha : Blackburn : 876-905-7067

# Editing flight information #
For each test: create a flight with a valid number of seats and select it.

## Updating flight departure ##
Run the command `set departure` with the following parameters
	- New Zealand

The following will be returned by the terminal

	set departure
	> Enter a new departure
	New Zealand
	> updated flight 0's departure

## Updating flight destination ##
Run the command `set destination` with the following parameters
	- Australia

The following will be returned by the terminal

	set destination
	> Enter a new destination
	Australia
	> updated flight 0's destination

## Updating flight departure time ##
Run the command `set departure_time` with the following parameters
	- 2:20

The following will be returned by the terminal

	set departure_time
	> Enter a new departure_time
	2:20
	> updated flight 0's departure_time

# Managing passengers #
For each test: create a flight using `create flight` with ten seats and select it using the `select flight` commands.

## Adding a passenger ##
### Adding a passenger to a valid seat ###
Run the command 'add passenger' with the following parameters
	- Ann
	- Zottoli
	- Blackburn
	- 111-111-1111
	- 0

The following will be returned by the terminal

	add passenger
	> Please enter first name
	Ann
	> Please enter last name
	Zottoli
	> Please enter address
	Blacburn
	> Please enter phone number
	111-111-1111
	> Please enter the passenger's seat
	0
	Added a passenger

### Adding a passenger to a valid non-avalible seat ###
Run the command 'add passenger' with the following parameters
	- Ann
	- Zottoli
	- Blackburn
	- 111-111-1111
	- 0

The following will be returned by the terminal

	add passenger
	> Please enter first name
	Ann
	> Please enter last name
	Zottoli
	> Please enter address
	Blackburn
	> Please enter phone number
	111-111-1111
	> Please enter the passenger's seat
	0
	> ERROR - Seat already has a passenger

## Removing a passenger ##
For each test: add a passenger to the selected flight in the 1st seat using the `add passenger` command

### Removing a passenger from an avalible seat ###
Run the command `remove passenger` with the following parameters
	- 1

The following will be returned by the terminal

	remove passenger
	> Please enter the index of the passenger to remove
	1
	> Passenger removed

### Removing a passenger from a non-avalible seat ###
Run the command `remove passenger` with the following parameters
	- 2

The following will be returned by the terminal

	remove passenger
	> Please enter the index of the passenger to remove
	2
	> ERROR - no passenger in selected seat