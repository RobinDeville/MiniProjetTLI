// graph.js
// R.Devillebichot & M.Bohard
// Mini-projet TLI

//var tableauPoints = new Array();

var posX = new Array();
var posY = new Array();
var ligneDebut = new Array();
var ligneFin = new Array();
var id = document.getElementById("graph");
var context = id.getContext("2d");
var rang = 0;
var rangLigne = 0;
var pointDebut = false;
//var pointFin = false;
var pointSelectione = -1;
var test = 0;
var mousedownID= -1;
var draggedVerticleId = -1;
var mouseDragged = -1;
var oriente = false;
var decalFleche=20;
var LongFleche=10;
var LargFleche=10;

document.getElementById("graph").onmousedown = function(event) {
	event = event || window.event;
	event.preventDefault();
	var posXMouse = event.pageX - this.offsetLeft;
	var posYMouse = event.pageY - this.offsetTop;
	//console.log("position souris"+event.pageX);
	mousedownID=VerifPoint(posXMouse,posYMouse);
	getPosition(this, event);
	
	
	//console.log("test"+posXMouse);
	//console.log(event.pageX, this.offsetLeft);
}


document.addEventListener("keydown", function(event){
  console.log(event.which);
  keyCode = event.which;
  if (keyCode == 46){
	  supprPoint();
  }
})


document.getElementById("graph").onmousemove = function(event) {
	event = event || window.event;
	event.preventDefault();
	if(mousedownID > -1){
		var posXMouse = event.pageX - this.offsetLeft;
		var posYMouse = event.pageY - this.offsetTop;
		posX[mousedownID] = posXMouse;
		posY[mousedownID] = posYMouse;
		//CreatePoint(posX[pointSelectione],posY[pointSelectione]);
		RedessineTout();
	}
}


document.getElementById("graph").onmouseup = function(event) {
	event = event || window.event;
	event.preventDefault();
	mousedownID = -1;
}


function drawArrow(xDebut,yDebut,xFin,yFin){
	
	//console.log("traçage flèche");
	
	AB=Norm(xDebut,yDebut,xFin,yFin);
	xC=xFin+LongFleche*(xDebut-xFin)/AB;
	yC=yFin+LongFleche*(yDebut-yFin)/AB;
	xD=xC+LargFleche*(-(yFin-yDebut))/AB;
	yD=yC+LargFleche*((xFin-xDebut))/AB;
	xE=xC-LargFleche*(-(yFin-yDebut))/AB;
	yE=yC-LargFleche*((xFin-xDebut))/AB;
	context.beginPath();
	context.moveTo(xD,yD);
	context.lineTo(xFin,yFin);
	context.lineTo(xE,yE);
	context.stroke();
}


function getPosition(canvas, event) {    
    var abs = event.clientX;
    var ord = event.clientY;
    var x = abs - canvas.offsetLeft;
    var y = ord - canvas.offsetTop;
    //console.log(x,y);
    
    
    
    var j = VerifPoint(x,y);
    console.log("j = "+j);
   // console.log("pointSelectione = "+pointSelectione);
	
    if (j > -1){
      console.log("Déjà un point ici");
      fnTraceLigne(j);
    } else if (pointDebut == true){
	//if (pointDebut = true){
		pointDebut = false;
	} else {
      CreatePoint(x,y);
	  RedessineTout();
	}
	}
  

