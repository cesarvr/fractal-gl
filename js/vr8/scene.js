'use strict'

var Factory = require('../utils/factory');

var Scene = function(Core, that) {

    var that = that || {};
    var gl = Core;

    var shader = null;
    var camera = null;

    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    /* this method can be override for custom functionality. */

    that.setViewPort = function(Width, Height){
      gl.viewport(0, 0, Width, Height);
    }

    that.setClearColor = function(clear){
        gl.clearColor(clear.r , clear.g , clear.b, 1.0);
    }

    that.clean = function() {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    that.prepare = function(entity) {
        this.shader.prepare({
            'MV': this.camera,
            'P': entity.model
        });

        entity.buffer.prepare();
        entity.buffer.upload_vertex(this.shader.vars.position);
        entity.buffer.upload_colors(this.shader.vars.colors);
        entity.buffer.upload_texture(this.shader.vars.texture);

        if (entity.texture)
            entity.texture.prepare(this.shader.vars);
    };

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

    return that;
}


module.exports = new Factory(Scene);
