#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;
attribute vec2 aTexCoord;

// position on the texture
varying vec2 vTexCoord;

void main() {
  
  // copy the texcoords
  vTexCoord = aTexCoord;

  // Copy the position data into a vec4, adding 1.0 as the w parameter
  vec4 positionVec4 = vec4(aPosition, 1.0);

  // Scale to make the output fit the canvas.
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0; 

  gl_Position = positionVec4;

}
