(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();

    shader.create(VR8.Stock2D);
    scene.shader = shader;
    scene.camera = camera;

    var deg_rad = function(angle) {
        return angle * Math.PI / 180;
    };



    var extend = function(obj) {

        var proto = obj.prototype;

        for (var keys in this) {
            proto[keys] = this[keys];
        }
    }

    var VertexBuffer = {

        vertexArray: [],

        save: function(pos, color) {
            for (var p in pos) {
                this.vertexArray.push(pos[p]);
            }
            for (var c in color) {
                this.vertexArray.push(color[c]);
            }
            this.vertexArray.push(1.0); // alpha for color;

            return this;
        },

        clear: function() {
            this.vertexArray = [];
        },

        extend: extend
    };


    var Morph = {
        morphing: [],

        savePoints: function(p1, p2, color) {

            this.morphing.push({
                pointA: new Vector(p1),
                pointB: new Vector(p2),
                color1: color,
                color2: rgbc(173, 173,  209)
            });

            return this;
        },

        step: function(delta) {

            if(delta > 1) return this;
            var self = this;

            self.clear();

            this.morphing.forEach(function(seg) {
                var p1 = seg.pointA.v;
                var p2 = VR8.Lerp(seg.pointA.copy(), seg.pointB, delta).v;
                var color = VR8.Lerp(seg.color1.copy(), seg.color2.copy(), delta).v;


                self.save(p1, color);
                self.save(p2, color);
            });
            return this;
        },

        extend: extend
    }

    var Vertex = function() {
        this.vertexArray = [];
        this.morphing = [];
    };
    VertexBuffer.extend(Vertex);
    Morph.extend(Vertex);

    var vert;

    var rgbc = function(r, g, b) {
        var v = new Float32Array([r, g, b]);
        v = v3.div_scalar(v, 250);
        return new Vector(v);
    }

    var point = function(p1, p2, n) {
        var c = {};

        c.red = new Vector4(1, 0.5, 0.0, 1.0);
        c.blue = new Vector4(0.2, 0.2, 1, 1.0);
        c.white = new Vector4(0.22, 0.22, 0.22, 1.0);
        c.green = new Vector4(0.2, 1, 0.2, 1.0);
        c.tron = rgbc(210, 234, 252);

        var color = c[n] || c.white;


        vert.savePoints(p1, p2, color);
    }


    var snow_flake = function(p1, p2, limit) {
        var line = v3.sub(p2, p1);
        var len = v3.len(line);
        var seg = len / 3;
        var norm = v3.normalize(line);
        var angle = Math.atan2(line[1], line[0]);
        var cos = Math.cos,
            sin = Math.sin;

        var vvr = []

        var ratio = v3.div_scalar(line, 3);

        /*
         *
         *                    pb
         *                    /\
         *                   /  \
         *                  /    \
         *      p1 ------ pa      pc ------- p2
         *
         *
         *
         * */

        var pa = v3.add(p1, ratio);
        var pc = v3.sub(p2, ratio);
        var pb = v3.add(pa,
            v3.mul_scalar([cos(angle - Math.PI / 3), sin(angle - Math.PI / 3), 0], seg));


        if (limit > 0) {
            snow_flake(p1, pa, limit - 1);
            snow_flake(pa, pb, limit - 1);
            snow_flake(pb, pc, limit - 1);
            snow_flake(pc, p2, limit - 1);

        } else {
            point(p1, pa, 'tron');
            point(p2, pc, 'tron');
            point(pa, pb, 'tron');
            point(pc, pb, 'tron');
        }
    }

    function poly(sides, r) {
        var cos = Math.cos;
        var sin = Math.sin;
        var PI = Math.PI;
        var tmp = null;
        var s = sides || 5;
        for (var x = 0; x <= (2 * PI); x += ((2 * PI) / sides)) {
            var p = new Vector([15 * cos(x), 20 * sin(x), 0.0]);
            console.log(p.v);
            if (tmp) {
                point(tmp.v, p.v, 'tron');
                if (r)
                    snow_flake(p.v, tmp.v, 3);
                else
                    snow_flake(tmp.v, p.v, 3);
            }
            tmp = p;
        }
    }



    buffer.no_color_data = false;

    var t = new VR8.Transform();
    t.translate(25, 25, 0).scale(1, 1, 0);

    var entity = {
        buffer: buffer,
        model: t.m,
        drawType: 'LINES'
    }

    var sin = Math.sin;
    var stp = 0.04;
    var anim = 0;
    var entity = {};
    var dim = 2;
    var inside = false;

    function render() {

        var ms = 17;
        var step = (1 / 60) * 1000;
        var dt = ((ms / step) | 0) * step;

        anim += stp;


        if (dim > 8) {
            inside = !inside;
            dim = 2;
        }


        if (anim > 5 || dim < 3) {

            vert = new Vertex();
            poly(dim, inside);
            anim = 0;
            dim++;
        }

        buffer.geometry({
            points: vert.step(anim).vertexArray,
            size: 7
        });
        entity = {
            buffer: buffer,
            model: t.m,
            drawType: 'LINES'
        }






        requestAnimFrame(render);
        scene.clean();
        scene.render(entity);
    }

    render();

}());
