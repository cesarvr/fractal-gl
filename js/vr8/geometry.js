'use strict'

var Factory = require('../utils/factory');
var Vec3 = require('../mathv2/vector').Vec3;
var Vec4 = require('../mathv2/vector').Vec4;
var Mat4 =  require('../mathv2/matrix');
var Transform =  require('../mathv2/transform');

var Renderable = function(geometry, color, texture) {
    this.geometry = geometry || Vec3.NewG();
    this.color = color || Vec4.New(0.5, 0.5, 0.5, 1.0);
    this.texture = texture || {
        u: 0,
        v: 0
    };
};

var Polygon = function(Core, that) {

    that.geometry = [];

    that.getModel = function() {

            var tmp = []; 
        that.geometry.forEach(function(renderable) {
              tmp.push(
            renderable.geometry.x,
            renderable.geometry.y,
            renderable.geometry.z,

            renderable.color.x,
            renderable.color.y,
            renderable.color.z,
            renderable.color.w,

            renderable.texture.u,
            renderable.texture.v
                             );
        });

        return new Float32Array(tmp);
    };


    that.circle = function(_sides, radius) {

        var cos = Math.cos;
        var sin = Math.sin;
        var PI = Math.PI;

        var sides = _sides || 5;
        var ucircle = (2 * PI);
        that.geometry = [];

        for (var x = 0; x <= ucircle; x += (ucircle / sides)) {
            var vertex = Vec3.New(radius * cos(x), radius * sin(x));
            that.geometry.push(new Renderable(vertex))
        }

        return that;
    };

    return that;
};


module.exports = {
    Polygon: new Factory(Polygon),
    libs: {
        Vec3: Vec3,
        Vec4: Vec4,
        Mat4: Mat4,
        Transform: Transform,
    }
};
