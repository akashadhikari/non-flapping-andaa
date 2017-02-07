var anda;
var pipes=[];

function setup() {
	createCanvas(1400,600);
	anda = new Anda();
	pipes.push(new Pipe());
}

function draw() {

  background(0);

  for (var i=pipes.length-1; i>=0; i--) {
  	pipes[i].show();
  	pipes[i].update();

  	if(pipes[i].hits(anda)) {
  		console.log("HIT!");
  	}

  	if (pipes[i].offscreen()) {
  		pipes.splice(i,1); //splice deletes an element from the array
  	}
  }

  anda.update();
  anda.show();

  if(frameCount%38==0) {
  	pipes.push(new Pipe());
  }
  
}

function keyPressed() {
	if (key==' ') {
		anda.up();
	}
}

//anda ATTRIBUTES HERE! 

function Anda() {
	this.y=height/2; //anda at the center of the window
	this.x=25; 

	this.gravity=0.7;
	this.lift=-17;
	this.velocity=0;

	this.show = function() { //drawing the anda
		fill(255);
		ellipse(this.x, this.y, 25, 32);
	}

	this.up=function() {
		this.velocity += this.lift;
	}	 

	this.update= function() {
		this.velocity+=this.gravity;
		this.velocity*=0.9;
		this.y+=this.velocity;

		if(this.y>height) {
			this.y=height;
			this.velocity=0;
		}

		if(this.y<0) {
			this.y=0;
			this.velocity=0;
		}
	}
}

//PIPE ATTRIBUTES HERE
function Pipe() {
	this.top=random(height/2);
	this.bottom=random(height/2);
	this.x=width;
	this.w=20;
	this.speed=5;

	this.highlights=false;

	this.hits=function(anda) {
		if(anda.y<this.top || anda.y>height-this.bottom) {
			if(anda.x>this.x && anda.x<this.x+this.w) {
				this.highlight=true;
				return true;
			}	
		}
		return false;
	}

	this.show=function() {
		fill(255);
		if(this.highlight) {
			fill(255,0,0);
		}
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height-this.bottom, this.w, this.bottom);
	}

	this.update=function() {
		this.x-=this.speed;
	}

	this.offscreen=function() {
		if(this.x<-this.w) {
			return true;
		} else {
			return false;
		}
	}
}