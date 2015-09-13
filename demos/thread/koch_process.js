(function() {

    if (self.importScripts) {
        self.importScripts('http://cesarvr.github.io/fractal-gl/js/math/vector.js');
    }

    var rgbc = function(r, g, b) {
        var v = new Float32Array([r, g, b]);
        v = v3.div_scalar(v, 250);
        return new Vector(v);
    }

    var tron = rgbc(15, 15, 15);


    var extend = function(obj) {

        var proto = obj.prototype;

        for (var keys in this) {
            proto[keys] = this[keys];
        }
    }

    var VertexBuffer = {

        vertexArray: [],

        pack: function(data) {
            var len = data.length;
            for (var x = 0; x < len; x++)
                this.vertexArray.push(data[x]);
        },

        save: function(pos, color) {

            this.pack(pos);
            this.pack(color);

            if(color.length>0)
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
                color2: rgbc(209, 209, 209)
            });

            return this;
        },

        step: function(delta) {

            if (delta > 1) return this;
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

    Vertex.prototype.snowFlake = function(p1, p2, limit) {
        var line = v3.sub(p2, p1);
        var len = v3.len(line);
        var seg = len / 3;
        var norm = v3.normalize(line);
        var angle = Math.atan2(line[1], line[0]);
        var cos = Math.cos,
            sin = Math.sin;

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
            this.snowFlake(p1, pa, limit - 1);
            this.snowFlake(pa, pb, limit - 1);
            this.snowFlake(pb, pc, limit - 1);
            this.snowFlake(pc, p2, limit - 1);

        } else {
            this.savePoints(p1, pa, tron);
            this.savePoints(p2, pc, tron);
            this.savePoints(pa, pb, tron);
            this.savePoints(pc, pb, tron);
        }
    }

    Vertex.prototype.snowAdapter = function(args) {
        var p1 = args.p1;
        var p2 = args.p2;
        var recursive = args.recursive;

        this.snowFlake(p1, p2, recursive);
    }

    Vertex.prototype.interpolate = function(step) {
        return this.step(step).vertexArray;
    }


    var WorkerClient = function(_object) {
        this.object = _object;
        var _this = this;

        self.addEventListener('message', function(e) {
            _this.execute(e.data);
        });

        this.execute = function(msg) {
            _this.end({
                cmd: msg.cmd,
                ret: this.object[msg.cmd](msg.args) || true
            });
        }

        this.end = function(args) {
            this.finishedTask = true;
            self.postMessage(args);
        }
    }

    var vert = new Vertex();
    var thread = new WorkerClient(vert);


}());
