import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import peasy.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class ThreeD_Grapher extends PApplet {



PeasyCam cam;
static float stepSize = 5;
static float scaleFactor = 2;
static float heightScale = 5;
static float functionScaleFactor = 1;

public void setup() {
    

    cam = new PeasyCam(this, 100);
}

public void draw() {
    background(255);

    for(float x = -width / 2 * scaleFactor; x < width / 2 * scaleFactor; x += stepSize * scaleFactor) {
        for(float y = -width / 2 * scaleFactor; y < height / 2* scaleFactor;y += stepSize * scaleFactor) {
            push();

                float z = sin(10*(x*x+y*y));
                translate(x, y, z * heightScale);

                box(stepSize * scaleFactor / 4, stepSize * scaleFactor / 4, stepSize * scaleFactor / 4);

            pop();
        }
    }
}

public int sign(float a1) {
  if (a1==0) return 0;
  if (a1<0) return -1;
  if (a1>0) return 1;
  // this would not be reached: 
  return 0;
}
  public void settings() {  size(500, 500, P3D); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "ThreeD_Grapher" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
