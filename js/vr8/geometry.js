'use strict'

var Factory = require('../utils/factory');


var Vertex = function(_that) {

    var that = _that || {};
    var data = [];

    that.pack = function(vec) {
        var len = vec.length;
        for (var x = 0; x < len; x++)
            data.push(vec[x]);
    };

    that.save = function(position, color, texture) {

        that.pack(position);
        that.pack(texture);

        if (color) {
            that.pack(color);
            data.push(1.0); // alpha for color;
        }

        return that;
    };

    that.clear = function() {
        data = [];
    };

    that.getData = function() {
        return data;
    };

    return that;
};


var Morph = {
    morphing: [],

    savePoints: function(initalVector, desdestinyVector, color) {

        this.morphing.push({
            pointA: new Vector(initalVector),
            pointB: new Vector(destinyVector),
            color1: color,
            color2: rgbc(209, 209, 209)
        });

        return this;
    },

    step: function(delta) {

        if (delta >= 1.0) return this;
        this.clear();

        var self = this;
        var len = this.morphing.length;

        for (var i = 0; i < len; i++) {
            var segment = this.morphing[i];

            var initalVector = segment.pointA.v;
            var desdestinyVector = VR8.Lerp(segment.pointA.copy(), segment.pointB, delta).v;
            var color = VR8.Lerp(segment.color1.copy(), segment.color2.copy(), delta).v;

            this.save(initalVector, color);
            this.save(destinyVector, color);
        }

        return this;
    }
};

var Geometry = { Vertex: Vertex, Morph: Morph };

module.exports = new Factory(Geometry);
