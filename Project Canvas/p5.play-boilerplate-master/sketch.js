var database;
var canvas;
var drawing = [];
var db_drawing = [];
var clearAll;

function setup(){
    createCanvas(500,500);
    canvas = createCanvas(displayWidth,displayHeight);
    database = firebase.database();
    clearAll = createButton("ClearAll");
}

function draw()
{
    background("black");
    readData();
    stroke(255) 
    strokeWeight(5); 
    fill("black");
    clearAll.position(displayWidth-150, 100);
    clearAll.mousePressed(()=>{
        alert("please refresh the screen");
        background(255);
        drawing = [];
        db_drawing = [];
    })
    for(var i=0; i<db_drawing.length; i++)
    {
        console.log(db_drawing[i].x);
        stroke('purple'); // Change the color
       strokeWeight(10); 
        point(db_drawing[i].x,db_drawing[i].y);
    }
    
}

function mouseDragged()
{
    var point = 
    {
        x : mouseX,
        y : mouseY
    }
    drawing.push(point);
    var drawRef = database.ref("drawing")
    drawRef.set({
        "d" : drawing
    })
}
function readData() 
{ 
    database.ref('drawing/').on('value', (data) => { 
        db_drawing = data.val().d }) 
}
