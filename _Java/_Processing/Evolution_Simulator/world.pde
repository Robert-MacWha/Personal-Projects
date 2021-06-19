class World {

    int sizeX;
    int sizeY;
    float[][] heights;

    PGraphics texture;

    World (int sX, int sY) {

        this.sizeX = sX;
        this.sizeY = sY;
        this.heights = initializeHeightMap(5, 2);

    }

    void Draw() {

        int sW = screen.width;
        int sH = screen.height;

        int rectW = 

        for()

    }

    //? creates a heightmap
    float[][] initializeHeightMap(float frequency, float amplitude) { return initializeHeightMap(frequency, amplitude, 1, 0, 0); };

    float[][] initializeHeightMap(float frequency, float amplitude, int layers, float fFalloff, float aFalloff) {

        float[][] heights = new float[this.sizeX][this.sizeY];
        float hMax = 0;

        // loop over each point
        for(int x = 0; x < this.sizeX; x ++) {
            for(int y = 0; y < this.sizeY; y ++) {
                
                // calculate the height of the point, layering on lower frequency noise if specified
                float height = 0;

                for(int i = 0; i < layers; i ++) {
                    height += noise((x * frequency) + (i * 5), (y * frequency) + (i * 10)) * amplitude;

                    frequency *= fFalloff;
                    amplitude *= aFalloff;
                }

                if (height > hMax)
                    hMax = height;

                heights[x][y] = height;

            }
        }

        // normalize the magnitudes of all points
        for(int x = 0; x < this.sizeX; x ++) {
            for(int y = 0; y < this.sizeY; y ++) {
                heights[x][y] /= hMax;
            }
        }

        return heights;

    }

}