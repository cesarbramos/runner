let FPS = 30;
let canvas, ctx;
let ancho = 700;
let alto = 300;
let imgProta,imgNube,imgCactus,imgFondo;
let suelo = 216;

let prota = {
	y: suelo,
	vy: 0,
	gravedad: 2,
	salto: 22,
	vymax: 9,
	saltando: false,
	muerto: false
};

let nivel = {
	velocidad: 9,
	puntuacion: 0
};

let cactus = {
	x: ancho+100,
	y: suelo
};

let nube = {
	x: ancho + 100,
	y: 15,
	velocidad: 2
};

let fondo = {
	x: 0
};

document.addEventListener('keydown', function(event){
	if(event.keyCode == 32){
		if(!prota.muerto){
			if(!prota.saltando){
				saltar();
			}
		} else{
			nivel.puntuacion = 0;
			nivel.velocidad = 9;
			cactus.x = ancho + 100;
			nube.x = ancho + 10;
			nube.velocidad = 2;
			prota.muerto = false;
		}
	}
});

inicializa();

function inicializa(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	cargaImagenes();
}

function cargaImagenes(){
	imgProta = new Image();
	imgNube = new Image();
	imgCactus = new Image();
	imgFondo = new Image();

	imgProta.src = "img/link.png";
	imgNube.src = "img/cloud-white.png";
	imgCactus.src = "img/knight.png";
	imgFondo.src = "img/background.png";
}

function dibujarProta(){
	ctx.drawImage(imgProta,0,0,32,64,100,prota.y,32,64);
}

function dibujarCactus(){
	ctx.drawImage(imgCactus,0,0,32,64,cactus.x, cactus.y, 32, 64);
}

function dibujarNube(){
	ctx.drawImage(imgNube,0,0,64,64,nube.x,nube.y, 62,38);
}

function dibujarFondo(){
	ctx.drawImage(imgFondo,fondo.x,0,700,300,0,0,700,300);
}

function logicaCactus(){
	if(cactus.x < -100){
		cactus.x = ancho + 100;
		nivel.puntuacion++;
	} else{
		cactus.x-= nivel.velocidad;
	}
}

function logicaNube(){
	if(nube.x < -100){
		nube.x = ancho + 100;
	} else{
		nube.x-= nube.velocidad;
	}
}

function logicaFondo(){
	if(fondo.x > 700){
		fondo.x = 0;
	} else{
		fondo.x += nivel.velocidad;
	}
}

function saltar(){
	prota.saltando = true;
	prota.vy = prota.salto;
}

function gravedad(){
	if(prota.saltando){
		if(prota.y - prota.vy  > suelo){
			prota.saltando = false;
			prota.vy = 0;
			prota.y = suelo;
		} else{
			prota.vy -= prota.gravedad;
			prota.y -= prota.vy;
		}	
	}
}

function puntuacion(){
	ctx.font = "30px impact";
	ctx.fillStyle = "#555555";
	ctx.fillText(`${nivel.puntuacion}`,600,50);

	if(prota.muerto == true){
		ctx.font = "60px impact";
		ctx.fillText(`GAME OVER`,240,150);
	}
}

function colision(){
	if(cactus.x >= 100 && cactus.x <= 132){
		if(prota.y >= suelo){
			prota.muerto = true;
			nube.velocidad = 0;
			nivel.velocidad = 0;
		}
	}
}

function borrarCanvas(){
	ctx.clearRect(0,0, ancho, alto);
}

function main(){
	borrarCanvas();
	logicaFondo();
	logicaNube();
	logicaCactus();
	colision();
	dibujarFondo();
	dibujarNube();
	dibujarCactus();
	dibujarProta();
	puntuacion();
	gravedad();
	
}

setInterval("main()" , 1000/FPS);