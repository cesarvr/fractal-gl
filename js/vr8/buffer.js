VR8.Buffer = function(webGLContext, that) {

    var that = that || {};

    var gl = WebGLContext;

    var buffer = null;
    var render_type = gl.STATIC_DRAW;

    var size = 0;
    var stride = 0;

    var color_size = 4;
    var vertex_size = 3;
    var texture_size = 2;

    var no_color_data = true;
    var no_texture = true;



    that.initBuffer = function() {
        if (that.buffer === null)
            buffer = gl.createBuffer();
    }

    that.memoryLayout = function(bufferObject) {
        size = bufferObject.size;
        sides = bufferObject.points.length / bufferObject.size;
        stride = bufferObject.size * Float32Array.BYTES_PER_ELEMENT;
    }

    that.geometry = function(g) {
        this.initBuffer();
        this.editGeometry(g);
    }

    that.editGeometry = function(g) {
        this.initBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(g.points),
            render_type
        );

        that.memoryLayout(g);
    }

    that.setRenderType = function(renderType) {
        if (gl[renderType] > 0) {
            render_type = gl[renderType];
            console.log('render type-> ', renderType);
        }
    }


    that.update = function(g) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(g.points),
            render_type
        );
    }

    that.upload_vertex = function(shader_position) {
        gl.vertexAttribPointer(shader_position,
            vertex_size,
            gl.FLOAT,
            false,
            stride,
            0);
    }

    that.upload_texture = function(shader_texture) {
        if (no_texture)
            return;

        var offset = vertex_size * Float32Array.BYTES_PER_ELEMENT;

        if (!no_color_data)
            offset += color_size * Float32Array.BYTES_PER_ELEMENT;

        gl.vertexAttribPointer(
            shader_texture,
            texture_size,
            gl.FLOAT,
            false,
            stride,
            offset
        );
    }

    that.upload_colors = function(shader_color) {
        if (no_color_data)
            return;

        gl.vertexAttribPointer(shader_color,
            color_size,
            gl.FLOAT,
            false,
            stride,
            vertex_size * Float32Array.BYTES_PER_ELEMENT
        );
    }

    return that;
}

modules.export = Buffer;
