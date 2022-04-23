import {Entity} from "./entities.js";
function print(s){
 	console.log(s);
}

const INSTRUCTIONS={
	ADD:0x00,
	SUB:0x01,
	MUL:0x02,
	DIV:0x03,
	LITERAL:0x04,
	DAMAGE:0x05,
	INTEGER:0x06,
	STRING:0x07

}


function AssemblyToBytecode(code){/*
We would like to be able to roll something along the lines of:

INTEGER 1
INTEGER 3
ADD

into 

[0x06, 1,0x06,3,0x00]

	*/
	let result = [];
	let val;
	code = code.replaceAll("\n"," ");
	print(code);
	let tokens = code.split(" ");
	print(tokens);
	while(tokens.length>0){
		let token = tokens.shift();
		print(token);
		if(token == "") continue;
		print(token == "INTEGER");
		switch(token){
			case "INTEGER":
				val = tokens.shift();
				result.push(INSTRUCTIONS["INTEGER"]);
				result.push(parseInt(val));
				break;
			case "LITERAL":
			case "STRING":
				val = tokens.shift();
				result.push(INSTRUCTIONS["STRING"]);
				result.push(val);
				break;
			default:
				if(token in INSTRUCTIONS)
					result.push(INSTRUCTIONS[token]);
				else
					result.push(token);
		}
		print(result);
	}
	return result;
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
		let a,b, value,context;
        print(`Executing ByteCode:`);
        print(`-------------------`);
		for(let i=0;i<bytecodeArray.length;i++){
          let instruction = bytecodeArray[i];
			switch(instruction){
				case INSTRUCTIONS["ADD"]:
					b = this.pop();
					a = this.pop();
					this.push(a+b);
					print(`ADD => ${a+b}`);
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
				case INSTRUCTIONS["INTEGER"]:
					context = "INTEGER";
				case INSTRUCTIONS["STRING"]:
					context = "STRING";
				case INSTRUCTIONS["LITERAL"]:
					context = context || "LITERAL";
					value = bytecodeArray[++i];
					this.push(value);
                	print(`${context} ${value}`);
                	context = undefined;
					break;
				case INSTRUCTIONS["DAMAGE"]:
					b = this.pop();
					a = this.pop();
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

let test = `
INTEGER 1
INTEGER 3
ADD
`;
console.log(test);
let bc = AssemblyToBytecode(test);
console.log(bc);
let vm = new VM();
vm.interpret(bc);
console.log("END VM");

export {VM};