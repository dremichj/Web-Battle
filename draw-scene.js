
/**
 * @param {WebGLRenderingContext} gl
 * @param {Object} programInfo
 * @param {Object} buffers
 */

export function drawScene(gl, programInfo, buffers,custObjs) {
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
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

    /*const fieldOfView = (45 * Math.PI) / 180; // turn to radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100;*/
    const projectionMatrix = mat4.create();


    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const width = 7;
    const height = width/aspect;
    mat4.ortho(projectionMatrix, -width, width, -height, height, -1, 1);

    // tell webgl to use our program when drawing
    gl.useProgram(programInfo.program);

    // Bind vertex position buffer
    {
        const numComponents = 3;
        const type = gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
        gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
    }

    // Bind vertex color buffer
    {
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
        offset
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    }

    // set shader uniforms
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix,
    );

    // tell webgl to pull the positions from the position buffer into the vertexPosition attribute
   
    for (const obj of custObjs){
        // create viewmodelmatrix
        const modelViewMatrix = mat4.create();
        mat4.translate(modelViewMatrix, modelViewMatrix, [obj.getX(),obj.getY(),0]);
        gl.uniformMatrix4fv(
          programInfo.uniformLocations.modelViewMatrix,
          false,
          modelViewMatrix,  
        );
        // choose which position buffer based on shape
        let positionBuffer, colorBuffer, vertexCount, drawMode;
        switch (obj.shape){
            default:
                positionBuffer = buffers.positionSquare;
                colorBuffer = buffers.colorSquare
                vertexCount = 4;
                drawMode = gl.TRIANGLE_STRIP;
                break;
            case "triangle":
                positionBuffer = buffers.positionTriangle;
                colorBuffer = buffers.colorTriangle
                vertexCount = 3;
                drawMode = gl.TRIANGLES;
                break;
            case "circle":
                positionBuffer = buffers.positionCircle;
                colorBuffer = buffers.colorCircle
                vertexCount = 34;
                drawMode = gl.TRIANGLE_FAN;
                break;

        }
        // bind position buffer
        gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition,
            3, gl.FLOAT, false, 0,0
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

        // bind color buffer
        gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexColor,
            4, gl.FLOAT, false,0,0
        );
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);

        
        gl.drawArrays(drawMode,0,vertexCount);
    }

    

}
