(function() {
    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(a, true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var frag = document.getElementById('fragment-shader').innerHTML;
    var vert = document.getElementById('vertex-shader').innerHTML;
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();
    var pos = {
        x: 0,
        y: 0
    };
    var mov = {
        x: 0,
        y: 0
    };
    var zoomOut = false;


    a.addEventListener('click', function() {
        zoomOut = true;
    });

    shader.link(vert, frag);

    var init_shader = function() {
        var p = shader.program;
        shader.use();

        shader
            .attribute('position')
            .attribute('colors')
            .uniform('MV')
            .uniform('P');

        scene.shader = shader;
        scene.camera = camera;
    }();

    var Point = function(v) {
        var buffer = new VR8.Buffer();
        var t = new VR8.Transform();
        var position;
        var entity = {
            buffer: buffer,
            model: t.m,
            drawType: 'POINTS'
        };
        buffer.no_color_data = false;

        var vertex = new Float32Array([0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0]);
        buffer.geometry({
            points: vertex,
            size: 7
        });

        if (v) {
            t.translate(v.v[0], v.v[1], v.v[2]);
            pos = v;
        }

        return {
            setColor: function(v) {
                vertex[3] = v[0];
                vertex[4] = v[1];
                vertex[5] = v[2];
            },

            getBuffer: function() {
                return buffer
            },
            setPos: function(v) {
                t.translate(v.v[0], v.v[1], v.v[2]);
            },

            getPos: function() {
                return v;
            },

            getEntity: function() {
                return entity;
            }
        }
    };


    var ucirclePlot = function(m) {
        var x =20;
        var y = 20;

        var plot = [];
        for (var i = 0; i < 14; i += 0.01) {
            plot.push(new Vector(x + Math.cos(i)*m ,  y+Math.sin(i)*m ));
        }
        return plot;

    }



    var tanPlot = function(m) {
        var x = 0;
        var y = 20;

        var plot = [];
        for (var i = 0; i < 100; i += 0.1) {
            plot.push(new Vector(x + i, y + Math.tan(i) * m));
        }
        return plot;

    }

    var sinPlot = function(m) {
        var x = 0;
        var y = 20;

        var plot = [];
        for (var i = 0; i < 100; i += 0.1) {
            plot.push(new Vector(x + i, y + Math.sin(i) * m));
        }
        return plot;
    };


    var plotter = function() {
        var points = [];

        return function(fn) {
            if (points.length === 0) {
                fn.forEach(function(vec) {
                    points.push(new Point(vec))
                });
            }
            return points;
        }
    }();

    //triangle.cord({x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0}, 9);

    a = new Vector(15, 15, 0.0);
    b = new Vector(20, 15, 0.0);
    c = new Vector(20, 20, 0.0);

    var pointA = new Point(a);
    var pointB = new Point(b);
    var pointC = new Point(c);


    function init() {}
    var p = {
        x: 0,
        y: 0
    };

    function update() {

    }

    function render() {
        update();

        requestAnimFrame(render);
        scene.clean();
        plotter(tanPlot(0.5)).forEach(function(p) {
            scene.render(p.getEntity());
        });
    }

    init();
    render();

}());
