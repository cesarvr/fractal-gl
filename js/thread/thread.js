    var thread = function(_object) {
        var that = {};

        that.object = _object;

        self.addEventListener('message', function(e) {
            that.execute(e.data);
        });

        that.execute = function(msg) {
            that.end({
                cmd: msg.cmd,
                ret: that.object[msg.cmd](msg.args) || true
            });
        }

        that.end = function(args) {
            that.finishedTask = true;
            self.postMessage(args);
        }

        return that;
    };

        
    
   var server = function(_that) {
        var that = _that || {};
        var workers = [];
        var observers = [];
        var processFile = null;
        var _execute = function(method, args) {
            this.postMessage({
                cmd: method,
                args: args
            });
        };


        that.clear = function() {
            var len = workers.length;
            for (var i = 0; i < len; i++) {
                workers[i].terminate();
            }

            workers = [];
        };

        that.getWorkersCount = function() {
            return workers.length;
        };

        that.workAll = function(method, args) {
            workers.forEach(function(worker) {
                worker.execute(method, args);
            });
        };

        that.changeBehavior = function(fn) {
            _execute = fn;
        };

        that.subscribe = function(object) {
            object.server = that;
            observers.push(object);
        };

        that.loadFile = function(filename) {
            processFile = filename;
        };

        that.spawn = function() {

            var wrk = new Worker(processFile);

            wrk.addEventListener('message', that.notify);
            wrk.execute = _execute;
            wrk.idle = false;

            workers.push(wrk);
            return wrk;
        };

        that.notify = function(args) {
            that.idle = true;

            observers.forEach(function(observer) {
                observer.notify(args.data);
            });
        };

        return that;
    };



    

    var SWorker = {
        Thread: thread,
        Server: server
    };

    if(typeof DedicatedWorkerGlobalScope ==='undefined' ){
       
        module.exports = SWorker;
    }
