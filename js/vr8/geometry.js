var Geometry = Geometry || {};

Geometry.Vertex = function(_that) {

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



VR8.Geometry.Morph = {
    morphing: [],

    savePoints: function(p1, p2, color) {

        this.morphing.push({
            pointA: new Vector(p1),
            pointB: new Vector(p2),
            color1: color,
            color2: rgbc(209, 209, 209)
        });

        return this;
    },

    step: function(delta) {

        if (delta >= 1.00001) return this;
        this.clear();

        var self = this;
        var len = this.morphing.length;

        for (var i = 0; i < len; i++) {
            var seg = this.morphing[i];

            var p1 = seg.pointA.v;
            var p2 = VR8.Lerp(seg.pointA.copy(), seg.pointB, delta).v;
            var color = VR8.Lerp(seg.color1.copy(), seg.color2.copy(), delta).v;


            this.save(p1, color);
            this.save(p2, color);
        }

        return this;
    }
};

module.exports = Geometry;
