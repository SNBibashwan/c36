

var paint = [];
var nline = [];
var position;
function setup() {
  canvas = createCanvas(400,400);
  canvas.mousePressed(sline);

  database = firebase.database();

  var brushPosition = database.ref('paint/position');
  brushPosition.on("value",showError);

}

function draw() {
  background("lightskyblue");
  stroke("black");
  strokeWeight(1);
  text("Press the SpaceBar to clear the canvas!",40,15);

  if(mouseIsPressed){
    var draw = {
      x: mouseX,
      y: mouseY
    }
    nline.push(draw);
    var nlineRef = database.ref('nline');
    nlineRef.set({
      "line":nline
    })
  }

  var color = "white";

  stroke(color);
  strokeWeight(10);
  noFill();
  for(var i = 0; i < paint.length; i++){
    var ndraw = paint[i];
    beginShape();
    for(var m = 0; m < ndraw.length; m++){
      vertex(ndraw[m].x,ndraw[m].y);
    }
    endShape();
  }

}

function sline(){
  nline = [];
  paint.push(nline);
}


function readPosition(){
  /*
  database.ref('line').on('value',(data)=>{
    paint = data.val().d
  })
  */
}


function keyPressed(){
  if(keyCode === 32){
    paint = [];
    var ref = database.ref('nline');
    ref.remove();
  }

}
function showError(){
    console.log("ERROR");
}
