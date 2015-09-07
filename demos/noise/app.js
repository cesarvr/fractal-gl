(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();
    var texture = new VR8.Texture();


    VR8.Script.init = function(shader) {
        shader.use();
        shader
            .attribute('position')
            .attribute('colors')
            .uniform('MV')
            .uniform('P');
    }

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
        r: 1,
        g: 1,
        b: 1
    });


    buffer.geometry({
        points: myRender.getBuffer(),
        size: 7
    });

    buffer.no_texture = false;

    entity = {
        buffer: buffer,
        model: t.m,
        drawType: 'LINES'
    }


    var t = new VR8.Transform();
    t.translate(25, 25, 0).scale(1, 1, 0);

    buffer.no_color_data = false;

    function render() {
        stats.begin();

        scene.clean();
        scene.render(entity);

        stats.end();

        requestAnimFrame(render);
    }

    render();






}());
