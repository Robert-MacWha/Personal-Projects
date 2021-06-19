# python random.py > robert-output.txt

from environment import Environment

env = Environment('b.txt')

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
  for j in range(len(intersection)):
    print(intersection[j].name, ' 2')