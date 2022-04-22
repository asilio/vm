const ENTITIES = [];
let EUID = 0;
function getEntityById(id){
	for(let i = 0;i< ENTITIES.length;i++){
		entity = ENTITIES[i];
		if(entity.id === id)
			return entity;
	}
	throw new Error(`No Entity with an ID of ${id} exists!`);
}

class Entity{
	constructor(){
		this.id =EUID++;
		this.components = [];
		ENTITIES.push(this); 
	}

	addComponent(component){
		if(this.getComponentByName(component.name)!=-1){
			print("Uh oh, we already have this component!");
			throw new Error(`Component ${component.name} is already part of this entity.`);
		}
		this.components.push(component);
        component.entity = this;
	}

	getComponentByClass(classType){
		for(let i =0;i<this.components.length;i++){
          	let component = this.components[i];
			if(component instanceof classType)
				return component;
		}
	}

	getComponentByName(name){
		for(let i =0;i<this.components.length;i++){
          	let component = this.components[i];
			if(component.name ===name)
				return component;
		}
		return -1;
	}
}

export {getEntityById,Entity}