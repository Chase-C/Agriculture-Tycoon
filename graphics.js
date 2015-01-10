var Graphics = {
	tileSize: 32,
	worldWidth: 40,
	worldHeight: 30,
	tiles: [],
	dirt: $("#dirt")[0],
	initialize: function(){
		for(var i=0;i<this.worldWidth;i++){
			this.tiles[i] = [];
			for(var j=0;j<this.worldHeight;j++){
				this.tiles[i][j] = this.dirt;
			}
		}
	},
	drawTiles: function(canvas){
		for(var i=0;i<this.tiles.length;i++){
			for(var j=0;j<this.tiles[0].length;j++){
				canvas.drawImage(this.dirt, i*this.tileSize, j*this.tileSize);
			}
		}
	}
}
