import {Entity} from "./modules/entities.js";

let CONSOLE;

function print(s){
	CONSOLE.innerHTML+=`<br>${s}`;
 	console.log(s);
}
    
function main(){
	CONSOLE= document.getElementById("CONSOLE");
	let entity = new Entity();
	let villain = new Entity();
	villain.name = "Villain!";
	entity.addComponent(GenerateComponent("HealthComponent"));
	villain.addComponent(GenerateComponent("HealthComponent"));
	villain.getComponentByName("HealthComponent").damage(5);
	print(entity);
	print(villain);
}

main();




