var Graphics = {
	worldWidth: 6000,
	worldHeight: 5720,
	portX: 200,
	portY: 200,
	scrollSpeed: 4,
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
			}
		}
	},
	
	init: function(canvas, width, height){
		this.canvas = canvas;
		this.portWidth = width;
		this.portHeight = height;
		
		//image initialization
		//none yet
		
		//aray of images
		this.images = [];
		
		//initialize map
		for(var i=0;i<6;i++){
			for(var j=0;j<13;j++){
				this.images.push(new this.image("map"+i+"-"+j, 200*j, 400*i));
			}
		}
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
		if(this.mouseY<this.scrollMargins[0]){
			this.portY -= this.scrollSpeed;
			if(this.portY < 0) this.portY = 0;
		}
		if(this.mouseX>this.portWidth-this.scrollMargins[1]){
			this.portX += this.scrollSpeed;
			if(this.portX > this.worldWidth-this.portWidth) this.portX = this.worldWidth-this.portWidth;
		}
		if(this.mouseY>this.portHeight-this.scrollMargins[2]){
			this.portY += this.scrollSpeed;
			if(this.portY > this.worldHeight-this.portHeight) this.portY = this.worldHeight-this.portHeight;
		}
		if(this.mouseX<this.scrollMargins[3]){
			this.portX -= this.scrollSpeed;
			if(this.portX <0) this.portX = 0;
		}
		if(this.mouse
	}
}
