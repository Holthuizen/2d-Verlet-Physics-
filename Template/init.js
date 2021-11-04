//globals
var playing = true;
var debug = false; 
var ctx, width, height;
let mouseX, mouseY;

window.onload = () =>{
    let canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d'); 
    //set screen size
    width = canvas.width = window.innerWidth - (window.innerWidth /6); 
    height = canvas.height = window.innerHeight - (window.innerHeight/3);


    document.body.addEventListener("mousemove", function(event) {
        ctx.clearRect(0, 0, width, height);
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
    


    start()
    update();
    loop();

    function loop(){
        if(playing){
            update();
        }
        requestAnimationFrame(loop);
    }

    
    console.log("setup completed")
};