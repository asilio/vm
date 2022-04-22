    
const CONSOLE = document.getElementById("CONSOLE");

function print(s){
	CONSOLE.innerHTML+=`<br>${s}`;
 	console.log(s);
}
    

let CUID = 0;
const COMPONENTS = [];


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

let entity = new Entity();
let villain = new Entity();
villain.name = "Villain!";
entity.addComponent(GenerateComponent("HealthComponent"));
villain.addComponent(GenerateComponent("HealthComponent"));
villain.getComponentByName("HealthComponent").damage(5);
print(entity);
print(villain);
/*
FIREBALL SPELL   
CODE 			STACK  		COMMENT
------------------------------------
LITERAL 1 		[1]			LOAD DAMAGE VALUE
LITERAL 0   	[1,0]		LOAD TARGET
DAMAGE 			[]			DAMAGE TARGET
*/
let fireball =[0x04, 1,0x04,0,0x05];

const INSTRUCTIONS={
	ADD:0x00,
	SUB:0x01,
	MUL:0x02,
	DIV:0x03,
	LITERAL:0x04,
	DAMAGE:0x05,
}



class VM{
	constructor(max_stack){
		this.MAX_STACK = max_stack;
		this.stack = [];
	}

	pop(){
		return this.stack.pop();
	}

	push(val){
		if(this.stack.length>this.MAX_STACK)
			throw new Error(`Stack Overflow! Woohoo! ${this.stack}`)
		this.stack.push(val);
	}


	interpret(bytecodeArray){
		let a,b, value;
        print(`Executing ByteCode:`);
        print(`-------------------`);
		for(let i=0;i<bytecodeArray.length;i++){
          let instruction = bytecodeArray[i];
			switch(instruction){
				case INSTRUCTIONS["ADD"]:
					b = this.pop();
					a = this.pop();
					this.push(a+b);
					break;
				case INSTRUCTIONS["SUB"]:
					b = this.pop();
					a = this.pop();
					this.push(a-b);
					break;
				case INSTRUCTIONS["MUL"]:
					b = this.pop();
					a = this.pop();
					this.push(a*b);
					break;
				case INSTRUCTIONS["DIV"]:
					b = this.pop();
					a = this.pop();
					this.push(a/b);
					break;
				case INSTRUCTIONS["LITERAL"]:
					value = bytecodeArray[++i];
					this.push(value);
                	print(`LITERAL ${value}`);
					break;
				case INSTRUCTIONS["DAMAGE"]:
					let b = this.pop();
					let a = this.pop();
					print(`DAMAGE ${a} TO ${b}`);
                	getEntityById(b).getComponentByClass(HealthComponent).damage(a);
					break;
				default: 
					throw new Error(`Unknown instruction: ${instruction}`); 
			}
		}
        print(`Complete`);
        print(`-------------------`);
	}
}
