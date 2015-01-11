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
		
		//acres initialization
		this.acres = {
			drought: new this.image("drought"),
			empty: new this.image("empty"),
			flood: new this.image("flood"),
			irrigated: new this.image("irrigated"),
			tilled: new this.image("tilled")
		};
		var crops = ["apple", "artichoke", "brussel", "lettuce", "strawberry"];
		for(var i=1;i<=2;i++){
			for(var j=0;j<crops.length;j++){
				this.acres[crops[j]+i] = new this.image(crops[j]+i);
			}
		}
		
		//outlines initialization
		this.outlines = {
			emporium: new this.image("emporium-outline", 163, 298),
			farmer: new this.image("farmer-outline", 1246, 1029),
			nut: new this.image("nut-outline", 970, 1410),
			salad: new this.image("salad-outline", 1900, 1400),
			swav: new this.image("swav-outline", 677, 867),
			acre: new this.image("acre-outline")
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
					image = this.acres.brussel2;
				}else if(Land[i][j].strawberries){
					image = this.acres.strawberry2;
				}else if(Land[i][j].artichokes){
					image = this.acres.lettuce2;
				}else if(Land[i][j].lettuce){
					image = this.acres.artichoke2;
				}else if(Land[i][j].tilled){
					image = this.acres.tilled;
				}
				image.draw(this.acresOriginX+70*j+105*i, this.acresOriginY+57*(j-i));
			}
		}
	},
	
	outlineBuildings: function(){
		if(this.checkInQuad([[595,318],[883,511],[466,696],[125,474]])){
			this.outlines.emporium.draw();
		}else if(this.checkInQuad([[1482,1040],[1620,1122],[1385,1221],[1260,1132]])){
			this.outlines.farmer.draw();
		}else if(this.checkInQuad([[1104,1401],[1352,1612],[1200,1698],[920,1474]])){
			this.outlines.nut.draw();
		}else if(this.checkInQuad([[2091,1413],[2276,1613],[2124,1728],[1867,1563]])){
			this.outlines.salad.draw();
		}else if(this.checkInQuad([[854,887],[998,997],[817,1085],[651,958]])){
			this.outlines.swav.draw();
		}
	},

	checkBuildings: function(){
		if(this.checkInQuad([[1482,1040],[1620,1122],[1385,1221],[1260,1132]])){
            return 3; // Farmer's Market
		}else if(this.checkInQuad([[1104,1401],[1352,1612],[1200,1698],[920,1474]])){
            return 1; // Health Nut
		}else if(this.checkInQuad([[2091,1413],[2276,1613],[2124,1728],[1867,1563]])){
            return 0; // Salad Palace
		}else if(this.checkInQuad([[854,887],[998,997],[817,1085],[651,958]])){
            return 3; // Swav Mart
		}
        return -1;
	},
	
	outlineAcre: function(i, j){
		this.outlines.acre.draw(this.acresOriginX+70*j+105*i, this.acresOriginY+57*(j-i));
	},
	
	getSelectedAcre: function(){
		var rectX, rectY;
		for(var i=0;i<Land.length;i++){
			for(var j=0;j<Land[i].length;j++){
				rectX = this.acresOriginX+70*j+105*i;
				rectY = this.acresOriginY+57*(j-i);
				if(this.checkInQuad([[rectX+90,rectY],[rectX+150, rectY+49],[rectX+60,rectY+98],[rectX,rectY+49]])){
					return [i,j];
				}
			}
		}
	},
	
	drawWorld: function(){
		for(var i=0;i<this.map.length;i++){
			this.map[i].draw();
		}
		this.drawAcres();
		this.outlineBuildings();
		var selectedAcre = this.getSelectedAcre();
		if(selectedAcre){
			this.outlineAcre(selectedAcre[0], selectedAcre[1]);
		}
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
	},
	
	checkInQuad: function(coords){
		var vals = [];
		for(var i=0;i<4;i++){
			vals.push(coords[i][1]-this.portY+((coords[(i+1)%4][1]-coords[i][1])*(this.mouseX-coords[i][0]+this.portX))/
					  (coords[(i+1)%4][0]-coords[i][0]));
		}
		return this.mouseY>vals[0] && this.mouseY<vals[1] && this.mouseY<vals[2] && this.mouseY>vals[3];
	}
}
