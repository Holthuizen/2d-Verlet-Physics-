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
        playing? console.log("debug enabled") : console.log("debug disabled"); 
    }

    function FPS(last,current){
        let fps = 1000/(current-last);
        return fps;
    }


    //not great but good enough
    const uid = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }