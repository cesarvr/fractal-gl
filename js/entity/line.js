VR8.Line = function(point, colors){
	var buffer = new VR8.Buffer();
	var vertex = [ point.x,  point.y, point.z, colors.r, colors.g, colors.b, colors.a ];

	var transform = Object.create(VR8.transform);

    this.colors = new Vector(colors.r,colors.g,colors.b);
	this.pos = new Vector(0,0,0);
	this.model = new VR8.Matrix4();
	this.camera = {};

	this.model.set_identity();
  	buffer.no_color_data = false;
  	buffer.geometry({points: vertex, size: 7});
  	
  	this.position = function(x,y,z){
  		this.pos.set(x,y,z);
  	}

  	this.update = function(){
  		transform.translate_m(this.model, this.pos);
  	}

   /* this.updateColors = function(x,y,z,g){

      //VR8.Lerp(p.pos, new Vector(mpos.x, mpos.y, 0.0), t);

      buffer.update({points:[ 0.0,  0.0, 0.0, colors.r, colors.g, colors.b, colors.a ]});

    }*/

  	this.get_entity = function(){
  		var that = this;
  		return {
  			buffer: buffer,
    		model:that.model.m(),
    		drawType: 'POINTS'
  		}
  	}

}

