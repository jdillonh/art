// in this example we use a time uniform to drive an animation with a few of glsl's built in math functions
// you can find more info for GLSL functions online
// i like this page http://www.shaderific.com/glsl-functions/

precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float time;
uniform vec2 resolution;

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}

vec2 mirror(vec2 x)
{
  return abs(fract(x/2.0) - 0.5)*( 4. + (sin(time*0.01)*3.));	
}

void main() {

  vec2 uv = vTexCoord;
  //uv = mirror(rotate(mirror(rotate(uv, time * 0.001 )), time * 0.001));
  float off = 1.2;
  float osc = sin( time*0.1 + uv.x*5. );
  uv = mirror(uv);
  float osc2 = sin( time*0.03 + rotate(uv, 0.01*time).x*3. + 0.8 );
  uv = mirror(uv);
  float osc3 = sin( time*0.03 + uv.y*3. + .8 + 3.14 );

  // make a vec4 out of our circle variable
  vec4 color = vec4( abs(osc + osc + osc3), abs(osc2), osc3, 1.0 );

  gl_FragColor = color;
}
