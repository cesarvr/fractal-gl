(function() {

    var a = document.getElementById('canvas-surface');


    /* VR8 Lib  */
    var core = new VR8.Core(true, document.getElementById('webgl-div'));
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();

    var texture = new VR8.Texture();
    var Assets = VR8.Utils.Assets;

    shader.create(VR8.Script);
    scene.shader = shader;
    scene.camera = camera;

    var deg_rad = function(angle) {
        return angle * Math.PI / 180;
    };

    var Vertex = function() {
        this.vertexArray = [];


        this.save = function(vertex) {
            var self = this;
            Object.keys(vertex)
                .forEach(function(attr) {
                    var obj = vertex[attr];
                    for (var i = 0; i < obj.length; i++) {
                        self.vertexArray.push(obj[i]);
                    }
                });
            return this;
        };


        this.clear = function() {
            this.vertexArray = [];
        }

    }

    var vert = new Vertex();

    var adapt = function(p) {
        return new Vector([p.x, p.y, 0.0]);
    }

    var triangle = function(p1, p2, p3, p4) {

        var v1 = adapt(p1);
        var v2 = adapt(p2);
        var v3 = adapt(p3);
        var v4 = adapt(p4);

        vert.save({
            point1: v1.v,
            texture1: [0, 0],

            point2: v2.v,
            texture2: [1, 0],

            point3: v3.v,
            texture3: [0, 1],

            point4: v4.v,
            texture4: [1, 1],
        });

    }


    triangle({
        x: -12.0,
        y: -10.0
    }, {
        x: 30,
        y: -10.0
    }, {
        x: -12.0,
        y: 30.0
    }, {
        x: 30.0,
        y: 30.0
    }, 3);




    buffer.geometry({
        points: vert.vertexArray,
        size: 5,
    });

    buffer.no_texture = false;



    var t = new VR8.Transform();
    t.translate(15, 15, 0).scale(1, 1, 0);

    var entity = {
        texture: texture,
        buffer: buffer,
        model: t.m,
    }

    var sin = Math.sin;
    var stp = 0.1;
    var anim = 0;

    function render() {
        stp += 0.1;
        var ms = 17;
        var step = (1 / 60) * 1000;
        var dt = ((ms / step) | 0) * step;

        requestAnimFrame(render);
        scene.clean();

        window.text(stp);
        scene.render(entity);
    }

    /*            Assets.Fetch(['img/berry.png'], function(assets) {
                    debugger;
                    texture.loadImage(assets[0]);
                    render();
                });

    */



    function genTexture(textureSize) {

        var pix = [];

        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                var xor = x ^ y;
                pix.push(xor) // r
                pix.push(xor) // g
                    // pix.push(xor) // b 
            }
        }
        return pix;
    }

    function genTables(textureSize) {
        var dtable = [],
            angleTable = [];

        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                var angle = 0,
                    distance = 0;
                distance = Math.round((32.0 * textureSize / v3.len([(x - textureSize / 2.0), (y - textureSize / 2.0), 0])) % textureSize);
                angle = Math.round(0.5 * textureSize * Math.atan2(y - textureSize / 2.0, x - textureSize / 2.0) / Math.PI);
                dtable[(x * textureSize) + y] = distance;
                angleTable[(x * textureSize) + y] = angle;
            }
        }
        return {
            distances: dtable,
            angles: angleTable
        };
    }

    function drawTexture(xorText, tables, textureSize, delta) {

        var sx = textureSize * 1.0 * delta;
        var sy = textureSize * 0.25 * delta;
        var buffer = [];

        for (var x = 0; x < textureSize; x++) {
            for (var y = 0; y < textureSize; y++) {
                var color = xorText[(((tables.distances[(x * textureSize) + y] + sx) % textureSize) * textureSize) +
                    ((tables.angles[(x * textureSize) + y] + sy) % textureSize)];
                if (typeof color === undefined) debugger;
                buffer.push(color); //r 
                buffer.push(color); //g
                buffer.push(color); //b
            }
        }
        return buffer;
    }



    var textureSize = 256;
    var xorTexture = genTexture(textureSize);
    var tables = genTables(textureSize);
    var step = 0.4;

    function text() {
        step += 0.1;
        var gl = 0;
        var init = function() {
            var pixels = new Uint8Array(drawTexture(xorTexture, tables, textureSize, 1));
            //var pixels = new Uint8Array(genTexture(textureSize));

            texture.Extend({
                initialize: function() {

                    gl = this.gl;

                    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
                    gl.bindTexture(gl.TEXTURE_2D, this.texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, textureSize, textureSize, 0, gl.RGB,
                        gl.UNSIGNED_BYTE, pixels);

                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                }
            });
        }()
        

        return function(delta){

            var pixels = new Uint8Array(drawTexture(xorTexture, tables, textureSize, delta));
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, textureSize, textureSize, 0, gl.RGB,
                        gl.UNSIGNED_BYTE, pixels);


        }
    }



    window.text = text();
    window.render = render;

    render();

}());
