function initBuffers(gl){
    const positionBufferSquare = initSquarePositionBuffer(gl);
    const positionBufferTriangle = initTrianglePositionBuffer(gl);
    const positionBufferCircle = initCirclePositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);


    return{
        positionSquare: positionBufferSquare,
        positionTriangle: positionBufferTriangle,
        positionCircle: positionBufferCircle,
        colorSquare: colorBuffer.square,
        colorCircle: colorBuffer.circle,
        colorTriangle: colorBuffer.triangle,
        colorRed: colorBuffer.red,
    };
}

function initSquarePositionBuffer(gl){
    //create an array of positions for the square
    const positions = [
        -0.5, 0.5, 0.1,  // top left
        -0.5, -0.5, 0.1, // bottom left
        0.5, 0.5, 0.1,   // top right
        0.5, -0.5, 0.1   // bottom right
        
    ];

    // create buffer for squares position
    const positionBuffer = gl.createBuffer();

    // select the position buffer as the one to apply buffer operations to from here out
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

    // now we pass list of positions into webgl to build the shape.
    // we do this by creating a float32array from the js array then use it to fill 
    // the current buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
}

function initTrianglePositionBuffer(gl){
    //create an array of positions for the square
    const positions = [
        0.0,0.5,0.0,
        -0.5,-0.5,0.0,
        0.5,-0.5,0.0,
    ];

    // create buffer for squares position
    const positionBuffer = gl.createBuffer();

    // select the position buffer as the one to apply buffer operations to from here out
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

    // now we pass list of positions into webgl to build the shape.
    // we do this by creating a float32array from the js array then use it to fill 
    // the current buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return positionBuffer;
}

function initCirclePositionBuffer(gl, segments = 32){
    const positions = [0.0,0.0,0.0];
    for (let i =0; i<=segments;i++){
        const angle = (i/segments)*2*Math.PI;
        positions.push(Math.cos(angle)*0.5,Math.sin(angle)*0.5,0.0);
    }
    // create buffer for squares position
    const positionBuffer = gl.createBuffer();

    // select the position buffer as the one to apply buffer operations to from here out
    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

    // now we pass list of positions into webgl to build the shape.
    // we do this by creating a float32array from the js array then use it to fill 
    // the current buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    return positionBuffer;
}


function initColorBuffer(gl){
    const colorsSquare = [
        1.0, 0.0, 0.0, 1.0, //red
        0.0, 1.0, 0.0, 1.0, //green
        0.0, 0.0, 1.0, 1.0, //blue
        1.0, 1.0, 1.0, 1.0, //white
        
    ];
    const colorsTriangle = [
        1.0, 1.0, 0.0, 1.0, // yellow
        0.0, 1.0, 1.0, 1.0, // cyan
        1.0, 0.0, 1.0, 1.0, // magenta
    ];
    const circleVertexCount = 34;
    const colorsCircle = [];
    for (let i = 0; i<circleVertexCount; i++){
        colorsCircle.push(0,0,1.0,1.0);
    }
    const colorsCircleRed = [];
    for (let i = 0; i<circleVertexCount; i++){
        colorsCircleRed.push(1.0,0,0,1.0);
    }

    const colorBufferSquare = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferSquare);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSquare), gl.STATIC_DRAW);

    const colorBufferTriangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferTriangle);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsTriangle), gl.STATIC_DRAW);

    const colorBufferCircle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferCircle);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsCircle), gl.STATIC_DRAW);

    const colorBufferRed = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferRed);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsCircleRed), gl.STATIC_DRAW);

    return {
        square: colorBufferSquare,
        triangle: colorBufferTriangle,
        circle: colorBufferCircle,
        red: colorBufferRed,
    };
}
export { initBuffers };