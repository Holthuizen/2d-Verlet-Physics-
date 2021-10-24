//globals
var playing = false; 
var debug = false; 
var points = [];
var sticks = [];

//setup
window.onload = function(){

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d'); 
const width = canvas.width = window.innerWidth - (window.innerWidth /6); 
const height = canvas.height = window.innerHeight - (window.innerHeight/3);
let lastLoopTime = new Date();
let frameCount= 0; 
let loopCount = 0; 




function update(){
    requestAnimationFrame(update); 
    
    //Game LOOP
    if(playing){
        ctx.clearRect(0,0,width,height);
        updatePoints();
        for(let p = 0; p < 5; p++){
            updateSticks();
            constrainPoints(width,height); 
        }
        drawPoints(ctx);
        drawSticks(ctx);

        //fps
        frameCount += FPS(lastLoopTime, new Date()); 
        loopCount++; 
        lastLoopTime = new Date();
        if(debug){
            let avgFPSPerLoop = Math.round(frameCount/loopCount); 
            print(avgFPSPerLoop);
        }
    }
}


//points

points.push(new Point(width/2, height/2, 5))
points.push(new Point(width/2+200, height/2, 5))
points.push(new Point(width/2, height/2+200, 5))
points.push(new Point(width/2+200, height/2+200,5))

sticks.push(new Stick(0,1));
sticks.push(new Stick(0,2));
sticks.push(new Stick(2,3));
sticks.push(new Stick(1,3));
sticks.push(new Stick(0,3));


//start
update();
console.log("Script Loaded")
}


/* -----------------------------------------------------------
ENGINE Classes
-------------------------------------------------------------*/

class Point {
    constructor(x, y,r=1,simulated=true) {
        if(!x || !y){
            console.error("point x and y values are required!")
            return
        }
        this.x = x; 
        this.y = y;
        this.oldx = x-5; 
        this.oldy = y+5; 
        this.r = r;
        this.simulated = simulated; 
    }

    get pos(){
        return new Vector2(this.x,this.y)
    }

    get vx(){
        return this.x - this.oldx; 
    }
    get vy(){
        return this.y - this.oldy; 
    }
  
    draw(ctx){
        ctx.beginPath();
        //void ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
        ctx.fill();      
    }
}

class Stick{
    constructor(a,b){
        this.p0 = points[a];
        this.p1 = points[b]; 
        this.length = distance(this.p0,this.p1); 
    }
}


/* -----------------------------------------------------------
ENGINE Physics
-------------------------------------------------------------*/
//Verlet Integration / physics
function updatePoints(){
    points.forEach(p => {
        let bounce = 0.9;
        let gravity = 0.5; 
        let friction = 0.99; 
        let vx = p.vx * friction; 
        let vy = p.vy * friction; 

        p.oldx = p.x; 
        p.oldy = p.y; 

        p.x += vx; 
        p.y += vy; 
        
        //forces
        p.y += gravity; 
        
    });
}

function constrainPoints(width, height){

    points.forEach(p => {
        let bounce = 0.9;
        let vx = p.vx ; 
        let vy = p.vy ; 
        //bounce
        if (p.x < 0){
            p.x = 0; 
            p.oldx = p.x + vx*bounce; 
        }
        if (p.x > width){
            p.x = width; 
            p.oldx = p.x + vx*bounce; 
        }

        if(p.y < 0){
            p.y = 0; 
            p.oldy += vy*bounce; //this can be negative?
        }

        if(p.y > height){
            p.y = height; 
            p.oldy = p.y+vy*bounce; 
        }


    });

}

function updateSticks(){
    for (let index = 0; index < sticks.length; index++) {
        const s = sticks[index],
        dx = s.p1.x - s.p0.x,
        dy = s.p1.y - s.p0.y, 
        distance = Math.sqrt(dx*dx + dy*dy), 
        diff = s.length - distance,
        percent = diff /distance / 2, 
        offsetX = dx*percent,
        offsetY = dy*percent; 

        s.p0.x -= offsetX; 
        s.p0.y -= offsetY;
        s.p1.x += offsetX; 
        s.p1.y += offsetY;  
    }
}


//calculates distance between points
function distance(a,b){
    if(!a || !b){
        console.error("function distance requires two points")
        return 
    }

    let dx = a.x - b.x; 
    let dy = a.y - b.y; 
    return Math.sqrt(dx*dx + dy*dy); 
}


/* -----------------------------------------------------------
ENGINE Rendering
-------------------------------------------------------------*/

function drawPoints(ctx){
    points.forEach(point=> {
        point.draw(ctx);
    });
}


function drawSticks(ctx){
    for (let index = 0; index < sticks.length; index++) {
    const s = sticks[index]; 
    ctx.beginPath();       // Start a new path
    ctx.moveTo(s.p0.x,s.p0.y);    // Move the pen to (30, 50)
    ctx.lineTo(s.p1.x,s.p1.y);  // Draw a line to (150, 100)
    ctx.stroke();          // Render the path 
    }
}

  



/* -----------------------------------------------------------
UTILITY FUNCTIONS
-------------------------------------------------------------*/

//start stop game       
function TogglePlay(){
    playing = !playing; 
    playing? console.log("game is running") : console.log("Game Stopped"); 
}
//start stop debugger
function ToggleDebug(){
    debug = !debug; 
}

function FPS(last,current){
    let fps = 1000/(current-last);
    return fps;
}

function print(msg){
    console.log(msg);
}