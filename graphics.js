var Graphics = {
	worldWidth: 2000,
	worldHeight: 1200,
	portX: 200,
	portY: 200,
	scrollMargins: [100, 150, 100, 150], //top right bottom left
	
	//local image class
	image: function(id, x, y){
		this.x = x;
		this.y = y;
		//retrieve element from jquery
		this.elem = $("#"+id)[0];
		this.w = this.elem.width;
		this.h = this.elem.height;
		this.mouseX = this.w/2;
		this.mouseY = this.h/2;
		this.draw = function(){
			if(this.x >= Graphics.portX-this.w && this.x <= Graphics.portX+Graphics.portWidth &&
			   this.y >= Graphics.portY-this.h && this.y <= Graphics.portY+Graphics.portHeight){
				Graphics.canvas.drawImage(this.elem, this.x-Graphics.portX, this.y-Graphics.portY);
				//console.log(this.elem.src);
			}
		}
	},
	
	init: function(canvas, width, height){
		this.canvas = canvas;
		this.portWidth = width;
		this.portHeight = height;
		
		//image initialization
		this.background1 = new this.image("background1", 0, 0);
		this.background2 = new this.image("background2", 500, 0);
		this.background3 = new this.image("background3", 1000, 0);
		this.background4 = new this.image("background4", 1500, 0);
		this.background5 = new this.image("background5", 0, 600);
		this.background6 = new this.image("background6", 500, 600);
		this.background7 = new this.image("background7", 1000, 600);
		this.background8 = new this.image("background8", 1500, 600);
		
		//aray of images
		this.images = [this.background1, this.background2, this.background3, this.background4,
					   this.background5, this.background6, this.background7, this.background8];
	},
	
	drawWorld: function(){
		for(var i=0;i<this.images.length;i++){
			this.images[i].draw();
		}
	},
	
	updatePos: function(x, y){
		this.mouseX = x;
		this.mouseY = y;
	},
	
	checkScroll: function(){
		
	}
}
