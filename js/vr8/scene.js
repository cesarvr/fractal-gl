var Scene2D = function(that) {

    var that = that || {};
    var Width = VR8.W;
    var Height = VR8.H;
    var gl = VR8.webGL;

    var shader = null;
    var camera = null;

    gl.viewport(0, 0, Width, Height);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);


    /* this method can be override for custom functionality. */

    that.setClearColor = function(clear){
        gl.clearColor(clear.r , clear.g , clear.b, 1.0);
    }

    this.clean = function() {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    that.prepare = function(entity) {
        this.shader.prepare({
            'MV': this.camera,
            'P': entity.model
        });

        gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer.buffer);

        entity.buffer.upload_vertex(this.shader.vars.position);
        entity.buffer.upload_texture(this.shader.vars.texture);
        entity.buffer.upload_colors(this.shader.vars.colors);

        if (entity.texture)
            entity.texture.prepare(this.shader.vars);

    }

    that.draw = function(entity) {
        if (typeof gl[entity.drawType] === 'number')
            gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
        else
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
    }

    that.render = function(e) {
        that.prepare(e);
        that.draw(e);
    }
}


module.exports = Scene2D;
