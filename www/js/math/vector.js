var vector = {
	x:0,
	y:0,
	z:0,
	w:0,

	set: function(a){
		this.x = a[0];
		this.y = a[1];
		this.z = a[2];
		this.w = a[3];
	},

	add: function(o){
		var v = Object.create(vector);
		v.x = this.x + o.x;
		v.y = this.y + o.y;
		v.z = this.z + o.z;
		v.w = this.w + o.w;
		return v;
	},



}