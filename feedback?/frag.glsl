// in this example we use a time uniform to drive an animation with a few of glsl's built in math functions
// you can find more info for GLSL functions online
// i like this page http://www.shaderific.com/glsl-functions/

precision mediump float;

float hash(float n) { return fract(sin(n) * 1e4); }
float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}

float noise(vec2 x) {
  vec2 i = floor(x);
  vec2 f = fract(x);

  // Four corners in 2D of a tile
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  // Simple 2D lerp using smoothstep envelope between the values.
  // return vec3(mix(mix(a, b, smoothstep(0.0, 1.0, f.x)),
  //			mix(c, d, smoothstep(0.0, 1.0, f.x)),
  //			smoothstep(0.0, 1.0, f.y)));

  // Same code, with the clamps in smoothstep and common subexpressions
  // optimized away.
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// This one has non-ideal tiling properties that I'm still tuning
float noise(vec3 x) {
  const vec3 step = vec3(110, 241, 171);

  vec3 i = floor(x);
  vec3 f = fract(x);
 
  // For performance, compute the base input to a 1D hash from the integer part of the argument and the 
  // incremental change to the 1D based on the 3D -> 1D wrapping
  float n = dot(i, step);

  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
		 mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
	     mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
		 mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
}

float woggle( float time, float off ) {
  return sin(time + off) * 0.05;
}
// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float time;
uniform sampler2D currIm;
uniform vec2 origin;
uniform sampler2D cam;


void main() {
  vec2 uv = vTexCoord;
  uv = (1.0 - uv);

  /*
    vec4 color = vec4( texture2D(currIm, uv).rgb, 1.0);
    color += (noise(vec3(uv+origin, 1.0))-0.5)/0.2;
    color = clamp(color, 0.0, 1.0);
  */
  float _time = (time*0.01);
  vec3 currColor = texture2D(currIm, uv).rgb;
  vec3 camColor = texture2D(cam, uv).rgb;
  vec4 color =0.98*texture2D(currIm, vec2( 1.0 - uv.x, uv.y));
  vec4 colorAdd = vec4(0.0,0.0,0.0,1.0);
  colorAdd.r = texture2D(cam, vec2(mod((uv.x + woggle(_time, 0.3)),1.0), uv.y)).r;
  colorAdd.g = texture2D(cam, uv).g;
  colorAdd.b = texture2D(cam, vec2(mod((uv.x - woggle(_time, 0.3)),1.0), uv.y)).b;
  color += colorAdd*0.02;
  gl_FragColor = color;
}
