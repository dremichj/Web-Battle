function initBuffers(gl){
    const positionBuffer = initPositionBuffer(gl);
    const colorBuffer = initColorBuffer(gl);
    const indexBuffer = initIndexBuffer(gl);


    return{
        position: positionBuffer,
        color: colorBuffer,
        indices: indexBuffer,
    };
}

function initPositionBuffer(gl){
    // create buffer for squares position
    const positionBuffer = gl.createBuffer();

    // select the position buffer as the one to apply buffer operations to from here out

    gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);

    //create an array of positions for the square
    const positions = [
        -1.0, -1.0, 0.0,
        1.0, -1.0, 0.0,
        1.0, 1.0, 0.0,
        -1.0, 1.0, 0.0,
        
    ];


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

function initIndexBuffer(gl){
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // this array defines each face as two triangles, using
    // the indices into the vertex array to specify each triangles position

    // prettier-ignore
    const indices = [
        0,  1,  2,      
        0,  2,  3,    // front
    ];

    // send element array to GL
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW,
    );
    return indexBuffer;
}

export { initBuffers };