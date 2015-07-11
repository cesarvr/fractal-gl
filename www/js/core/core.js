var VR8 = VR8 || {};

VR8.Core = function(fullscreen) {
    var _createCanvas = function() {
        _canvas = document.createElement('canvas');
        _canvas.setAttribute('width', 800);
        _canvas.setAttribute('height', 600);
        _canvas.setAttribute('style', 'position:absolute; left:0px; top:0px; border-style:none; background-color:#455A64'); 
        
        return _canvas;
    }


    var init = function() {
        var _canvas = _createCanvas();
        document.body.appendChild(_canvas);

        try {

            var gl = _canvas.getContext("webgl") || _canvas.getContext("experimental-webgl");

            if (!gl) {
                console.log('Error no webGL context found.');
                alert('no WebGL context found.')
            }


            if (fullscreen) {
                _canvas.style.width = window.innerWidth + "px";
                _canvas.style.height = window.innerHeight + "px";
                _canvas.width = window.innerWidth;
                _canvas.height = window.innerHeight;
            }

            VR8.W = _canvas.width;
            VR8.H = _canvas.height;
        } catch (e) {
            console.log(e);
        }

        if (!gl){
            console.log('can init WebGL :[');
        }else{
            VR8.webGL = gl;
        }
    }();
}

VR8.Scene2D = function() {

    var Width = VR8.W;
    var Height = VR8.H;
    var gl = VR8.webGL;
    this.shader = {};
    this.camera = {};


    /* this method can be override for custom functionality. */

    this.clean = function() {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
    }

    this.prepare = function(entity) {
        gl.viewport(0, 0, Width, Height);
        this.shader.prepare({
            'MV': this.camera,
            'P': entity.model
        });

        gl.bindBuffer(gl.ARRAY_BUFFER, entity.buffer.buffer);
        
        entity.buffer.upload_vertex(this.shader.vars.position);
        entity.buffer.upload_colors(this.shader.vars.colors);
    }

    this.draw = function(entity) {
        if (typeof gl[entity.drawType] === 'number')
            gl.drawArrays(gl[entity.drawType], 0, entity.buffer.sides);
        else
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, entity.buffer.sides);
    }

    this.render = function(e) {
        this.prepare(e);
        this.draw(e);
    }
}
