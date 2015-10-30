'use strict';
var DIR = '../js/vr8/';

var Core = require('../js/vr8/core');
var Buffer = require('../js/vr8/buffer');
var Shader = require('../js/vr8/shader');
var Texture = require('../js/vr8/texture');
var Camera = require('../js/vr8/camera');
var Scene = require('../js/vr8/scene');
var Geometry = require('../js/vr8/geometry');

var core = new Core(true, document.getElementById('webgl-div'));

var webGL = core.getWebGL();
var buffer = Buffer.New(webGL);
var shader = Shader.New(webGL);
var texture = Texture.New(webGL);

var scene = Scene.New(webGL);
var camera = Camera.New();

var Utils = require('../js/utils/util').New();

/* config */
scene.setViewPort(core.canvas.x, core.canvas.y);
scene.shader = shader;
scene.camera = camera.MakeOrtho(0, 50, 50, 0, 1, -1);

shader.create(Utils.ShaderUtil);
/*         */

var Poly = Geometry.Polygon.New();

var Transform = Geometry.libs.Transform.New();

buffer.geometry({
    points: Poly.circle(20, 10).getModel(),
    size: 9
});

var entity = {
    buffer: buffer,
    model: Transform.translate(25, 25).getMatrix(),
    drawType: 'LINES'
};

function render() {

    //Utils.getNextFrame.call(this, render);
    window.requestAnimationFrame(render);
    scene.clean();
    scene.render(entity);
};

render();
