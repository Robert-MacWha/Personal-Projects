import peasy.*;

PeasyCam cam;
static float stepSize = 5;
static float scaleFactor = 2;
static float heightScale = 5;
static float functionScaleFactor = 1;

void setup() {
    size(500, 500, P3D);

    cam = new PeasyCam(this, 100);
}

void draw() {
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

int sign(float a1) {
  if (a1==0) return 0;
  if (a1<0) return -1;
  if (a1>0) return 1;
  // this would not be reached: 
  return 0;
}