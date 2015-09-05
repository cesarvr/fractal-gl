(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D({
        clear: {
            r: 1,
            g: 1,
            b: 1
        }
    });


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

    var WorkerServer = function() {
        var workers = [];
        var observers = [];
        var processFile = null;
        var result = [];

        var _execute = function(method, args) {
            this.postMessage({
                cmd: method,
                args: args
            });
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

            workers.push(wrk);
            return wrk;
        };
        
        this.notify = function(args) {
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
                    recursive: 2
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
            if (buffer.length > 0)
                buffer = [];
        };

        this.getBuffer = function() {
            return buffer;
        };

    };

    var spawnWorker = new WorkerServer();
    spawnWorker.setProcessFile('/demos/thread/koch_process.js');

    var myRender = new MyRender();
    spawnWorker.subscribe(myRender);


    /*
     *  Draw a polygon with the specified number of [sides] and clockwise or couter-clockwise.
     *
     *  clockwise: true or false.
     *  renderFn: function sould accept and object with the following description {p1, p2}.
     *
     */

    function poly(sides, clockwise, renderFn) {
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
                        p2: tmp
                    });

                } else {

                    renderFn({
                        p1: tmp,
                        p2: point
                    });

                }
            }
            tmp = point;
        }
    }


    poly(2, false, myRender.fnRender);

    var stp = 0.01;
    var t = new VR8.Transform();
    t.translate(25, 25, 0).scale(1, 1, 0);

    buffer.no_color_data = false;


    function render() {
        if (myRender.isTerminated() && !myRender.isBusy()) {
            myRender.interpolate(stp);
            stp += 0.04;
        }

        if (stp > 1.9) {
            stp = 0;
            poly(3, false, myRender.fnRender);
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

        requestAnimFrame(render);
    }

    render();

    /*
           var t = new VR8.Transform();
        t.translate(25, 25, 0).scale(1, 1, 0);

        var entity = {
            buffer: buffer,
            model: t.m,
            drawType: 'LINES'
        }

        var inside = false;
        var type = 'LINES'


        function render() {

            anim += stp;


            if (dim > 6) {
                inside = !inside;
                dim = 2;
                type = (type === 'LINES') ? 'POINTS' : 'LINES';
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
                drawType: type
            }



            requestAnimFrame(render);
            scene.clean();
            scene.render(entity);
        }

        render();

    */







}());
