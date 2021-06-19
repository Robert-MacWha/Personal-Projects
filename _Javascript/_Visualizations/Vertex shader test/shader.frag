#ifdef GL_ES
precision mediump float;
#endif

const float agent_count = 2.0;
varying vec2 vTexCoord;

uniform float     u_agent_size;
uniform sampler2D u_agent_tex;

int pointIsClose(vec2 point) {
  
  float dist = u_agent_size;
  vec2 dif = vec2(point.x - vTexCoord.x,
                  point.y - vTexCoord.y);
  
  if (dif.x < dist && dif.x > -dist &&
      dif.y < dist && dif.y > -dist) { 
    return 1; 
  }
  
  return 0;
  
}

void main() {
  
  vec2 uv = vTexCoord;
  vec3 color = vec3(0, 0, 0);
  
  float d = 0.0;
  
  for(float i = 1.0 / agent_count; i < 1.0; i += 1.0 / agent_count) {
    
    vec4 data = texture2D(u_agent_tex, vec2(i, 0.0));
    vec2 pos = data.xy;
    
    d += (pos.x - vTexCoord.x) * (pos.x - vTexCoord.x) + 
      (pos.y - vTexCoord.y) * (pos.y - vTexCoord.y);
    
    
    if (pointIsClose(pos) == 1) {
      color = vec3(1, 1, 1);
    }
    
  }
  
  if (color.x != 1.0) {
    color = vec3(d, d, d);
  }
  
  gl_FragColor = vec4(color, 1.0);

}