varying vec2 vUv;
uniform sampler2D uEnvironment;
uniform sampler2D uImageBrick1;
uniform sampler2D uImageBrick2;
uniform float uProgress;


void main(){
  // get images
  vec4 environment = texture2D(uEnvironment,vUv);
  vec4 brick1 = texture2D(uImageBrick1,vUv);
  vec4 birck2 = texture2D(uImageBrick2,vUv);

  // use alpha of the brick texture to mix between the 2 colors
  float brickAlpha = brick1.a;

  // circle animation for the brick textures
  float distCenter = distance(vUv,vec2(0.5));
  float circleAnimationAlpha = (1. - smoothstep(uProgress,uProgress + 0.06, distCenter)) * brickAlpha;

  // get colors of environment
  vec3 environementColors = environment.rgb;

  // transition brick images based on the uprogress
  vec3 brickColor = mix(brick1.rgb,birck2.rgb,circleAnimationAlpha);
  vec3 finalColor = mix(environementColors,brickColor,brickAlpha);


  gl_FragColor=vec4(finalColor, 1.);
}