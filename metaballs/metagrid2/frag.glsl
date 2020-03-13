precision highp float;


// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our time uniform variable coming from p5
uniform float width;
uniform float height;
uniform float time;
uniform float rotation;
uniform float density;
uniform float smoothness;
uniform float thresh;

//const vec3 col2 = vec3(0., 0., 0.); //
//const vec3 col1 = vec3(1., 1., 1.);//
const vec3 col1 = vec3(0., 0., 0.);//
const vec3 col2 = vec3(1., 1., 1.);//
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

const float gridX = 10.0;
const float gridY = 10.0;
const float speed = 50.0; //*this is inverse speed

void main() {
  float t = time/speed;
  float AR =  width / height;
  vec2 uv = vTexCoord;
  uv.x *= AR;
  float d = 0.0; 
  float curr = 0.0;
  float xOff = 1.0/(gridX + 1.0);
  float yOff = 1.0/(gridY+1.0);
  vec2 center = vec2(0.5, 0.5);
  for( float x = 0.0; x < gridX; x++ ) {
    for( float y = 0.0; y < gridY; y++ ) {
      float xPos = x/(gridX+1.0) + xOff;
      float yPos = y/(gridY+1.0) + yOff;
      float angle = atan(xPos - center.x, yPos - center.y);
      float size = 1.0;
      //xPos += sin(t+y)*0.1;
      float dfromc = abs(distance( uv, center ));
      size *= sin( (t + angle * mix(2.0, 4.0, density) + rotation*200.0*dfromc) );
      curr = distance( uv , vec2(xPos,  yPos ));
      curr = size / curr;
      d += (mix(curr, sin(curr), smoothness));
    }
  }
  //d = clamp( d, 0.0, 1.0 );
  //d = sin( d * 5. ) * (1.0 + sin( d / 2.0 ));
  //d = mix( sin( d * .5 ), (1.0 + sin( d * 2.0 )), (sin(time * 3.) / 2.) + 0.2 );
  if( d > 0.5*thresh  ) {
    gl_FragColor = vec4( col1.rgb, 1.0 );
  }
  else {
    gl_FragColor = vec4( col2.rgb, 1.0 );
  }
  //vec3 color = mix( col1, col2, d );
  //gl_FragColor = vec4( color.rgb, 1.0);
}

