(function() {
    VR8.Geometry = VR8.Geometry || {};

    VR8.Geometry.Vertex = {

        data: [],

        pack: function(data) {
            var len = data.length;
            for (var x = 0; x < len; x++)
                this.data.push(data[x]);
        },

        save: function(position, color, texture) {

            this.pack(position);
            this.pack(texture);

            if (color) {
                this.pack(color);
                this.data.push(1.0); // alpha for color;
            }

            return this;
        },

        clear: function() {
            this.data = [];
        }
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

});
