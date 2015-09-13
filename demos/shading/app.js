(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 100, 100, 0, 1, -1);
    var scene = new VR8.Scene2D();
    var texture = new VR8.Texture();
    var Assets = VR8.Utils.Assets;

    shader.create(VR8.Script);
    scene.shader = shader;
    scene.camera = camera;

    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms, 2: mb

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);

    scene.setClearColor({
        r: 0.3,
        g: 0.3,
        b: 0.3
    });

    var plane = function() {
        var vertex = VR8.Geometry.Vertex();
        vertex.save([0.0, 0.0, 0.0], null, [0.0, 0.0]);
        vertex.save([50.0, 0.0, 0.0], null, [1.0, 0.0]);
        vertex.save([0.0, 50.0, 0.0], null, [0.0, 1.0]);
        vertex.save([50.0, 50.0, 0.0], null, [1.0, 1.0]);


        return vertex.getData();
    };

    buffer.geometry({
        points: plane(),
        size: 5
    });

    buffer.no_texture = false;

    var t = new VR8.Transform();
    t.translate(25, 25, 0).scale(1, 1, 0);

    entity = {
        texture: texture,
        buffer: buffer,
        model: t.m
    }


    function text(_pixels, textureSize) {
        var pixels = new Uint8Array(_pixels);

        texture.Extend({

            initialize: function() {
                var gl = this.gl;

                gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
                gl.bindTexture(gl.TEXTURE_2D, this.texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, textureSize, textureSize, 0, gl.RGB,
                    gl.UNSIGNED_BYTE, pixels);

                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            }
        });
    }



    var resolution = 512;
    var serve = Spawn.Server();

    serve.setProcessFile('demos/shading/image.js');
    serve.subscribe({
        notify: function(o) {
            text(o.ret, resolution);
            console.log('notify-->', o);
       16}
    });

    var wrk = serve.spawn();
    wrk.execute('perlin', resolution);

    function render() {
        stats.begin();

        scene.clean();
        scene.render(entity);

        stats.end();

        requestAnimFrame(render);
    }

    render();

}());
