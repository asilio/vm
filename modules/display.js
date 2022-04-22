import { Display } from "https://ondras.github.io/rot.js/lib/index.js";

let options ={
	width:11,
	height: 5
}

let d = new Display(options);

function initialize(){
	document.body.appendChild(d.getContainer());
	for(let i = 0; i<options.width;i++){
		for(let j=0;j<options.height;j++){
			if(!i || !j || i+1 == options.width || j+1 == options.height){
				d.draw(i,j,"#","gray");
				continue;
			}
			d.draw(i,j,".","#666");
		}
	}
	d.draw(options.width>>1, options.height >> 1, "@","goldenrod");
}
export {Display, initialize};