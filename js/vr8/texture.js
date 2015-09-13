var Texture = function() {
    this.texture = 0;
    this.gl = VR8.webGL;
    
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


module.export = Texture;
