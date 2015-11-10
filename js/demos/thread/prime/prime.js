var Thread = require('../../../thread/thread');


module.exports = {
    init: function() {
        console.log('hello world');
        console.log('thread', Thread);

        var serve = Thread.Server();
        serve.loadFile('/module/noise.js');
        serve.subscribe({
            notify: function(o) {
                console.log('notify-->', o);
            }
        });

        var wrk = serve.spawn();
        wrk.execute('prime', 44900);

        var wrk2 = serve.spawn();
        wrk2.execute('prime', 33900);





    }
};
