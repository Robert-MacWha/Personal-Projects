# python ratio.py > robert-output.txt
from environment import Environment

max_dur = 2

env = Environment('c.txt')
env.calculateRoadUsage()

# loop over each intersection
i_count = int(env.header[1])

output = []

# get each street going into each intersection
intersections = []
for i in range(i_count):
    streets = env.getStreetsToIntersection(i)
    intersections.append(streets)

# specify the number of intersections in the output
print(len(intersections))

# loop over each intersection
for i in range(len(intersections)):
    # specify the intersection id
    print(i)

    intersection = intersections[i]

    # specify the number of roads
    print(len(intersection))

    # loop over each road
    durrations = []
    for j in range(len(intersection)):
        durrations.append(intersection[j].count)
        
    # remap the array so the max durration is some value max_dur
    remaped_durrations = [int(i*max_dur/(max(durrations) + 1)) for i in durrations]

    # print out the data
    for j in range(len(intersection)):
        print(intersection[j].name, max(round(remaped_durrations[j]), 1))