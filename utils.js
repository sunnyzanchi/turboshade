/**
 * @param {WebGLRenderingContext} gl
 */
export const createBuffer = gl => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  return buffer;
};

/**
 * @param {WebGLRenderingContext} gl
 * @param {WebGLShader} vertexShader
 * @param {WebGLShader} fragmentShader
 */
export const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  const log = gl.getProgramInfoLog(program);
  gl.deleteProgram(program);
  throw log;
};

/**
 * @param {WebGLRenderingContext} gl
 * @param {FRAGMENT_SHADER|VERTEX_SHADER} type
 * @param {String} source
 */
export const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  const log = gl.getShaderInfoLog(shader);
  gl.deleteShader(shader);
  throw log;
};

const isInteger = num => Number.isInteger(num);

export const getUniformMethod = data => {
  if (Array.isArray(data)) {
    if (data.length > 4) {
      throw Error('Uniforms can take a maximum of 4 values');
    }
    if (data.every(isInteger)) {
      return `uniform${data.length}i`;
    }
    return `uniform${data.length}f`;
  }

  if (isInteger(data)) {
    return `uniform1i`;
  }
  return `uniform1f`;
};
