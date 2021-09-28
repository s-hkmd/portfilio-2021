export const FS_Code = `
  varying vec2 vUv;
  uniform float uTime;
  float PI = 3.1415926535897932384626433832795;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float amp = 0.03;
    float freq = 0.08 * uTime;
    float tension = -0.008 * uTime;
    pos.x = pos.x + sin(pos.y * PI  * freq) * amp;
    pos.y = pos.y + (cos(pos.x * PI) * tension);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const VS_Code = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float uImageAspect;
  uniform float uPlaneAspect;
  uniform float uTime;
  void main() {
    vec2 ratio = vec2(
      min(uPlaneAspect / uImageAspect, 1.0),
      min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
    );
    vec2 fixedUv = vec2(
      (vUv.x - 0.5) * ratio.x + 0.5,
      (vUv.y - 0.5) * ratio.y + 0.5
    );
    vec2 offset = vec2(0.0, uTime * 0.005);
    float r = texture2D(uTexture, fixedUv + offset).r;
    float g = texture2D(uTexture, fixedUv + offset * 0.5).g;
    float b = texture2D(uTexture, fixedUv).b;
    vec3 texture = vec3(r, g, b);
    gl_FragColor = vec4(texture, 1.0);
  }
`;