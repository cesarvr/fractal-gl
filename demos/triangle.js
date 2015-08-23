(function() {

    var a = document.getElementById('canvas-surface');
    var core = new VR8.Core(true);
    var buffer = new VR8.Buffer();
    var shader = new VR8.Shader();
    var camera = VR8.Camera.MakeOrtho(0, 50, 50, 0, 1, -1);
    var scene = new VR8.Scene2D();

    shader.create(VR8.Stock2D);
    scene.shader = shader;
    scene.camera = camera;

    var deg_rad = function(angle) {
        return angle * Math.PI / 180;
    };


    var Vertex = function() {}

    var decorate = function(obj) {

        var proto = obj.prototype;

        for (var keys in this) {
            proto[keys] = this[keys];
        }
    }

    var VertexBuffer = {

        vertexArray: [],

        save: function(pos, color) {
            for (var p in pos) {
                this.vertexArray.push(pos[p]);
            }
            for (var c in color) {
                this.vertexArray.push(color[c]);
            }
            this.vertexArray.push(1.0); // alpha for color;

            return this;
        },

        clear: function(){
            this.vertexArray = [];
        },

        decorate: decorate
    };


    var Morph = {
        morphing: [],

        savePoints: function(p1, p2, color) {

            this.morphing.push({
                pointA: new Vector(p1),
                pointB: new Vector(p2),
                color: rgbc(25, 245, 245)
            });

            return this;
        },

        step: function(delta) {

            var self = this;
            
            self.clear(); 

            this.morphing.forEach(function(seg) {
                var p1 = seg.pointA.v;
                var p2 = VR8.Lerp(seg.pointA.copy(), seg.pointB, delta).v;
                var color = VR8.Lerp(seg.color.copy(), rgbc(45, 124, 123), delta).v;

                self.save(p1, seg.color.v);
                self.save(p2, color);
            });
            return this;
        },

        decorate: decorate
    }

    VertexBuffer.decorate(Vertex);
    Morph.decorate(Vertex);

    var vert = new Vertex();

    var rgbc = function(r, g, b) {
        var v = new Float32Array([r, g, b]);
        v = v3.div_scalar(v, 250);
        return new Vector(v);
    }

    var point = function(p1, p2, n) {
        var c = {};

        c.red = new Vector4(1, 0.5, 0.0, 1.0);
        c.blue = new Vector4(0.2, 0.2, 1, 1.0);
        c.white = new Vector4(0.22, 0.22, 0.22, 1.0);
        c.green = new Vector4(0.2, 1, 0.2, 1.0);
        c.tron = rgbc(210, 234, 252);

        var color = c[n] || c.white;

        vert.savePoints(p1, p2);
    }


var adapt = function(p){
    return new Vector([p.x, p.y, 0.0]);
}

var triangle = function(p1, p2, p3){
    
    var v1 = adapt(p1);
    var v2 = adapt(p2);
    var v3 = adapt(p3);

    point(v1,v2, 'tron');
    point(v2,v3, 'tron');
    point(v3,v1, 'tron');

}

var sierpinski = function(p1, p2, p3, limit){
        if(limit >0){
          var pa = {
            x: (p1.x + p2.x)/2,
            y: (p1.y + p2.y)/2
          }
          
          var pb = {
            x: (p2.x + p3.x)/2,
            y: (p2.y + p3.y)/2
          }

          var pc = {
            x: (p3.x + p1.x)/2,
            y: (p3.y + p1.y)/2
          }

          sierpinski(p1,pa,pc, limit-1);
          sierpinski(pa,p2,pb, limit-1);
          sierpinski(pc,pb,p3, limit-1);
        }else{
          triangle(p1,p2,p3);
        }
  };
  
  sierpinski({x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0},5);
   
  //triangle({x: 0.0, y: -24.0 }, {x: -20.0, y:20.0}, {x:20.0, y: 20.0}, 3);

 





    buffer.geometry({
        points: vert.step(0.2).vertexArray,
        size: 7
    });

    buffer.no_color_data = false;

    var t = new VR8.Transform();
    t.translate(25, 25, 0).scale(1, 1, 0);

    var entity = {
        buffer: buffer,
        model: t.m,
        drawType: 'LINES'
    }

    var sin = Math.sin;
    var stp = 0.01;
    var anim = 0;
    var entity = {};
    function render() {

        var ms = 17;
        var step = (1 / 60) * 1000;
        var dt = ((ms / step) | 0) * step;

        if (anim < 1.0) {
            anim += stp;

            console.log('->', anim);

            buffer.geometry({
                points: vert.step(anim).vertexArray,
                size: 7
            });
            entity = {
                buffer: buffer,
                model: t.m,
                drawType: 'LINES'
            }
        }

        requestAnimFrame(render);

     scene.clean();
        scene.render(entity);
    }

    render();

}());
