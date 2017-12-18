var gallery;

function Control(val){
this.value = val || 6;

}

Control.prototype.create = function(){

}
function Main(imgNum){
	this.div = document.getElementById('carousel');
	this.wrap = document.getElementById('wrap');
	this.numberOfImages = imgNum || 6;
	this.imgSize = {
		width:'200',
		height:'250'
	};
	this.degree = 360/this.numberOfImages;
	this.images = [];
	
	
	
	this.lastX=0,this.lastY=0,
	this.nowX=0,this.nowY=0,
	this.minusX=0,this.minusY=0;
	this.roX=0;
	this.roY = -10;
	this.timer = null;
	this.init(imgNum);

	this.listenToEvents();
}



Main.prototype.init = function(num){
	this.clear();
	for(var i=1;i<=num;i++){
		var img = document.createElement('img');
		img.src = 'img/' + i + '.jpg';
		img.style.width = this.imgSize.width+'px';
		img.style.height = this.imgSize.height+'px';
		img.classList.add('rotate-gallery-img');
		this.div.appendChild(img);	
	}

}
Main.prototype.clear = function(){
	this.div.innerHTML = '';

	this.images = null;
	
}

Main.prototype.animateStart = function(){
	this.images = document.getElementsByClassName('rotate-gallery-img');
var that = this;
	Array.prototype.forEach.call(this.images,function(img,i){
		i=i+1;
		img.style.transition = '1s ' + (that.numberOfImages-i)*0.2 + 's';
		img.style.transform = 'rotateY(' + i*that.degree + 'deg) translateZ(390px)';
		
	})
	var p = document.createElement('p');
	this.div.appendChild(p);
	
}

Main.prototype.listenToEvents = function(){
	var that = this;
	document.onmousedown = function(e){
that.dealWithMouseDown(e);
document.onmousemove = function(e){
		that.dealWithMouseMove(e);
	}
	document.onmouseup = function(e){
		that.dealWithMouseUp(e);
	}
	}
}


Main.prototype.dealWithMouseDown = function(e){
	e = e || window.event;
	this.lastX = e.clientX;
	this.lastY = e.clientY;
	clearInterval(this.timer);
}

Main.prototype.dealWithMouseMove = function(e){
e = e || window.event;
	this.nowX = e.clientX;
	this.nowY = e.clientY;
	this.minusX = this.nowX - this.lastX;
	this.minusY = this.nowY - this.lastY;
	
	this.roY += this.minusX*0.1;
	this.roX -=this.minusY*0.1;

	this.div.style.transform='rotateX('+this.roX+'deg) rotateY('+this.roY+'deg)';
	this.lastX = this.nowX;
	this.lastY = this.nowY;
	
}

Main.prototype.dealWithMouseUp = function(e){
	document.onmousemove = null;
	var that=this;
	this.timer = setInterval(function(){
		that.minusX *= 0.9;
		that.minusY *= 0.9;
		that.roY += that.minusX*0.2;
		that.roX -= that.minusY*0.1;
		that.div.style.transform = 'rotateX('+that.roX+'deg) rotateY('+that.roY+'deg)';
		if(Math.abs(that.minusX)<0.1 && Math.abs(that.minusY) < 0.1){
			clearInterval(that.timer);
		}
	},20)
	return false;
}


window.onload = function(){
	document.getElementById('form').addEventListener('change',formChanged);
	gallery = new Main(6)
	gallery.animateStart();

}


function formChanged(e){
	var value = e.target.value;
	value = parseInt(value,10);
	gallery = new Main(value)
	gallery.animateStart();
	console.log(typeof value);
	
}