VR8.Buffer = function() {
    var gl = VR8.webGL;

    this.buffer = null;
    this.render_type = gl.STATIC_DRAW;
    this.size = 0;
    this.stride = 0;

    this.color_size = 4;
    this.vertex_size = 3;
    this.texture_size = 2;

    this.no_color_data = true;
    this.no_texture = true; 

    this.geometry = function(g) {
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(g.points),
            this.render_type
        );

        this.size = g.size;
        this.sides = g.points.length / g.size;
        this.stride = g.size * Float32Array.BYTES_PER_ELEMENT;
    }

    this.setRenderType = function(renderType){
        if(gl[renderType] > 0) {
            this.render_type = gl[renderType];
            console.log('render type-> ', renderType);
        }
    }
    

    this.update = function(g) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(g.points),
            this.render_type
        );

    }

    this.upload_vertex = function(shader_position) {
        gl.vertexAttribPointer(shader_position,
            this.vertex_size,
            gl.FLOAT,
            false,
            this.stride,
            0);
    }

    this.upload_texture = function(shader_texture) {
        if (this.no_texture)
            return;

        var offset = this.vertex_size * Float32Array.BYTES_PER_ELEMENT;

        if(!this.no_color_data)
            offset += this.color_size * Float32Array.BYTES_PER_ELEMENT;        

        gl.vertexAttribPointer(
            shader_texture,
            this.texture_size,
            gl.FLOAT,
            false,
            this.stride,
            offset
        );
    }

    this.upload_colors = function(shader_color) {
        if (this.no_color_data)
            return;

        gl.vertexAttribPointer(shader_color,
            this.color_size,
            gl.FLOAT,
            false,
            this.stride,
            this.vertex_size * Float32Array.BYTES_PER_ELEMENT
        );
    }
}
