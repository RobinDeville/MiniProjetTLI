// graph.js
// R.Devillebichot & M.Bohard
// Mini-projet TLI

var tableauPoints = new Array();

var posX = new Array();
var posY = new Array();
var id = document.getElementById("graph");
var context = id.getContext("2d");
var rang = 0;
var pointSelectione = -1;
var test = 0;

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
    console.log("j = "+j);
   // console.log("pointSelectione = "+pointSelectione);
	
    if (j >= -1){
      console.log("Déjà un point ici");
    } else {
      CreatePoint(x,y);
  }
  
}
  

function VerifPoint(x,y){
   console.log('début VerifPoint');
   
   for (i=0;i<rang;i++) {
    console.log('début Boucle');
    console.log('i = '+i);
    Xmin = posX[i]-3;
    Xmax = posX[i]+3;
    Ymin = posY[i]-3;
    Ymax = posY[i]+3;
    
    console.log("Xmin = "+Xmin);
    console.log("Xmax = "+Xmax);
    console.log("x ="+x);
	
    if ((x < Xmin) || (x > Xmax)) {
		console.log("(test X) i = "+i);
		console.log("x est bien plus petit que Xmin ou plus grand que Xmax");
		
		if((y < Ymin) || (y > Ymax)) {
			pointSelectione = i-1;
			console.log("y est bien plus petit que Ymin ou plus grand que Ymax");
			
		}

      
    } else {
      return -1;
    }
    
	
  }
  
    
}
  


function CreatePoint(x,y) {
   
   context.fillStyle = "#FF0000";
   context.beginPath();
   context.arc(x, y, 6, 0, Math.PI * 2, true);
   context.fill();
   context.stroke();
   
   posX[rang] = x;
   posY[rang] = y;
   console.log(" posY[rang] "+ posY[rang]);
   rang++;
   
   //console.log(posX);
   
   
}
