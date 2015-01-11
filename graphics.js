var Graphics = {
	worldWidth: 2600,
	worldHeight: 2400,
	portX: 1000,
	portY: 250,
	scrollSpeed: 4,
	scrollMargins1: [100, 150, 100, 150], //top right bottom left
	scrollMargins2: [40, 50, 40, 40], //smaller margins for double speed
	acresOriginX: 1260,
	acresOriginY: 320,
	
	//local image class
	//each image can have a static position, defined in construction
	//or position can be specified upon drawing. latter overrides former.
	image: function(id, x, y){ //x, y
		this.x = x;
		this.y = y;
		//retrieve element from jquery
		this.elem = $("#"+id)[0];
		this.w = this.elem.width;
		this.h = this.elem.height;
		this.mouseX = this.w/2;
		this.mouseY = this.h/2;
		this.draw = function(x, y){ //args optional
			if(x!== 0 && !x){ //checks if position specified
				if(this.x===0 || this.x){ //checks if position property is defined
					x = this.x;
					y = this.y;
				}else return;
			}
			if(x >= Graphics.portX-this.w && x <= Graphics.portX+Graphics.portWidth &&
			   y >= Graphics.portY-this.h && y <= Graphics.portY+Graphics.portHeight){
				Graphics.canvas.drawImage(this.elem, x-Graphics.portX, y-Graphics.portY);
			}
		}
	},
	
	init: function(canvas, width, height){
		this.canvas = canvas;
		this.portWidth = width;
		this.portHeight = height;
		
		//image initialization
		this.acres = {
			apple1: new this.image("apple1"),
			apple2: new this.image("apple2"),
			artichoke: new this.image("arti"),
			brussel: new this.image("brussel"),
			drought: new this.image("drought"),
			empty: new this.image("empty"),
			flood: new this.image("flood"),
			irrigated: new this.image("irrigated"),
			lettuce: new this.image("lettuce"),
			strawberry: new this.image("strawberry"),
			tilled: new this.image("tilled")
		};
		
		//initialize map
		this.map = [];
		for(var i=0;i<6;i++){
			for(var j=0;j<13;j++){
				this.map.push(new this.image("map"+i+"-"+j, 200*j, 400*i));
			}
		}
		
	},
	
	drawAcres: function(){
		for(var i=0;i<Land.length;i++){
			for(var j=0;j<Land[i].length;j++){
				var image = this.acres.empty;
				if(Land[i][j].ripe && Land[i][j].apples){
					image = this.acres.apple2;
				}else if(Land[i][j].apples){
					image = this.acres.apple1;
				}else if(Land[i][j].brussel){
					image = this.acres.brussel;
				}else if(Land[i][j].strawberries){
					image = this.acres.strawberry;
				}else if(Land[i][j].artichokes){
					image = this.acres.lettuce;
				}else if(Land[i][j].lettuce){
					image = this.acres.artichoke;
				}else if(Land[i][j].tilled){
					image = this.acres.tilled;
				}
				image.draw(this.acresOriginX+70*j+105*i, this.acresOriginY+57*(j-i));
			}
		}
	},
	
	drawWorld: function(){
		for(var i=0;i<this.map.length;i++){
			this.map[i].draw();
		}
		this.drawAcres();
	},
	
	updatePos: function(x, y){
		this.mouseX = x;
		this.mouseY = y;
	},
	
	checkScroll: function(){
		if(this.mouseY<this.scrollMargins1[0] && this.mouseY>0){
			//move port
			this.portY -= this.scrollSpeed;
			//check for double speed
			if(this.mouseY<this.scrollMargins2[0]){
				this.portY -= this.scrollSpeed; 
			}
			//adjust if off-screen
			if(this.portY < 0) this.portY = 0;
		}
		if(this.mouseX>this.portWidth-this.scrollMargins1[1] && this.mouseX<this.portWidth){
			this.portX += this.scrollSpeed;
			if(this.mouseX>this.portWidth-this.scrollMargins2[1]){
				this.portX += this.scrollSpeed;
			}
			if(this.portX > this.worldWidth-this.portWidth){
				this.portX = this.worldWidth-this.portWidth;
			}
		}
		if(this.mouseY>this.portHeight-this.scrollMargins1[2] && this.mouseY<this.portHeight){
			this.portY += this.scrollSpeed;
			if(this.mouseY>this.portHeight-this.scrollMargins2[2]){
				this.portY += this.scrollSpeed;
			}
			if(this.portY > this.worldHeight-this.portHeight){
				
				this.portY = this.worldHeight-this.portHeight;
			}
		}
		if(this.mouseX<this.scrollMargins1[3] && this.mouseX>0){
			this.portX -= this.scrollSpeed;
			if(this.mouseX<this.scrollMargins2[3]){
				this.portX -= this.scrollSpeed;
			}
			if(this.portX <0) this.portX = 0;
		}
	}
}
