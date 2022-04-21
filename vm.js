    
const CONSOLE = document.getElementById("CONSOLE");

function print(s){
	CONSOLE.innerHTML+=`<br>${s}`;
 	console.log(s);
}
    
let EUID = 0;
let CUID = 0;
const COMPONENTS = [];
const ENTITIES = [];

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
		this.components.push(component);
        component.parentID = this.id;
	}

	getComponentByClass(classType){
		for(let i =0;i<this.components.length;i++){
          	let component = this.components[i];
			if(component instanceof classType)
				return component;
		}
	}
}

class Component{
	constructor(attributes){
		this.parentID = undefined;
		this.id = CUID++;
		this.attributes = {};
		Object.assign(this.attributes,attributes);
		COMPONENTS.push(this);
	}
}

//testing some things
let wiz_01 = new Entity();
let wiz_02 = new Entity();

class HealthComponent extends Component{
	constructor(attributes){
		super(attributes);
	}

	damage(amt){
		let result = this.attributes["current"]-amt;
		this.attributes["current"]=Math.max(0,result);
	}

	heal(amt){
		let result = this.attributes["current"]+amt;
		this.attributes["current"]=Math.min(this.attributes["max_health"],result);
	}
}

wiz_01.addComponent(new HealthComponent({"current":10,"max_health":10}));
wiz_02.addComponent(new HealthComponent({"current":10,"max_health":10}));


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
	"ADD":0x00,
	"SUB":0x01,
	"MUL":0x02,
	"DIV":0x03,
	"LITERAL":0x04,
	"DAMAGE":0x05,

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

let vm = new VM();
vm.interpret(fireball);
print(wiz_01.getComponentByClass(HealthComponent).attributes["current"]);
print(wiz_02.getComponentByClass(HealthComponent).attributes["current"]);