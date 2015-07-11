VR8.Shader = function() {
    var gl = VR8.webGL;
    this.program = null;
    this.vars = {};

    this.add = function(shaderCode, type) {
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

    this.use = function() {
        gl.useProgram(this.program);
    }

    this.attribute = function(param) {
        this.vars[param] = gl.getAttribLocation(this.program, param);
        gl.enableVertexAttribArray(this.vars[param]);
        return this;
    }

    this.uniform = function(param) {
        this.vars[param] = gl.getUniformLocation(this.program, param);
        return this;
    }

    this.create = function(code) {
        if (code && code.vertex && code.fragment) {
            this.link(code.vertex, code.fragment);
            code.init(this);
        }
    }

    this.link = function(vertex, fragment) {
        this.program = gl.createProgram();

        gl.attachShader(this.program, this.add(vertex, 'vertex'));
        gl.attachShader(this.program, this.add(fragment, 'fragment'));
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.log('Error linking shaders.')
            throw 'error linking shaders';
        }
    }




    this.prepare = function(varsGL) {
        for (var var_name in varsGL) {
            var value = varsGL[var_name];
            gl.uniformMatrix4fv(this.vars[var_name], false, value);
        }
    }



}
