var Apples = {
   FloodTol:.92, 
   DroughtTol:.85, 
   QuakeTol:.15, 
   FireTol:.80,
   PestTol:.5, 
};

var Artichoke = {
   FloodTol:.45,
   DroughtTol:.40,
   QuakeTol:1,
   PestTol:.85,
   FireTol:.55
};
   
var Lettuce = {
   FloodTol:.41, 
   DroughtTol:.45, 
   QuakeTol:1, 
   PestTol:.75, 
   FireTol:.50
}; 

var Strawberry = {
   FloodTol:.5, 
   DroughtTol:.7, 
   QuakeTol:1, 
   PestTol:.85, 
   FireTol:.42
};
   
var Sprouts = {
   FloodTol:.6,
   DroughtTol:.35,
   QuakeTol:1,
   PestTol:.90,
   FireTol:.65
};

var fruits = [Sprouts, Strawberry, Lettuce, Apples, Artichoke];
//currentFruit = undefined;
function getCurrentFruit(position){
	return fruits[position];
}

var sunDaysInRow = 0; //Lines 49-52 are debug code
var rainDaysInRow = 0; 
var isDrought = false;
var isFlooded = false;

function weather(Sprouts){
   var todayWeather = Math.floor(Math.random() * 91);
  // for(i = 0; i <= 30; i++){
     if(todayWeather <= 16){ //Based on the average number of rainy days in Salinas
	    // rain(); //Rain function goes here
		 areTherePests(true, false, false, false, 0); //Bring in rain case for pests
		 rainDaysInRow++;
		 sunDaysInRow = 0;
		 if(isDrought){
		     isDrought = false; //ends the drought
			 console.log("The drought has ended!");	
		 }
		 if(rainDaysInRow > 3){ //If it rains for more than 5 days in a row, flood
		     if(rainDaysInRow == 4){
			     console.log("There is a flood on your crops!");
			 } else {
			     console.log("The flood has gotten worse...");
			 }
		     flood(); //flood functions goes here
			 isFlooded = true;
			 areTherePests(true, true, false, false, 0); //Bring in flood case for pests
		 /*} else if(rainDaysInRow = 3 || rainDaysInRow == 4){
		     floodWarning() //flood advisory goes here*/
		 }
	     console.log("Today is a rainy day");
	 } else {
		 sunDaysInRow++;
		 rainDaysInRow = 0;
		 //sunny();
		 isThereAFire(sunDaysInRow, isDrought);
		 if(sunDaysInRow < 15){
		    areTherePests(false, false, true, false, 0); //Bring in sunny case for pests
		 }
		 if(sunDaysInRow > 13){
		     if(sunDaysInRow == 14){
			     isDrought = true; //begin drought
			     console.log("A drought has occurred");
			 } else {
			     console.log("The drought continues...");
			 }
		     drought(); //drought function goes here
			 var sunDays2 = sunDaysInRow - 13;
			 areTherePests(false, false, true, true, sunDays2);
		 /*} else if(sunDaysInRow > 17 || sunDaysInRow <= 21){
		     droughtWarning(); //drought advisory goes here*/
		 }
	 console.log("Today is a sunny day");
	 }
   //}
  // console.log('The most days in a row with sunshine is: '+sunDaysInRow);
}

function flood(){
   var currentFruit = Sprouts;
   willitDestroy( currentFruit.FloodTol);
}

function pests(){
   var currentFruit = Sprouts;
   console.log('Pests has infested your farm!');
   willitDestroy(currentFruit.PestTol);
}

function fire(){
   var currentFruit = Sprouts;
   console.log('A fire has occured!');
   willitDestroy(currentFruit.FireTol);
}

function drought(){
   var currentFruit = Sprouts;
   willitDestroy(currentFruit.droughtTol);
}

function Earthquake(){
   var currentFruit = Sprouts;
   console.log('An Earthquake has occured!')
   willitDestroy(currentFruit.QuakeTol);
}

function willitDestroy(probablity){ //Determine whether an acre should be destroyed or not
   //var result = new Array(row)(col);
   var destroyConstant = 100 * probablity; 
   var dest = 0;
   //var acreNum = 1;
   //If the new random number is greater than this number, the acre is destroyed
   for(var i = 0; i <= 2; i++){
      for(var j = 0; j <= 7; j++){
	     /*if(Land[i][j].blank = 1){
		     continue;
		 }*/
	     var destroyTemp = Math.floor(Math.random() * 101);
		 if(destroyConstant < destroyTemp){ //Destroy the acre if this condition is met
		     Land[i][j].ruined = 1;
			 //console.log('Acre '+acreNum + ' has been destroyed');
			 dest++;
		 }
		//acreNum++;
	  }
   }
   if(dest == 0){
     return;
   }
   console.log(dest+ ' acre(s) has been destroyed');
}

/*function destroy(){

}*/

function isThereanEarthquake(){
   var eqPressure = Math.floor(Math.random() * 90000) + 10000; //Equilibrium Earthquake
   var totalPressure = 0; 
   for(var i = 0; i <= 90; i++){
     var add = Math.random() * 5000;
	 totalPressure = totalPressure + add;
	 add = 0;
	 if(totalPressure > eqPressure){ 
	 //If the total pressure exceeds the equilibrium pressure, there is an Earthquake
	    Earthquake() //Earthquake function goes here
		totalPressure = 0;
		eqPressure = Math.floor(Math.random() * 90000) + 10000;
		//resets the total pressure and new Equilibrium
	 /*} else if( .98 * totalPressure > eqPressure){
	    EarthquakeWarning() //Earthquake warning*/
	 }
  }
}

function isThereAFire(sunDaysInRow, drought){
   var fireEQ = Math.floor(Math.random() * 1501) + 2100;
   var tempFire;
   tempFire = Math.floor(Math.random() * 1501) * Math.pow(1.01, sunDaysInRow);
   if(drought){ //If drought == true, increases chance for drought
	 tempFire = tempFire * Math.pow(1.02, sunDaysInRow/3);
   }
   if(fireEQ < tempFire){
	 fire(); //fire function goes here
     fireEQ = Math.floor(Math.random() * 1501) + 1100;
	}
}

function areTherePests(rain, flood, sunny, drought, howBadDrought){ //Calculates pests
   var pestEQ = Math.floor(Math.random() * 160); //Generate Pest Equal Constant  = from 0 to 100
   var tempPest = Math.floor(Math.random() * 128);  //Generate temp Pest values from 0 to 128
   //var howBadDrought = 1;
   if(rain == true){
     if(flood == true){
         tempPest = Math.floor(Math.random() * 140);
		 pastEQ = Math.floor(Math.random() * 105);
		 //This is to account that the crops may not be maintained due to the flood and weeding
		 //application of pestcides, etc may not occur at the time.
		 if(pestEQ < tempPest){
		     pests(); 
		 }
	 } else {
	     tempPest = Math.floor(Math.random() * 155) * .95;
		 pastEQ = Math.floor(Math.random() * 113);
		 //Since pests are less likely to come out when it is raining, we adjust for this by
		 //regenerating a number, take out about 5% and generate a new equilibrium
		 if(pestEQ < tempPest){
		     pests();
		 }
	 }
   } else if(drought == true){
      tempPest = tempPest * Math.pow(1.2, howBadDrought);
	  //This takes to account that a good portion of crops get destroyed due to the higher frequency
	  //of pests invading crops during the drought
	  if(pestEQ < tempPest){
		 pests();
	  }
   }
}

/*function floodWarning(){
    
}*/
