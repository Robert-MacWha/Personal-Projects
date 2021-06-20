# Java Projects
Note: All Java projects are only available for download. 

## Processing
- [Elementary Particle Simulation](#elementary-particle-simulation)
- [Visual NEAT Implementation](#visual-neat-implementation)
- [3D Grapher](#3d-grapher)
- [Water Particle Simulation](#water-particle-simulator)
## Pure Java
- [NEAT Implementation](#neat-implementation)
- [NEAT Racecars](#neat-racecars)

### Elementary Particle Simulation
<img align="right" width="30%" src="../_Docs\Images\Elementary-particles.PNG"></img>
A basic particle simulation I created that attempts to emulate electro-magnetic interactions between elementary particles.  Keeping in mind that this was made with no correct equations, I find that the dots moving around look pretty. 

### Visual NEAT Implementation
A implementation of the NEAT Algorithm I wastefully coded after making one in pure Java.  This was created so I could visually see what the networks looked like, hence, most of the time was spent on building the graph renderer. 

### 3D Grapher
A simple processing script that generates 3D graphs of arbitrary equations.  I recommend adding peasyCam to this project (can just be dropped in) if you prefer perspectives other than top-down.

### Water Particle Simulator
<img align="right" width="35%" src="../_Docs\Images\Water-Simulation.PNG"></img>
A particle simulation that attempts to create a fluid that reacts in a similar way water.  Through emergent mechanics this fluid can react to waves, hold surface tension, and generally look cool.

### NEAT Implementation
An implementation of the NEAT algorithm written in pure java. A precursor to my [Visual NEAT Implementation](#visual-neat-implementation) and to my [NEAT Racecar Project](#neat-racecar).

### :star: NEAT Racecars
<img align="left" width="40%" src="../_Docs\Images\Racecar-Evolution.PNG"></img>
A large-scale project I created as a final project for my Grade 11 ITGS class.  For this I build an environment in which NEAT agents could learn to navigate custom-build racetracks through evolution and natural selection.

This project contains two separate systems, a track editor and a neuro-evolution environment.  The track editor is a custom interface I built that allows you to build the racetrack that the NEAT agents will navigate.  Some limitations of this editor are:
1. It has a fixed starting position (that is unmarked because UX was not a priority in this project).
1. Only lines can be drawn.  This is a side-effect of the collision detection algorithm I'm using for the agents.
1. The track cannot loop back around on itself.  It's technically possible for you to do this, but because of how the checkpoints are automatically assigned it will never be functional.

Once built environments are saved as a formatted text file (editing this text file manually will have unplanned consequences)

The neuro-evolution environment is where the agents learn to navigate the custom-build track. They do this through an implementation of the NEAT algorithm and will generally stop being idiots by around generation 10 (this number wil vary depending on the tracks difficulty and your luck).