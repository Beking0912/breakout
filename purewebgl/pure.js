// Set up canvas and WebGL context
let canvas = document.getElementById("myWebGLCanvas");
let gl = canvas.getContext("webgl");

// Set up 3D perspective projection
let viewMatrix = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

let projectionMatrix = new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

// Set perspective parameters
let fov = 45 * Math.PI / 180;
let aspect = canvas.width / canvas.height;
let zNear = 0.1;
let zFar = 100.0;

mat4.perspective(projectionMatrix, fov, aspect, zNear, zFar);

// Create 3D models of bricks, ball, and paddle
let cubeModel = createCubeModel(gl);
let sphereModel = createSphereModel(gl);

// Set up ball, paddle, and brick states
let ballState = {
    position: vec3.fromValues(0, 0, 0),
    velocity: vec3.fromValues(1, 1, 0)
};

let paddleState = {
    position: vec3.fromValues(0, -2, 0)
};

let brickStates = [];
for (let i = 0; i < 10; i++) {
    brickStates.push({
        position: vec3.fromValues(i - 4, 1, 0)
    });
}

// Set up shader program
let program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
let positionLocation = gl.getAttribLocation(program, "a_position");
let normalLocation = gl.getAttribLocation(program, "a_normal");

let viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix");
let projectionMatrixLocation = gl.getUniformLocation(program, "u_projectionMatrix");
let modelMatrixLocation = gl.getUniformLocation(program, "u_modelMatrix");

// Render loop
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw ball
    let ballModelMatrix = mat4.create();
    mat4.translate(ballModelMatrix, ballModelMatrix, ballState.position);
    gl.uniformMatrix4fv(modelMatrixLocation, false, ballModelMatrix);
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    drawModel(gl, sphereModel, positionLocation, normalLocation);

    // Draw paddle
    let paddleModelMatrix = mat4.create();
    mat4.translate(paddleModelMatrix, paddleModelMatrix, paddleState.position);
    gl.uniformMatrix4fv(modelMatrixLocation, false, paddleModelMatrix);
    drawModel(gl, cubeModel, positionLocation, normalLocation);

    // Draw bricks
    for (let i = 0; i < brickStates.length; i++) {
        let brickModelMatrix = mat4.create();
        mat4.translate(brickModelMatrix, brickModelMatrix, brickStates[i].position);
        gl.uniformMatrix4fv(modelMatrixLocation, false, brickModelMatrix);
        drawModel(gl, cubeModel, positionLocation, normalLocation);
    }

    // Update ball position
    vec3.add(ballState.position, ballState.position, ballState.velocity);

    // Check for collisions
    checkCollisions();

    // Check for game over
    checkGameOver();

    requestAnimationFrame(render);
}

requestAnimationFrame(render);

// Helper functions
// Helper functions
function createCubeModel(gl) {
    // Create vertex positions and normals
    let positions = new Float32Array([
        -1, -1,  1,
         1, -1,  1,
         1,  1,  1,
        -1,  1,  1,
    
        -1, -1, -1,
        -1,  1, -1,
         1,  1, -1,
         1, -1, -1,
    ]);
    
    let normals = new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
    ]);
    
    // Create vertex indices
    let indices = new Uint16Array([
        0, 1, 2,
        0, 2, 3,
    
        4, 5, 6,
        4, 6, 7,
    
        4, 0, 3,
        4, 3, 7,
    
        1, 5, 6,
        1, 6, 2,
    
        4, 5, 1,
        4, 1, 0,
    
        3, 2, 6,
        3, 6, 7
    ]);
    
    // Create vertex buffer
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    // Create normal buffer
    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    
    // Create index buffer
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
    return {
        positionBuffer: positionBuffer,
        normalBuffer: normalBuffer,
        indexBuffer: indexBuffer,
        numVertices: indices.length
    };
}

function createSphereModel(gl) {
    // Create vertex positions and normals
    let positions = new Float32Array([]);
    let normals = new Float32Array([]);
    
    // Create vertex indices
    let indices = new Uint16Array([]);
    
    // Create vertex buffer
    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    // Create normal buffer
    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
    
    // Create index buffer
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
    
    return {
        positionBuffer: positionBuffer,
        normalBuffer: normalBuffer,
        indexBuffer: indexBuffer,
        numVertices: indices.length
    };
}

function drawModel(gl, model, positionLocation, normalLocation) {
    // Bind vertex buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.positionBuffer);
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLocation);
    
    // Bind normal buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, model.normalBuffer);
    gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLocation);
    
    // Draw the model
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, model.indexBuffer);
    gl.drawElements(gl.TRIANGLES, model.numVertices, gl.UNSIGNED_SHORT, 0);
}

function checkCollisions() {
    // Check if ball is colliding with walls
    if (ballState.position[0] < -5 || ballState.position[0] > 5) {
        ballState.velocity[0] *= -1;
    }
    if (ballState.position[1] > 2) {
        ballState.velocity[1] *= -1;
    }
    if (ballState.position[1] < -3) {
        // Restart ball
    }
    
    // Check if ball is colliding with paddle
    if (ballState.position[0] > paddleState.position[0] - 1 &&
        ballState.position[0] < paddleState.position[0] + 1 &&
        ballState.position[1] < paddleState.position[1] + 0.5 &&
        ballState.position[1] > paddleState.position[1] - 0.5) {
        ballState.velocity[1] *= -1;
    }
    
    // Check if ball is colliding with bricks
    for (let i = 0; i < brickStates.length; i++) {
        if (ballState.position[0] > brickStates[i].position[0] - 0.5 &&
            ballState.position[0] < brickStates[i].position[0] + 0.5 &&
            ballState.position[1] < brickStates[i].position[1] + 0.5 &&
            ballState.position[1] > brickStates[i].position[1] - 0.5) {
            ballState.velocity[1] *= -1;
            brickStates.splice(i, 1);
        }
    }
}

function checkGameOver() {
    if (brickStates.length === 0) {
        // Game over
    }
}