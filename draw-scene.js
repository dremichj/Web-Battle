
/**
 * @param {WebGLRenderingContext} gl
 * @param {Object} programInfo
 * @param {Object} buffers
 */

export function drawScene(gl, programInfo, buffers, cubeRotation,custObjs) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // clear the canvas before we start drawing

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.

    const fieldOfView = (45 * Math.PI) / 180; // turn to radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100;
    const projectionMatrix = mat4.create();

    // glmatrix always has the first argument
    // as the destination
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

    // tell webgl to use our program when drawing
    gl.useProgram(programInfo.program);

    // set shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );

    // tell webgl to pull the positions from the position buffer into the vertexPosition attribute
    setPositionAttribute(gl, buffers, programInfo);
    setColorAttribute(gl,buffers,programInfo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,buffers.indices);



    const vertexCount = 6;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;

    for (const cube of custObjs){
        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix, modelViewMatrix, [cube.getX(),cube.getY(),-15.0]);
        gl.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix,  
        );
        gl.drawElements(gl.TRIANGLES,vertexCount,type,offset);
    }

    

}

/**
 * @param {WebGLRenderingContext} gl
 * @param {Object} programInfo
 * @param {Object} buffers
 */

// tell webgl how ot pull out the positions from the position buffer into the vertexPosition Attrib
function setPositionAttribute(gl,buffers,programInfo){
    const numComponents = 3; // pull out 2 values per iteration
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER,buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );

    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

}


function setColorAttribute(gl,buffers,programInfo){
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

