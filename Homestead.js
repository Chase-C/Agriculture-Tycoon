function Acre(){
	this.blank=1;
	this.lettuce=0;
	this.apples=0;
	this.strawberries=0;
	this.brussel=0;
	this.artichokes=0;
	this.tilled=0;
	this.planted=0;
	this.ripe=0;
	this.ruined=0;
	this.fertile=0;
	this.GMO=0;

	this.state= Array(this.tilled,this.planted , this.ripe, this.ruined, this.fertile );
	this.growthRate=1.0;
	//protection percent
	this.pestRepel=1.0;
	this.GMO=0;
}

var row1 = new Array(new Acre(),new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre());
var row2 = new Array(new Acre(),new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre());
var row3 = new Array(new Acre(),new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre(), new Acre());
var Land = new Array(row1, row2, row3);

var FarmMove= function(move,  target){
	//till by shov
	if(move == 1 && shovel.uses > 0 && target.blank == 1){
	  day = day - 6;
	  target.tilled = 1;
	  target.blank = 0;
	  shovel.uses -= 1;
	}

	 if(move == 2 && tractor.uses > 0 && target.blank == 1){
	  day = day - 2;
	  target.tilled = 1;
	  target.blank = 0;
	  tractor.uses -= 1;
	 }

	//plant seeds
	if(move == 3  && target.tilled == 1 && Water - 200 > 0){
		day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.lettuce = 1;
		Water -= 200;
		target.pestRepel = .4;


	}

	//plant seeds
	if(move == 4  && target.tilled == 1 && Water - 200 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.apples = 1;
		Water -= 200;
		target.pestRepel = .5;
	}

	//plant seeds
	if(move == 5  && target.tilled == 1 && Water - 100 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.strawberries = 1;
		Water -= 100;
		target.pestRepel = .3;
	}

	//plant seeds
	if(move == 6  && target.tilled == 1 && Water - 100 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.brussel = 1;
		Water -= 100;
		target.pestRepel = .4;
	}

	//plant seeds
	if(move == 7  && target.tilled == 1   && Water - 100 > 0){
	 day = day - 2;
		target.tilled = 0;
		target.planted = 1;
		target.artichokes = 1;
		Water -= 100;
		target.pestRepel = .5;
	}


	//pesticides
	if(move == 8 && target.planted){
	  day = day - 2;
	   target.pestRepel = pestRepel + .1;
	}

	//organic
	if(move == 9 && target.fertile == 0 ){
		day = day - 4;
		target.fertile = 1;
		target.growthRate = 1.3;
	}
	
	//non organic firtilizer
	if(move == 9 && target.fertile == 0 ){
		day = day - 4;
		target.fertile = 1;
		target.GMO = 1;
		target.growthRate = 1.5;

	}
	//harvest
	if(move == 10 && target.ripe == 1){
	   day = day - 3;
	   target.ripe = 0;
	   var harvest = 0;
		var crop = Array( target.lettuce, target.apples, target.strawberries, target.brusselsprouts, target.artichokes);
		for(var i = 0; i < crop.length; i++){
			if(target.crop[i] == 1){
				harvest = i;
				break;
			}
		}

		target.blank=1;
		target.lettuce=0;
		target.apples=0;
		target.strawberries=0;
		target.brussel=0;
		target.artichokes=0;
		target.tilled=0;
		target.planted=0;
		target.ripe=0;
		target.ruined=0;
		target.fertile=0;
		target.GMO=0;
		this.growthRate=1.0;
		this.pestRepel=1.0;
		this.GMO=0;
	}
	//dont know product array
	produce[Harvest] = produce[harvest] + 1;
}
//Daily Update






