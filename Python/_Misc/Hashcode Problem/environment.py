class Street:
    def __init__(self, start, end, name, length):
        self.start = start
        self.end = end
        self.length = length

        self.buffer = []

        self.name = name

        self.occurrences = 0

class Environment:
    def __init__(self, file):
        # read the file into a array
        with open (file, 'r') as f:
            self.data = f.readlines()

            # header contains overvew info
            self.header = self.data[0][:-1]
            self.header = self.header.split(' ')
            
            # streets
            streets = self.data[1:int(self.header[2]) + 1]
            for i in range(len(streets)):
                streets[i] = streets[i][:-1]
                streets[i] = streets[i].split(' ')
                streets[i] = Street(
                    int(streets[i][0]),
                    int(streets[i][1]),
                    streets[i][2],
                    int(streets[i][3])
                )
                self.streets = streets

    def getStreetsToIntersection(self, intersections):
        streets = []
        for i in range(len(self.streets)):
            if (self.streets[i].end == intersections):
                streets.append(self.streets[i])

        return streets

    def getStreetIndexFromName(self, name):
        for i in range(len(self.streets)):
            if (self.streets[i].name == name):
                return i

        return -1

    def calculateRoadUsage(self):
        # loop over each car
        car_data = self.data[int(self.header[2]) + 1:]
        car_data_str = ''
        for i in range(len(car_data)):
            car_data_str += car_data[i]
        
        # loop over each street
        for i in range(len(self.streets)):
            name = self.streets[i].name
            
            # see how many times the name apears within the car_data-str
            count = car_data_str.count((' ' + str(name)))
            self.streets[i].count = count