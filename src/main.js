   //this file depends on init.js and utils.js 
   let shapes = []
   let rect; 





   function start(){
        ctx.fillStyle = "#4c8ffc";    
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        rect = new PointCollection(width/2,-height/2);
        rect.addPoint(new Point(200,200,200,199));
        rect.addPoint(new Point(400,200,400,199));
        rect.addPoint(new Point(200,400,200,400));
        rect.addPoint(new Point(400,400,400,400));
        rect.addStick(0,1);
        rect.addStick(0,2);
        rect.addStick(1,3);
        rect.addStick(2,3);
        rect.addStick(0,3);
        
    }
    
    function update(){
        ctx.fillStyle = "#4c8ffc"; 
        ctx.clearRect(0,0,width,height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        rect.updatePoints(0.2,0.99);
        rect.renderPoints();
        rect.renderSticks();

        for(let i = 0; i < 3; i++){
            rect.updateSticks(); 
            rect.constrainPoints(0.8); 
        }


    }
    
    function clickHandler(){
        console.log("clicked!!!")
        //addPointToShape(testShape)
    }

    // function createPoint(x,y,color="black"){
    //     //console.log(x,y)
    //     ctx.fillStyle = color;
    //     ctx.beginPath();
    //     ctx.arc(x, y, 4, 0, 2 * Math.PI, true);
    //     ctx.stroke();
    // }


    // function addPointToShape(shape){
    //     if(insideRect(mouseX,mouseY,width,height)){
    //         let p = new Point(mouseX,mouseY); 
    //         shape.addPoint(p); 
    //     }
    // }



//todo re implement verlet physics from the ground up, but using shapes as basis to hold the points and sticks


class PointCollection{
    constructor(x,y){
        this.id = uid(); 
        this.x = x; 
        this.y = y; 
        this.points = []
        this.sticks = []
    }

    addPoint(p){
        p.x += this.x; 
        p.y += this.y; 
        p.oldx += this.x; 
        p.oldy += this.y;
        this.points.push(p);
    }

    addStick(i,j){
        this.sticks.push(new Stick(this.points[i],this.points[j]));
    }

    //verlet algorithm 
    updatePoints(gravity,friction){
        this.points.forEach(p => {

            //vx = p.x - p.oldx
            let vx = p.vx * friction; 
            let vy = p.vy * friction; 
            
            //update old
            p.oldx = p.x; 
            p.oldy = p.y; 

            //update new
            p.x += vx;
            p.y += vy; 

            //add constant force
            p.y += gravity; 

        });
    }


    constrainPoints(bounce){
        this.points.forEach(p=>{
            if(p.x > width){
                let vx = p.vx * bounce; 
                p.x = width; 
                p.oldx = p.x +  vx; 
            }
            
            else if(p.x < 0){
                let vx = p.vx * bounce; 
                p.x = 0; 
                p.oldx = p.x + vx; 
            }
        
            if(p.y > height){
                let vy = p.vy * bounce; 
                p.y = height; 
                p.oldy = p.y + vy; 
            }

            else if(p.y < 0){
                let vy = p.vy * bounce; 
                p.y = 0; 
                p.oldy = p.y + vy; 
            }
        
        })
    }


    renderPoints(){
        
        this.points.forEach(p=>{
            ctx.fillStyle ="black"
            ctx.beginPath();
            //void ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
            ctx.arc(p.x, p.y, p.r*2, 0, 2 * Math.PI, true);
            ctx.fill();      
        })
    }


    //sticks

    updateSticks(){
        this.sticks.forEach(s =>{
            let dx = s.p1.x - s.p0.x; 
            let dy = s.p1.y - s.p0.y;
            let diff = s.length - s.dist; 
            
            let percent = diff/ s.dist / 2; 
            let offsetX = dx * percent; 
            let offsetY = dy * percent; 
            
            s.p0.x -= offsetX; 
            s.p0.y -= offsetY; 
            s.p1.x += offsetX; 
            s.p1.y += offsetY; 
        })
    }

    renderSticks(){
        ctx.beginPath(); 
        this.sticks.forEach(s => {
            ctx.moveTo(s.p0.x,s.p0.y); 
            ctx.lineTo(s.p1.x,s.p1.y); 
        })
        ctx.stroke();
    }


}



class Stick{
    constructor(p0,p1){
        this.p0 = p0; 
        this.p1 = p1; 
        this.length = this.dist;
    }

    get dist(){
        let dx = this.p1.x - this.p0.x; 
        let dy = this.p1.y - this.p0.y; 
        return Math.sqrt(dx*dx + dy*dy);
    }
}

class Point {
    constructor(x, y,oldX,oldY,r=3) {
        if(!x || !y){
            console.error("point x and y values are required!")
            return
        }
        this.x = x; 
        this.y = y;
        this.oldx = oldX;
        this.oldy = oldY;
        this.r = r;
        this.simulated = true; 
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