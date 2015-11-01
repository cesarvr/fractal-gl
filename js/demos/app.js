'use strict';
var tmpl = require('../template/xor.html');
var Core = require('../vr8/core');

var core = new Core({
    fullscreen: true,
    element: document.getElementById('webgl-div')
});

var buffer  = core.createBuffer();
var shader  = core.createShader();
var texture = core.createTexture();

var scene = core.createScene();
var Utils = core.getUtils();



/* config */
scene.setViewPort(core.canvas.x, core.canvas.y);
scene.shader = shader;
scene.camera = Utils.camera.MakeOrtho(0, 50, 50, 0, 1, -1);

shader.create(Utils.util.getshaderUsingTemplate(tmpl()));
/*         */

var geometry = core.createGeometry();

buffer.geometry({
    points: geometry.plane(10, 15).getModel(),
    size: 9
});



/* Generarting XOR Texture */
var textureSize = 512;
var pix = [];

for (var x = 0; x < textureSize; x++) {
    for (var y = 0; y < textureSize; y++) {
        var xor = x ^ y;
        pix.push(xor) // r
        pix.push(xor) // g
        pix.push(xor) // b 
    }
}
/* */

texture.setTexture(new Uint8Array(pix), textureSize, textureSize);

var Transform = core.MLib.Transform.New();
var entity = {
    buffer: buffer,
    model: Transform.translate(25, 25).getMatrix(),
    drawType: 'TRIANGLE_STRIP',
    texture: texture,
};

function render() {
    //Utils.getNextFrame.call(this, render);
    //window.requestAnimationFrame(render);
    scene.clean();
    scene.render(entity);
};

render();