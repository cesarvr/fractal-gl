'use strict'

var Factory = require('../utils/factory');

/*var Texture = function(Core) {
    this.texture = 0;
    this.gl = Core;
    
    this.initialize = false; 
}

Texture.prototype.Extend = function(options){
    this.texture = this.gl.createTexture();
    options.initialize.bind(this)();
    this.initialize = true; 
}



Texture.prototype.loadImage = function(image) {

    var gl = VR8.webGL;

    this.texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindTexture(gl.TEXTURE_2D, null);
}


Texture.prototype.prepare = function(shader_vars) {
    var gl = VR8.webGL;

    if(!this.initialize) return;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(shader_vars['uSampler'], 0);
}
*/

var Texture = function(Core, that) {
    var gl = Core;
    that.texture = gl.createTexture();


    that.setTexture = function( pixels, width, height) {

        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.bindTexture(gl.TEXTURE_2D, that.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB,
            gl.UNSIGNED_BYTE, pixels);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    };

    that.prepare = function(vars) {
        if (!this.initialize) return;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, that.texture);
        gl.uniform1i(vars['uSampler'], 0);
    };

    return that;
};



module.exports = new Factory(Texture);
