(function() {

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

}());
