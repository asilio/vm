import {Entity} from "./entities.js";
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