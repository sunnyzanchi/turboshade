import { createBuffer, createProgram, createShader } from './utils';

const vertexShaderSource = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;
 
void main() {
  v_texCoord = a_texCoord;
  gl_Position = a_position;
}
`;

/* eslint-disable indent, no-multi-spaces */
const box = [
  -1.0, -1.0,
   1.0, -1.0,
  -1.0,  1.0,
  -1.0,  1.0,
   1.0, -1.0,
   1.0,  1.0,
];
/* eslint-enable indent, no-multi-spaces */

const setupPositions = (gl, program) => {
  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const positionBuffer = createBuffer(gl);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(box), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
};

/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLProgram} program
 */
const setupTexture = (gl, program, image) => {
  console.log(image);
  const texLocation = gl.getAttribLocation(program, 'a_texCoord');
  const texBuffer = createBuffer(gl);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(box), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(texLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
  gl.vertexAttribPointer(texLocation, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
};

/**
 * Call a fragment shader with optional images
 * @param {WebGLRenderingContext} gl
 * @param {String} fragShaderSource
 * @param {HTMLImageElement|HTMLImageElement[]} image
 */
const turboshade = (gl, fragShaderSource, image) => {
  let fragShader;
  try {
    fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);
  } catch (err) {
    console.error('Error compiling fragment shader:');
    throw err;
  }
  const vertShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);

  const program = createProgram(gl, vertShader, fragShader);
  setupPositions(gl, program);
  setupTexture(gl, program, image);

  gl.useProgram(program);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

export default turboshade;
