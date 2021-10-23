window.onload = function(){
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 
const width = canvas.width = window.innerWidth; 
const height = canvas.height = window.innerHeight;
var lt = new Date();


ctx.beginPath();       // Start a new path
ctx.moveTo(30, 50);    // Move the pen to (30, 50)
ctx.lineTo(150, 100);  // Draw a line to (150, 100)
ctx.stroke();          // Render the path

update();


function update(){
    requestAnimationFrame(update); 
    console.log(FPS(lt, new Date()))
    lt = new Date();
}
console.log("Script Loaded")
}



function FPS(last,current){
    let fps = 1000/(current-last);
    return fps;
}

function print(msg){
    console.log(msg);
}