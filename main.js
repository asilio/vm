import {Entity} from "./modules/entities.js";
import {GenerateComponent} from "./modules/components.js";
import {generateMap, drawMap} from "./modules/map_generator.js";
import {Display} from "./modules/display.js";

let CONSOLE;
let DISPLAY;
function print(s){
	CONSOLE.innerHTML+=`<br>${s}`;
 	console.log(s);
}
    
function main(){
	CONSOLE= document.getElementById("CONSOLE");
	DISPLAY = new Display();
	document.body.appendChild(DISPLAY.getContainer());
	generateMap();
	drawMap(DISPLAY);
	
	let entity = new Entity();
	let villain = new Entity();
	villain.name = "Villain!";
	entity.addComponent(GenerateComponent("HealthComponent"));
	villain.addComponent(GenerateComponent("HealthComponent"));
	villain.getComponentByName("HealthComponent").damage(5);
	print(entity);
	print(villain);
	initialize();
}

main();




