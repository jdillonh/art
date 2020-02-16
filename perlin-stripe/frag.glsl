// in this example we use a time uniform to drive an animation with a few of glsl's built in math functions
// you can find more info for GLSL functions online
// i like this page http://www.shaderific.com/glsl-functions/

precision mediump float;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float time;
uniform float ar;

float rand(vec2 c){
	return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
float noise(vec2 p, float freq ){
  float unit = 1.0/freq;
	vec2 ij = floor(p/unit);
	vec2 xy = mod(p,unit)/unit;
	//xy = 3.*xy*xy-2.*xy*xy*xy;
	xy = .5*(1.-cos(3.14*xy));
	float a = rand((ij+vec2(0.,0.)));
	float b = rand((ij+vec2(1.,0.)));
	float c = rand((ij+vec2(0.,1.)));
	float d = rand((ij+vec2(1.,1.)));
	float x1 = mix(a, b, xy.x);
	float x2 = mix(c, d, xy.x);
	return mix(x1, x2, xy.y);
}

float pNoise(vec2 p, int res){
	float persistance = .5;
	float n = 0.;
	float normK = 0.;
	float f = 4.;
	float amp = 1.;
	int iCount = 0;
	for (int i = 0; i<50; i++){
		n+=amp*noise(p, f);
		f*=2.;
		normK+=amp;
		amp*=persistance;
		if (iCount == res) break;
		iCount++;
	}
	float nf = n/normK;
	return nf*nf*nf*nf;
}


float width = 0.010;
float sqrness= 50.0;
float speed = 0.001;

vec3 col1 = vec3(1.0, 247.0/255.0, 209.0/255.0);
vec3 col2 = vec3(235.0/255.0, 77.0/255.0, 128.0/255.0);
vec3 col3 = vec3(153.0/255.0, 207.0/255.0, 1.0);


void main() {

  vec2 uv = vTexCoord;
  uv.x *= ar;
  //uv += vec2(time, time);
  vec2 uvpix = floor(uv*sqrness)/sqrness;


  float noise = pNoise(uvpix*speed*time, 1) * 5.0;
  vec3 outp;
  if (noise > 0.5) {
    outp = mod(uv.x, width) < width/2.0 ? col1 : col2;
  }
  else {
    outp = mod(uv.y, width) < width/2.0 ? col3 : col1;
  }

  vec4 color = vec4(outp.rgb, 1.0);
  gl_FragColor = color;
}
