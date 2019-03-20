// graph.js
// R.Devillebichot & M.Bohard
// Mini-projet TLI



function Click() {
document.getElementById("graph").onmousedown  = function(event) {
  event = event || window.event;
  event.preventDefault();
  getPosition(this, event);
}
}

function getPosition(canvas, event) {
    //var canvas = document.getElementById("graph");
    
    var abs = event.clientX;
    var ord = event.clientY;
    
    var x = abs - canvas.offsetLeft;
    var y = ord - canvas.offsetTop;
    
    
    console.log(x,y);
    
  
     graph(x,y);
}





 function graph(x,y) {
   var id = document.getElementById("graph");
   var context = id.getContext("2d");
   context.fillStyle = "#FF0000";
   context.beginPath();
   context.arc(x, y, 7, 0, Math.PI * 2, true);
   context.fill();
}
