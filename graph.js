// graph.js
// R.Devillebichot & M.Bohard
// Mini-projet TLI

//var tableauPoints = new Array();

var posX = new Array();
var posY = new Array();
var id = document.getElementById("graph");
var context = id.getContext("2d");
var TabLignesDebut = new Array();
var TabLignesFin = new Array();
var rang = 0;
var rangLigne = 0;
var pointSelectione = -1;
var test = 0;
var XDebut = -1;
var YDebut = -1;
var XFin = -1;
var YFin = -1;



function Click() {
document.getElementById("graph").onmousedown  = function(event) {
  event = event || window.event;
  event.preventDefault();
  getPosition(this, event);
  }
}


function getPosition(canvas, event) {    
    var abs = event.clientX;
    var ord = event.clientY;
    var x = abs - canvas.offsetLeft;
    var y = ord - canvas.offsetTop;
    console.log(x,y);
    
    
    
    var j = VerifPoint(x,y);
    //console.log("j = "+j);
    //console.log("pointSelectione = "+pointSelectione);
	
    if (j >= -1){
      console.log("Déjà un point ici");
      StockCoord(pointSelectione);
    } else {
      CreatePoint(x,y);
  }
  
}
  

function VerifPoint(x,y){
   console.log('début VerifPoint');
   
   for (i=0;i<rang;i++) {
    //console.log('début Boucle');
    //console.log('i = '+i);
    Xmin = posX[i]-5;
    Xmax = posX[i]+5;
    Ymin = posY[i]-5;
    Ymax = posY[i]+5;
    
    //console.log("Xmin = "+Xmin);
    //console.log("Xmax = "+Xmax);
    //console.log("x ="+x);
	
    if ((x < Xmin) || (x > Xmax) || (y < Ymin) || (y > Ymax)) {
		//console.log("(test X) i = "+i);
		//console.log("x est bien plus petit que Xmin ou plus grand que Xmax");
		
		if((y < Ymin) || (y > Ymax)) {
			pointSelectione = i;
			//console.log("y est bien plus petit que Ymin ou plus grand que Ymax");
			
		}

      
    } else {
      return -1;
    }
    
	
  }
  
    
}
  

function CreatePoint(x,y) {
   XDebut = -1;
   YDebut = -1;
   
   context.fillStyle = "#FF0000";
   context.beginPath();
   context.strokeStyle =  "#000000";
   context.lineWidth = 1;
   context.arc(x, y, 6, 0, Math.PI * 2, true);
   context.fill();
   context.stroke();
   
   posX[rang] = x;
   posY[rang] = y;
   console.log(" posY["+rang+"] "+ posY[rang]);
   rang++;
   
   //console.log(posX);
   
   
}

function fnZero(){
  console.log("Debut");
  context.clearRect(0,0,400,400);
  delete(posX);
  delete(posY);
  delete(rang);
  delete(rangLigne);
  delete(pointSelectione);
  delete(test);
  delete(XDebut);
  delete(YDebut);
  delete(XFin);
  delete(YFin);
  console.log("Fin");
}

function StockCoord(pointSelectione){
    
  console.log("pointSelectione = "+pointSelectione);	
  
    if ((XDebut == -1) || (YDebut == -1)) {
      console.log("Stockage des coordonnées du point de départ de la ligne");
      console.log("Coordonnées du point sélectionné : x = "+posX[pointSelectione+1]+", y = "+posY[pointSelectione+1]);
      
      TabLignesDebut[rangLigne] = pointSelectione+1;
      
      XDebut = posX[pointSelectione+1];
      YDebut = posY[pointSelectione+1];
    } else {
      console.log("Stockage des coordonnées du point d'arrivé de la ligne");
      console.log("Coordonnées du point sélectionné : x = "+posX[pointSelectione+1]+", y = "+posY[pointSelectione+1]);
      XFin = posX[pointSelectione+1];
      YFin = posY[pointSelectione+1];
      console.log("Traçage en partant du point "+XDebut+","+YDebut+" vers le point "+XFin+","+YFin+"...");
      context.beginPath();
      context.strokeStyle =  "#00b33c";
      context.lineWidth = 3;
      context.moveTo(XDebut,YDebut);
      context.lineTo(XFin,YFin);
      context.stroke();
      XDebut = -1;
      YDebut = -1;
      TabLignesFin[rangLigne] = pointSelectione+1;
      rangLigne++;
    }
      
      XFin = -1;
      YFin = -1;
    context.restore();
    console.log("Après boucle : XDebut = "+XDebut);
    
    console.log(TabLignesFin[0]);
}


