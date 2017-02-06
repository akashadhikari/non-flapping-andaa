var bird;
var pipes=[];

function setup() {
	createCanvas(1400,600);
	bird = new Bird();
	pipes.push(new Pipe());
}

function draw() {

  background(0);

  for (var i=pipes.length-1; i>=0; i--) {
  	pipes[i].show();
  	pipes[i].update();

  	if(pipes[i].hits(bird)) {
  		console.log("HIT!");
  	}

  	if (pipes[i].offscreen()) {
  		pipes.splice(i,1); //splice deletes an element from the array
  	}
  }

  bird.update();
  bird.show();

  if(frameCount%38==0) {
  	pipes.push(new Pipe());
  }
  
}

function keyPressed() {
	if (key==' ') {
		bird.up();
	}
}

//BIRD ATTRIBUTES HERE! 

function Bird() {
	this.y=height/2; //bird at the center of the window
	this.x=25; 

	this.gravity=0.7;
	this.lift=-17;
	this.velocity=0;

	this.show = function() { //drawing the bird
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

	this.hits=function(bird) {
		if(bird.y<this.top || bird.y>height-this.bottom) {
			if(bird.x>this.x && bird.x<this.x+this.w) {
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