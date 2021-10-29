   //this file depends on init.js and utils.js 
   
   
   function start(){
        ctx.fillStyle = "blue";    
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    function update(){
        ctx.clearRect(0,0,width,height);
        ctx.fillRect(0, 0, width, height);
    }
    

