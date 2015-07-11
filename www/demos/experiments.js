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

    var v3 = function() {};
    var deg_rad = function(angle) {
        return angle * Math.PI / 180;
    };

    v3.add_scalar = function(v, scalar) {
        return new Float32Array([v[0] + scalar, v[1] + scalar, v[2] + scalar]);
    }

    v3.sub_scalar = function(v, scalar) {
        return new Float32Array([v[0] - scalar, v[1] - scalar, v[2] - scalar]);
    }

    v3.mul_scalar = function(v, scalar) {
        return new Float32Array([v[0] * scalar, v[1] * scalar, v[2] * scalar]);
    }

    v3.div_scalar = function(v, scalar) {
        return new Float32Array([v[0] / scalar, v[1] / scalar, v[2] / scalar]);
    }

    v3.add = function(v1, v2) {
        return new Float32Array([v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]]);
    }

    v3.sub = function(v1, v2) {
        return new Float32Array([v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]]);
    }

    v3.mul = function(v1, v2) {
        return new Float32Array([v1[0] * v2[0], v1[1] * v2[1], v1[2] * v2[2]]);
    }

    v3.len = function(v) {
        return Math.sqrt(((v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2])));
    }

    v3.normalize = function(v) {
        var n = this.len(v);
        return new Float32Array([v[0] / n, v[1] / n, v[2] / n]);
    }
    
    var avertex = [];
    var mset = function(pos , color){
        for(var p in pos){
            avertex.push(pos[p]);
        }
        for(var c in color){
            avertex.push(color[c]);
        }
    }




    var rgbc = function(r, g, b) {
        var v =  new Float32Array([r, g, b]);
        v = v3.div_scalar(v, 250);
        return new Vector4(v[0], v[1], v[2], 1.0);
    }
    
    var point = function(p1, p2, n) {
        var c = {};

        c.red = new Vector4(1, 0.5, 0.0, 1.0);
        c.blue = new Vector4(0.2, 0.2, 1, 1.0);
        c.white = new Vector4(0.12, 0.12, 0.12, 1.0);
        c.green = new Vector4(0.2, 1, 0.2, 1.0);
        c.tron = rgbc(210, 234, 252);

        var color = c[n] || c.white;

        mset(p1, color.v);
        mset(p2, color.v);
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


    var p1 = new Vector(10, 0.0, 0.0);
    var p2 = new Vector(0.0, 30.0, 0.0);
    var p3 = new Vector(20.0, 30.0, 0.0);

    var color = new Vector4(0.3, 1.0, 0.3, 1.0);

    point(p1.v, p2.v, 'white');
    point(p1.v, p3.v, 'white');
    point(p2.v, p3.v, 'white');

    snow_flake(p2.v, p1.v, 4);
    snow_flake(p1.v, p3.v, 4);
    snow_flake(p3.v, p2.v, 4);

    buffer.geometry({
        points: avertex,
        size: 7
    });


    buffer.no_color_data = false;

    var t = new VR8.Transform();
    t.translate(15, 8,0).scale(1, 1, 0);


    var entity = {
        buffer: buffer,
        model: t.m,
        drawType: 'LINES'
    }

    function render() {

        requestAnimFrame(render);
        scene.clean();
        scene.render(entity);
    }

    render();
}());