function VerifPoint(x,y){
	console.log('recherche de ['+x+' '+y+']');

	for (i=0;i<rang;i++) {
		//console.log('début Boucle');
		//console.log('i = '+i);
		Xmin = posX[i]-10;
		Xmax = posX[i]+10;
		Ymin = posY[i]-10;
		Ymax = posY[i]+10;

		console.log("point ["+posX[i]+" "+posY[i]+"]");

		if ((x >= Xmin) && (x <= Xmax)) {
			//console.log("(test X) i = "+i);
			
			if((y >= Ymin) && (y <= Ymax)) {
				pointSelectione = i;
				console.log("point trouvé : "+i);
				return pointSelectione;
			}


		}


	}
	// non trouvé
	return -1;
}
  
  
function supprPoint(){
	// alert("test");
	// var key = event.keyCode;
	if (pointDebut == true){
		delete posX[pointSelectione];
		delete posY[pointSelectione];
		
		for (i=0;i<rangLigne;i++){
			if (ligneDebut[i] == pointSelectione) {
				console.log("Suppression de ligne "+i+" car pointSelectione ="+pointSelectione);
				delete ligneDebut[i];
				delete ligneFin[i];
			// } else if (ligneFin[i] = pointSelectione){
				// delete ligneFin[i];
				// delete ligneDebut[i];
			}
		}
		// rang = rang-1;
		RedessineTout();
	} else {
		delete posX[pointSelectione];
		delete posY[pointSelectione];
		// rang=rang-1;
		RedessineTout();
	}
}
  
  
function RedessineTout(){
	  
   var canvas=document.getElementById("graph");
   context.clearRect(0, 0, canvas.width, canvas.height);
   
   
  //console.log("Fin Traçage points...");
  //console.log("rangLigne ="+rangLigne);
  
  for (j=0;j<rangLigne;j++){
      console.log("Traçage ligne n°"+rangLigne);
      var XDebut = posX[ligneDebut[j]];
      var YDebut = posY[ligneDebut[j]];
      var XFin = posX[ligneFin[j]];
      var YFin = posY[ligneFin[j]];
      context.beginPath();
      context.strokeStyle =  "#00b33c";
      context.lineWidth = 3;
      context.moveTo(XDebut,YDebut);
      context.lineTo(XFin,YFin);
      context.stroke();
	  
	  
	  
	  if (oriente === true){
		console.log(oriente);
		drawArrow(XDebut,YDebut,XFin,YFin);
	  }
	  
  }
  
  for (i=0;i<rang;i++) {
   console.log("Traçage point "+rang);
   context.strokeStyle =  "#000000";
   context.lineWidth = 1;
   context.fillStyle = "#FF0000";
   context.beginPath();
   context.arc(posX[i], posY[i], 10, 0, Math.PI * 2, true);
   // context.fillText(i,posX[i]-20,posY[i]-20);
   context.fill();   
   context.stroke();
   
   context.beginPath();
   context.font="30px, Veranda";
   context.fillStyle =  "#000000";
   context.fillWidth = 50;
   context.fillText(i,posX[i]-2,posY[i]);
   context.stroke();
   
  }
  pointDebut = false;
  }


function fnOriente(){
	if (oriente == false) {
		oriente = true;
		//alert("test1 "+oriente);
		RedessineTout();
	} else if (oriente == true){
		//alert("test2 "+oriente);
		oriente = false;
		RedessineTout();
	}
}
  
  
function fnTraceLigne(idPoint){
  console.log("pointDebut ="+pointDebut);  
  if (pointDebut == false){
   ligneDebut[rangLigne]=idPoint;
   console.log("ligneDebut["+rangLigne+"] = "+idPoint+".")
   context.strokeStyle =  "#000000";
   context.lineWidth = 1;
   context.fillStyle = "#FFFF00";
   context.beginPath();
   context.arc(posX[idPoint], posY[idPoint], 10, 0, Math.PI * 2, true);
   context.fill();
   context.stroke();
   pointDebut = true;
  } else if (idPoint > -1) {
    ligneFin[rangLigne] = idPoint;
    console.log("ligneFin["+rangLigne+"] = "+idPoint+".");
    rangLigne++;
	pointDebut = false;
    RedessineTout();
    
    
  }
}

  
function CreatePoint(x,y) {
   
   
   posX[rang] = x;
   posY[rang] = y;
   //console.log(" posY[rang] "+ posY[rang]);
   rang++;
   RedessineTout();
   
   //console.log(posX);
   

}


function Norm(xDebut,yDebut,xFin,yFin) {
	return (Math.sqrt(Math.pow(xFin-xDebut,2)+Math.pow(yFin-yDebut,2))-20);
	}
	
function PageRank(){
	
	nbPoint = 0;
	var table = "<table border=\"1\" id=\"TableRank\" style=\"border:solid 1px\"><tr>PageRank</tr><tr><td>Points</td><td>Iteration 0</td><td>Iteration 1</td></tr>";
	for (i=0;i<rang;i++){
		if (posX[i] != undefined) {
			nbPoint++;
		}
	}
	//console.log("Rang = "+rang);
	
	var Pr0 = 1/nbPoint;
	var comptPR1 = 0;
	for (i=0;i<rang;i++){
		var comptPR1 = 0;
		if (posX[i] != 0){
			valTestPoint = posX[i];
			
			for (j=0;j<rangLigne;j++){
				valTestLigne = ligneFin[j];
				
				if (valTestLigne == valTestPoint){
					comptPR1++;
				}
			}
		}
		console.log("comptPR1 = "+comptPR1);
	}
	
	// Sélectionner le premier point (vérifier que la valeur n'est pas "undefined"
	// PR0 d'un point = 1/nbPoint. 
	//
	// Vérifier si son index est présent dans xFin. Si oui, on va voir le xDebut associé, et on regarde combien de fois la valeur de ce xDebut est présente dns le tableau. On ajoute 1 à un comptPR1 à chaque fois. 
	// PR1 = PR0 / comptPR1
	// 
	//
	console.log("nbPoint ="+nbPoint);
	table = table+"</table>";
	document.getElementById("idPageRank").innerHTML = table;
	
}	
	
	
	
