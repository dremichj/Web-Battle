function initBuffers(gl){
    const positionBuffer = initPositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);


    return{
        position: positionBuffer,
        color: colorBuffer,
    };
}

function initPositionBuffer(gl){
    

    //create an array of positions for the square
    const positions = [
        -0.5, 0.5, 0.0,  // top left
        -0.5, -0.5, 0.0, // bottom left
        0.5, 0.5, 0.0,   // top right
        0.5, -0.5, 0.0   // bottom right
        
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

function initColorBuffer(gl){
    const colors = [
        1.0, 0.0, 0.0, 1.0, //red
        0.0, 1.0, 0.0, 1.0, //green
        0.0, 0.0, 1.0, 1.0, //blue
        1.0, 1.0, 1.0, 1.0, //white
        
    ];


    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    return colorBuffer;
}

export { initBuffers };