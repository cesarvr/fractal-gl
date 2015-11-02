'use strict'

var Factory = require('../utils/factory');
var Vec3 = require('../mathv2/vector').Vec3;
var Vec4 = require('../mathv2/vector').Vec4;
var Mat4 =  require('../mathv2/matrix');
var Transform =  require('../mathv2/transform');

var Renderable = function(geometry, color, texture) {
    this.geometry = geometry || Vec3.New();
    this.color = color || Vec4.New(0.9, 0.9, 0.9, 1.0);
    this.texture = setUV(this.geometry) || {
        u: 0,
        v: 0
    };
};


var setUV = function(vec2){
    var texture = {u:0, v:0};


    var tmp = vec2.normalize();

    return {u: Math.ceil(tmp.x) , v: Math.ceil(tmp.y)};
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


    that.plane = function(width, height){
        that.geometry.push( new Renderable( Vec3.New(-width, -height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
        that.geometry.push( new Renderable( Vec3.New(width,  -height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
        that.geometry.push( new Renderable( Vec3.New(-width,  height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
        that.geometry.push( new Renderable( Vec3.New(width,   height ), Vec4.New(0.8, 0.8, 0.8, 1.0 )));
        return that;
    };

    that.circle = function( _sides, radius) {

        var cos = Math.cos;
        var sin = Math.sin;
        var PI = Math.PI;

        var sides = _sides || 5;
        var ucircle = (2 * PI);
        that.geometry = [];

        for (var x = 0; x <= ucircle; x += (ucircle / sides)) {
            var vertex = Vec3.New(radius * cos(x), radius * sin(x));
            console.log('->', vertex);
            that.geometry.push( new Renderable( vertex, Vec4.New(0.8, 0.8, 0.8, 1.0 ), setUV(vertex) ) );
            
           // that.geometry.push( new Renderable( Vec3.New(), Vec4.New(), setUV(Vec3.New()) ) ); //center.
        }

        return that;
    };

    return that;
};


module.exports = new Factory(Polygon);
