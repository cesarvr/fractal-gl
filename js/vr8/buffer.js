'use strict'

var Factory = require('../utils/factory');

Buffer = function(Core, that) {

    var that = that || {};

    var gl = Core;

    var buffer = null;
    var bufferType = gl.STATIC_DRAW;

    var size = 0;
    var stride = 0;

    var color_size = 4;
    var vertex_size = 3;
    var texture_size = 2;

    var no_color_data = false;
    var no_texture = false;



    if (buffer === null)
        buffer = gl.createBuffer();

    that.memoryLayout = function(bufferObject) {
        size = bufferObject.size;
        that.sides = bufferObject.points.length / bufferObject.size;
        stride = bufferObject.size * Float32Array.BYTES_PER_ELEMENT;
    }

    that.geometry = function(g) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(g.points),
            bufferType
        );

        that.memoryLayout(g);
    }

    that.setBufferType = function(type) {
        if (gl[type] > 0)
            bufferType = gl[type];

        console.log('render type-> ', renderType);
    }


    that.prepare = function(){
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    };

    that.update = function(g) {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(g.points),
            bufferType
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
};

module.exports = new Factory(Buffer);
