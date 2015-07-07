(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(a, true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var frag = document.getElementById('fragment-shader').innerHTML;
    var vert = document.getElementById('vertex-shader').innerHTML;
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();

    var init_shader = function() {

        shader.link(vert, frag);
        shader.use();

        shader
            .attribute('position')
            .attribute('colors')
            .uniform('MV')
            .uniform('P');

        scene.shader = shader;
        scene.camera = camera;
    }();

    var line = function() {
        var vec = null;

    }

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
        return new Float32Array([v[0] /scalar, v[1] / scalar, v[2] / scalar]);
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


    var _msh = function() {
        this.array = null;
        this.copy = function(v, c) {
            var tmp = this.array;
            this.array = new Float32Array(tmp.length + v.length + c.length);
            this.array.set(tmp, 0);
            this.array.set(v, tmp.length);
            this.array.set(c, tmp.length + v.length);
        }

        this.set = function(pos, color) {
            var v = new Float32Array(pos.length + color.length);
            v.set(pos, 0);
            v.set(color, pos.length);
            if (!this.array)
                this.array = v;
            else {
                this.copy(pos, color);
            }
        }
    };

    var msh = new _msh();
    var point = function(p1, p2, n) {
        var c = {};
        
        c.red = new Vector4(1, 0.5, 0.0, 1.0);
        c.blue = new Vector4(0.2, 0.2, 1, 1.0);
        c.white = new Vector4(0.6, 0.6, 1, 1.0);
        c.green = new  Vector4(0.2, 1, 0.2, 1.0);

        var color = c[n] || c.white;

        msh.set(p1, color.v);
        msh.set(p2, color.v);
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
                        v3.mul_scalar([cos(angle-Math.PI / 3), sin(angle-Math.PI / 3), 0], seg) );


        if (limit > 0) {
            snow_flake(p1,pa,limit-1);
            snow_flake(pa,pb,limit-1);
            snow_flake(pb,pc,limit-1);
            snow_flake(pc,p2,limit-1);

        } else { 
            point(p1, pa);
            point(p2, pc);
            point(pa, pb);
            point(pc, pb);
        }
    }





    var p1 = new Vector(20,  0.0, 0.0);
    var p2 = new Vector(0.0, 30.0, 0.0);
    var p3 = new Vector(40.0,30.0, 0.0);
    
    var color = new Vector4(0.3, 1.0, 0.3, 1.0);
    var msh = new _msh();

    point(p1.v, p2.v, 'green');
    
    point(p1.v, p3.v, 'green');
    point(p2.v, p3.v, 'green');



    snow_flake(p2.v, p1.v, 4);
    snow_flake(p1.v, p3.v, 4);
    snow_flake(p3.v, p2.v, 4);
    
    var vertex = new Float32Array([0.0, 0.0, 0.0, 1.0, 0.5, 0.3, 1.0,
        10.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0
    ]);
    buffer.geometry({
        points: msh.array,
        size: 7
    });




    buffer.no_color_data = false;

    var t = new VR8.Transform();
    t.translate(5, 4).scale(1, 1, 0);




    var entity = {
        buffer: buffer,
        model: t.m,
        drawType: 'LINES'
    }

    function update() {
        return null;
    }

    function render() {
        update();

        requestAnimFrame(render);
        scene.clean();
        scene.render(entity);
    }

    //init();
    render();
}());
