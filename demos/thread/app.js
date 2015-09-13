(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);

    var scene = new VR8.Scene2D();
    var vertex = new VR8.Geometry.Vertex;


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








    var WorkerServer = function() {
        var workers = [];
        var observers = [];
        var processFile = null;

        var _execute = function(method, args) {
            this.postMessage({
                cmd: method,
                args: args
            });
        };

        this.clear = function() {
            var len = workers.length;
            for (var i = 0; i < len; i++) {
                workers[i].terminate();
            }

            workers = [];
        };

        this.getWorkersCount = function() {
            return workers.length;
        };

        this.workAll = function(method, args) {
            workers.forEach(function(worker) {
                worker.execute(method, args);
            });
        };

        this.changeBehavior = function(fn) {
            _execute = fn;
        };

        this.subscribe = function(object) {
            object.server = this;
            observers.push(object);
        };

        this.setProcessFile = function(filename) {
            processFile = filename;
        };

        this.spawn = function() {

            var wrk = new Worker(processFile);

            wrk.addEventListener('message', this.notify);
            wrk.execute = _execute;
            wrk.idle = false;

            workers.push(wrk);
            return wrk;

        };

        this.notify = function(args) {
            this.idle = true;

            observers.forEach(function(observer) {
                observer.notify(args.data);
            });
        };
    }




    var MyRender = function() {

        this.server = null;
        var _self = this;

        var finished = false;
        var completed = 0;
        var busy = false;
        var buffer = [];

        /* observer */
        this.notify = function(args) {
            completed++;

            if (completed === _self.server.getWorkersCount()) {
                finished = true;
                busy = false;
                completed = 0;
            }

            if (args.cmd === 'interpolate') {
                Array.prototype.push.apply(buffer, args.ret);
            }

        };

        this.fnRender = function(shape) {

            _self.clean();

            _self.server
                .spawn()
                .execute('snowAdapter', {
                    p1: shape.p1.v,
                    p2: shape.p2.v,
                    recursive: shape.recursive
                });

            busy = true;
        };

        this.interpolate = function(delta) {
            _self.server.workAll('interpolate', delta);
            busy = true;
        };

        this.isTerminated = function() {
            return finished;
        };

        this.isBusy = function() {
            return busy;
        };

        this.clean = function() {
            if (buffer.length > 0) {
                buffer = [];
                _self.server.clear();
            }
        };

        this.getBuffer = function() {
            return buffer;
        };

    };

    var spawnWorker = new WorkerServer();
    spawnWorker.setProcessFile('demos/thread/koch_process.js');

    var myRender = new MyRender();
    spawnWorker.subscribe(myRender);


    /*
     *  Draw a polygon with the specified number of [sides] and clockwise or couter-clockwise.
     *
     *  clockwise: true or false.
     *  renderFn: function sould accept and object with the following description {p1, p2}.
     *
     */

    function poly(sides, clockwise, renderFn, recursive) {
        var cos = Math.cos;
        var sin = Math.sin;
        var PI = Math.PI;
        var tmp = null;
        var s = sides || 5;

        for (var x = 0; x <= (2 * PI); x += ((2 * PI) / sides)) {
            var point = new Vector([15 * cos(x), 20 * sin(x), 0.0]);

            if (tmp) {
                if (clockwise) {

                    renderFn({
                        p1: point,
                        p2: tmp,
                        recursive: recursive
                    });

                } else {

                    renderFn({
                        p1: tmp,
                        p2: point,
                        recursive: recursive
                    });

                }
            }
            tmp = point;
        }
    }




    scene.setClearColor({
        r: 1,
        g: 1,
        b: 1
    });



    var stp = 0.01,
        dimensions = 2,
        clockwise = false,
        type = 'LINES',
        recursive = 1;
    var recursiveLimit = 4;
    var t = new VR8.Transform();
    t.translate(25, 25, 0).scale(1, 1, 0);

    buffer.no_color_data = false;

    poly(dimensions, false, myRender.fnRender);

    function render() {
        stats.begin();

        if (myRender.isTerminated() && !myRender.isBusy()) {
            myRender.interpolate(stp);
            stp += 0.03;
        }

        if (stp > 1.9) {
            stp = 0;
            poly(dimensions, false, myRender.fnRender, recursive);
            dimensions++;
        }

        if (dimensions > 5) {
            stp = 0;
            recursive++;
            dimensions = 2;
            clockwise = !clockwise;
            type = (type === 'LINES') ? 'POINTS' : 'LINES';

            if (recursive > recursiveLimit) recursive = 1;

        }

        buffer.geometry({
            points: myRender.getBuffer(),
            size: 7
        });


        entity = {
            buffer: buffer,
            model: t.m,
            drawType: 'LINES'
        }

        scene.clean();
        scene.render(entity);

        stats.end();

        requestAnimFrame(render);
    }

    render();






}());
