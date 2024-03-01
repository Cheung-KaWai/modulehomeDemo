varying vec2 vUv;
uniform sampler2D uEnvironment;
uniform sampler2D uImageWall1;
uniform sampler2D uImageWall2;
uniform float uProgress;
uniform float uAnimationStyle;
uniform float uTextureAspectRatio;
uniform float uWindowAspectRatio;


void main(){
  vec2 center = vec2(0.5,0.5);

  // center offset
  vec2 texCoord = vUv - 0.5;

  // fit texture in plane keeping aspect ratio
  if(uTextureAspectRatio > uWindowAspectRatio){
    texCoord.x = texCoord.x * (uWindowAspectRatio / uTextureAspectRatio) + 0.5;
    texCoord.y+= 0.5;
  }else{
    texCoord.y = texCoord.y * (uTextureAspectRatio / uWindowAspectRatio) + 0.5;
    texCoord.x += 0.5;
  }

  // get images
  vec4 environment = texture2D(uEnvironment,texCoord);
  vec4 wall1 = texture2D(uImageWall1,texCoord);
  vec4 wall2 = texture2D(uImageWall2,texCoord);

  // use alpha of the brick texture to mix between the 2 colors
  float wallAlpha = wall1.a;

  // circle animation for the brick textures
  float distCenter = distance(vUv,vec2(0.5));
  float circleAnimationAlpha = (1. - smoothstep(uProgress,uProgress + 0.06, distCenter)) * wallAlpha;

  float animationStyle = mix(uProgress,circleAnimationAlpha,uAnimationStyle);

  // get colors of environment
  vec3 environementColors = environment.rgb;

  // transition brick images based on the uprogress
  vec3 wallColor = mix(wall1.rgb,wall2.rgb,animationStyle);
  vec3 finalColor = mix(environementColors,wallColor,wallAlpha);


  gl_FragColor=vec4(finalColor, 1.);
}