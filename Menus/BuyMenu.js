var createBuyMenu = function(menus, farm){
	var elements = [new Text("Frankie's Farmer Emporium", 16, 16, 18)];
	var price;
	var buyF;
	var name;
	for(var i=0;i<farm.text.length-1;i++){
		switch(i){
			case 0:
				price = farm.tools.shovel.price;
				buyF = farm.addTool;
				name = 'shovel';
				break;
			case 1:
				price = farm.tools.tractor.price;
				buyF = farm.addTool;
				name = 'tractor';
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				price = Seeds.price[i-2];
				buyF = farm.addSeeds;
				name = Seeds.name[i];
				break;
			case 7:
				price = pesticidePrice;
				buyF = farm.addBonus;
				name = 'pesticide';
				break;
			case 8:
				price = OFPrice;
				buyF = farm.addBonus;
				name = 'pesticide';
				break;
		}
		elements.push(new Text(farm.text[i]+": $"+price, 16+250*(i%2), 68+80*Math.floor(i/2), 14));
		var buyButton = new Button(16+250*(i%2), 90+80*Math.floor(i/2), 96,  32, 'Buy', null);
		buyButton.setCallback(buyF.bind(this, name));
		if(farm.money < price) buyButton.active = false;
		elements.push(buyButton);
	}
	
	
	
	return new Menu(250, 70, 500, 460, elements);
}
