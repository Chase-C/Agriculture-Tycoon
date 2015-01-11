var createBuyMenu = function(menus, farm){
	var elements = [new Text("Frankie's Farmer Emporium", 16, 16, 18)];
	var price;
	var buyF;
	var name;
	for(var i=0;i<farm.text.length-1;i++){
		switch(i){
			case 0:
				price = farm.tools.shovel.price;
				buyF = 0;
				name = 'shovel';
				break;
			case 1:
				price = farm.tools.tractor.price;
				buyF = 0;
				name = 'tractor';
				break;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				price = Seeds.price[i-2];
				buyF = 1;
				name = Seeds.name[i-2];
				break;
			case 7:
				price = pesticidePrice;
				buyF = 2;
				name = 'pesticide';
				break;
			case 8:
				price = OFPrice;
				buyF = 2;
				name = 'fertilizer';
				break;
		}
		elements.push(new Text(farm.text[i]+": $"+price, 16+250*(i%2), 68+80*Math.floor(i/2), 14));
		var buyButton = new Button(16+250*(i%2), 90+80*Math.floor(i/2), 96,  32, 'Buy', null);
		var buyFunc = (function(f, n, bf) {
			switch(bf){
				case 0:
					f.addTool(n);
					
					break;
				case 1:
					f.addSeeds(n);
					break;
				case 2:
					f.addBonus(n);
					break
			}
        }).bind(this, farm, name, buyF);
		buyButton.setCallback(buyFunc);
		if(farm.money < price || (buyF===0 && farm.tools[name].held)) buyButton.active = false;
		elements.push(buyButton);
	}
	
	
	
	return new Menu(250, 70, 500, 460, elements);
}
