import {Digger} from "https://ondras.github.io/rot.js/lib/map/digger.js";

let map = {};
export function generateMap(){
	let digger = new Digger();
	let digCallback = function(x,y,value){
		if(value) return;
		var key =`${x},${y}`;
		map[key] = ".";
	}
	digger.create(digCallback);
}

export function drawMap(display){
	for(let key in map){
		let parts = key.split(",");
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		display.draw(x,y,map[key]);
	}
}