precision mediump float;


float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

const int numOrbs = 28;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float width;
uniform float height;
uniform float time;
uniform float orbState[ numOrbs * 3 ];
uniform float mouseX;
uniform float mouseY;

//const vec3 col2 = vec3(0., 0., 0.); //
//const vec3 col1 = vec3(1., 1., 1.);//

  
const vec3 col1 = vec3( 255./255., 250./255., 206./255.); //vec3( 255. / 255.0 , 172. / 255.0 , 156. / 255.0 ) ;//vec3(0., 0., 0.);//
const vec3 col2 = vec3( 235./255., 81./255., 54./255.); //vec3( 0. / 255.0 , 40. / 255.0 , 43. / 255.0 ) ;//vec3(1., 1., 1.);//
//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
			   6.0)-3.0)-1.0,
		   0.0,
		   1.0 );
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
  float AR =  width / height;
  vec2 uv = vTexCoord;
  uv.x *= AR;
  float sinFactor = 10.0*floor(50.0 * (noise(10.0+vec3(uv.xy, mouseX*10.0))));
  float d = 0.0; 
  float curr1;
  float curr2;
  for( int i = 0; i < numOrbs * 3; i += 3 ) {
    curr1 = distance( uv , vec2( orbState[i] * AR, orbState[i + 1] ));
    curr1 = orbState[i + 2] / curr1 ;

    d += (curr1);
  }
  //d = clamp( d, 0.0, 1.0 );
  if( d > 0.3 ) {
    d = 0.7;
  }
  else {
    d += cos(time);
    d = sin( d * sinFactor);// * sin( d * 10. );
  }
  //d = mix( sin( d * .5 ), (1.0 + sin( d * 2.0 )), (sin(time * 3.) / 2.) + 0.2 );
  // make a vec4 out of our circle variable
  //vec3 color = hsb2rgb( vec3( d, 1.0, 1.0 ));
  vec3 color = vec3( d, 0.0, d );
  if( d > 0.3 ) {
    gl_FragColor = vec4( col1.rgb, 1.0 );
  }
  else {
    gl_FragColor = vec4( col2.rgb, 1.0 );
  }

  //vec3 color = mix( col1, col2, d );
  //gl_FragColor = vec4( color.rgb, 1.0);
}


