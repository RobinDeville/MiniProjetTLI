console.log("Script JS lancé");

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var dernierPoint = 0;
var pointSelectione = -1;

class Sommet 
{
  constructor(id, x, y)
  {
    this.id = id;
    this.x = x;
    this.y = y;
  }  
}

class Ligne
{
  constructor(id,x1,y1,x2,y2)
  {
    this.id = id;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

var sommets = new Array();


document.getElementById("canvas").onmousedown  = function(event) {
  event = event || window.event;
  event.preventDefault();
  Click(this, event);
}

function Click(canvas,event)
{
  if(pointSelectione > -1)
  {
    ChangeColorDot(sommets[pointSelectione].x,sommets[pointSelectione].y,"red");
  }
  pointSelectione = -1;
  console.log("clic reconnu");
  var posX = event.pageX - canvas.offsetLeft;
  var posY = event.pageY - canvas.offsetTop;
  var i = SelectDot(posX,posY);
  if (i>-1)
    {
	ChangeColorDot(sommets[i].x,sommets[i].y,"orange");	
	if(pointSelectione > -1)
	{
	  //écrire une ligne entre i et pointSelectione
	}
    }
  else
    {
      console.log("Création de point");
      CreateDot(posX,posY);
    }
}


function SelectDot(posX,posY)
{
  var Xmin, Xmax, Ymin, Ymax;
  for (i = 0;i<dernierPoint;i++)
  {
    Xmin = sommets[i].x+10;
    Xmax = sommets[i].x-10;
    Ymin = sommets[i].y+10;
    Ymax = sommets[i].y-10;
   console.log("On teste le point n° "+i);
   console.log("la position de la souris est : " +  posX + " , " +  posY);
   console.log("le X de la souris doit se trouver entre " + Xmin +" et "+Xmax);
   console.log("le X de la souris doit se trouver entre " + Ymin +" et "+Ymax);
    if ((posX<Xmin)&&(posX>Xmax))
    {
      console.log("Dans au dessus ou au dessous du cercle n°" + i);
      if((posY<Ymin)&&(posY>Ymax))
      {
	console.log("Cercle n° "+i+" séléctionné")
	pointSelectione = i;
	return i;
      }
    }
  }
  return -1;
}

function CreateDot(posX,posY)
{
  ChangeColorDot(posX,posY,"red");
  sommets[dernierPoint] = new Sommet(null,posX,posY);
  console.log("la position du sommet est : " + sommets[dernierPoint].x + " , " +  sommets[dernierPoint].y);
  console.log("la position de la souris est : " +  posX + " , " +  posY);
  dernierPoint++;
}

function ChangeColorDot(posX,posY,color)
{
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(posX,posY,10,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
}
  
  



