'use strict'

var Factory = require('../utils/factory');

var Shader = function(Core, that) {
    var gl = Core;
    var program = null;
    var vars = {};

    that.add = function(shaderCode, type) {
        var shader = null;

        if (type === 'fragment')
            shader = gl.createShader(gl.FRAGMENT_SHADER);

        if (type === 'vertex')
            shader = gl.createShader(gl.VERTEX_SHADER);

        if (!shader) {
            throw 'invalid shader code!!';
            console.log('invalid shader code' + shaderCode);
        }

        gl.shaderSource(shader, shaderCode);
        gl.compileShader(shader);

        return shader;
    }

    that.use = function() {
        gl.useProgram(program);
    }

    that.attribute = function(param) {
        vars[param] = gl.getAttribLocation(program, param);
        gl.enableVertexAttribArray(vars[param]);
        return this;
    }

    that.uniform = function(param) {
        vars[param] = gl.getUniformLocation(program, param);
        return this;
    }

    that.create = function(code) {
        if (code && code.vertex && code.fragment) {
            link(code.vertex, code.fragment);
            code.init(that);
        }
    }

    that.link = function(vertex, fragment) {
        program = gl.createProgram();

        gl.attachShader(program, add(vertex, 'vertex'));
        gl.attachShader(program, add(fragment, 'fragment'));
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.log('Error linking shaders.')
            throw 'error linking shaders';
        }
    }

    that.prepare = function(varsGL) {
        for (var var_name in varsGL) {
            var value = varsGL[var_name];
            gl.uniformMatrix4fv(vars[var_name], false, value);
        }
    }
}

module.exports = new Factory(Shader);
