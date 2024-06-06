// Setup WebGL context
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');
if (!gl) {
    console.error('Unable to initialize WebGL. Your browser may not support it.');
}

// Shader programs
const vertexShaderSource = `
    attribute vec4 a_position;
    uniform mat4 u_matrix;
    void main() {
        gl_Position = u_matrix * a_position;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 u_color;
    void main() {
        gl_FragColor = u_color;
    }
`;

// Create shaders, link program, and use it
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);
gl.useProgram(program);

// Set up buffers
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = new Float32Array(1000); // 1000 particles
for (let i = 0; i < positions.length; i += 3) {
    positions[i] = Math.random() * 2 - 1; // x
    positions[i + 1] = Math.random() * 2 - 1; // y
    positions[i + 2] = 0; // z
}
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionAttributeLocation);

// Set up uniforms
const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
const colorLocation = gl.getUniformLocation(program, 'u_color');

// Set clear color
gl.clearColor(0, 0, 0, 1);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
});

// Handle mouse interaction
const mouse = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Update uniforms
    const matrix = new Float32Array([
        2 / window.innerWidth, 0, 0, 0,
        0, -2 / window.innerHeight, 0, 0,
        0, 0, 1, 0,
        -1, 1, 0, 1
    ]);
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    gl.uniform4f(colorLocation, 1, 1, 1, 1); // White color

    // Update particle positions based on mouse interaction
    for (let i = 0; i < positions.length; i += 3) {
        const speed = 0.01;
        const dx = mouse.x - positions[i];
        const dy = mouse.y - positions[i + 1];
        const distance = Math.sqrt(dx * dx + dy * dy);
        positions[i] += dx * speed;
        positions[i + 1] += dy * speed;

        // Apply gravity
        positions[i + 1] -= 0.002;

        // Bounce off the walls
        if (positions[i] < -1 || positions[i] > 1) {
            positions[i] = Math.sign(positions[i]) * 2 - positions[i];
        }

        if (positions[i + 1] < -1 || positions[i + 1] > 1) {
            positions[i + 1] = Math.sign(positions[i + 1]) * 2 - positions[i + 1];
        }
    }

    // Update buffer data
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.StATIC_DRAW);

    // Clear the canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw particles
    gl.drawArrays(gl.POINTS, 0, positions.length / 3);
};

animate();

// Helper functions for shader creation and program linking
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.attachShader(program, vertexShader);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}