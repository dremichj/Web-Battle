export function getLineBuffs(gl,corners){
    const positions = cornersToTris(corners);
    const positionBuffer = initPointsBuffer(gl,positions)
    const blueBuffer = initBlueBuffer(gl);
    return {
        posBuff:   positionBuffer,
        blueBuff:   blueBuffer,
    }
}

function cornersToTris(corners){
    let positions = [];
    // order for TRIANGLE_STRIP: TL, BL, TR, BR
    for(const [x, y] of corners){
        positions.push(x, y, 0.1);
    }
    return positions;
}

function initPointsBuffer(gl,positions){
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

function initBlueBuffer(gl){
    const colorsSquare = [
        0.5, 0.5, 1.0, 1.0, 
        0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0,
    ];

    const colorBufferSquare = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferSquare);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorsSquare), gl.STATIC_DRAW);
    return colorBufferSquare;
}