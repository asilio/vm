let CUID = 0;
const COMPONENTS = [];

function getComponentById(id){
	for(let i = 0;i< COMPONENTS.length;i++){
		component = COMPONENTS[i];
		if(component.id === id)
			return component;
	}
	throw new Error(`No component with an ID of ${id} exists!`);
}

class Component{
	constructor(){
		this.entity= undefined;
		this.name="";
		this.id = CUID++;
		COMPONENTS.push(this);
	}

	update(dt){

	}
}

function ComponentFactory(attributes){
	let component = new Component();
	for(key in attributes){
		let value = attributes[key];
		component[key] = value;
	}
	return component;
}

const COMPONENT_TEMPLATES = {
	HealthComponent:{
		max_health:10,
		current:10,
		damage:function(value){
			if(this.current-value>=0){this.current=this.current-value}
		},
		heal:function(value){
			if(this.current+value<=this.max_health){this.current=this.current+value}
		},
	},
	
	PositionComponent:{
		x:0,y:0,z:0
	},

	SpellsComponent:{
		known:[]
	},
}

function GenerateComponent(name){
	let attributes = {name:name};
	Object.assign(attributes,COMPONENT_TEMPLATES[name])
	return ComponentFactory(attributes);
}