$(document).ready(function(){
    var startTime = 300
    var gravity=5
    var friction=0
    var maxSpeed = 20
    var mouseDown = false
    var mouseX = 0
    var mouseY = 0
    //create a ball function using d3
    var makeball = function(x,y){
        var circle = d3.select("#mainScreen").append("circle")
            .attr("id","mainCircle") //element id
            .attr("cx","100") //x position
            .attr("cy","100") //y position
            .attr("r","20") //radius
            .attr("vx","0") //x velocity
            .attr("vy","0") //y velocity
            .attr("style","fill:black") //colour
    }
    //create ball and
    makeball(100,100)
    var ball = d3.select('#mainCircle')
    //track mouse location
    $('#mainScreen').mousemove(function(e){
        mouseX = e.pageX
        mouseY = e.pageY
    })
    //track mouse action
    $('#mainScreen').mousedown(function(){
        console.log("down")
        mouseDown = true
    }).mouseup(function(){
        console.log("up")
        mouseDown = false
    })


    //main render
    var timeOut = 0
    var time= 0
    var seconds=0
    mainCircle = d3.select('#mainCircle')
    timeOut = setInterval(function(){
        ball.attr("style","fill:black")
        ball.attr("moveX",parseInt(ball.attr("cx")))
        ball.attr("moveY",parseInt(ball.attr("cx")))
        //floor (temp hacky invisible floor)
        if (parseInt(ball.attr("cy"))>400){
            ball.attr("cy","400")
            ball.attr("vy","0")
        }
        //passives forces (friction and gravity)
        if(!mouseDown){
            if(parseInt(ball.attr("vx"))>0){
                if(parseInt(ball.attr("vx"))<friction){ball.attr("vx",0)}
                ball.attr("vx",parseInt(ball.attr("vx"))-friction)
            }
            if(parseInt(ball.attr("vx"))<0){
                if(parseInt(ball.attr("vx"))>-friction){ball.attr("vx",0)}
                ball.attr("vx",parseInt(ball.attr("vx"))+friction)
            }
            if(parseInt(ball.attr("vy"))>0){
                if(parseInt(ball.attr("vy"))<friction){ball.attr("vy",0)}
                ball.attr("vy",parseInt(ball.attr("vy"))-friction)
            }
            if(parseInt(ball.attr("vy"))<0){
                if(parseInt(ball.attr("vy"))>-friction){ball.attr("vy",0)}
                ball.attr("vy",parseInt(ball.attr("vy"))+friction)
            }            
            if(parseInt(ball.attr("cy"))<400){
                ball.attr("vy",parseInt(ball.attr("vy"))+gravity)
            }
            
        }//accelerate ball to mouse
        if(mouseDown){
            ball.attr("style","fill:blue") //highlight blue while acting
            
            if(ball.attr("cx")<mouseX){ //move right -----------------------------------------------
                if(parseInt(ball.attr("vx"))+1<maxSpeed){ //accelerate if not at max speed
                    ball.attr("vx",parseInt(ball.attr("vx"))+1)
                }
                
                // if(parseInt(ball.attr("moveX"))>mouseX){ //clip to mouse location if would move past it and stop ball
                //     ball.attr("moveX",mouseX)               
                // }
                              
            }
            if(ball.attr("cx")>mouseX){ //move left-------------------------------------------------
                if(parseInt(ball.attr("vx"))-1>-maxSpeed){ //accelerate if not at max speed
                    ball.attr("vx",parseInt(ball.attr("vx"))-1)
                }
                
            }
            if(ball.attr("cy")>mouseY){ //move up-------------------------------------------------
                if(parseInt(ball.attr("vy"))-1>-maxSpeed){ //accelerate if not at max speed
                    ball.attr("vy",parseInt(ball.attr("vy"))-1)
                }
                
            }
            if(ball.attr("cy")<mouseY){ //move down-----------------------------------------------
                if(parseInt(ball.attr("vy"))+1<maxSpeed){ //accelerate if not at max speed
                    ball.attr("vy",parseInt(ball.attr("vy"))+1)
                }
                             
            }                 
        }
        //apply movements
        
        ball.attr("moveX", parseInt(ball.attr("cx"))+parseInt(ball.attr("vx"))) //set moving distance
        ball.attr("cx",parseInt(ball.attr("moveX")))
        ball.attr("moveY", parseInt(ball.attr("cy"))+parseInt(ball.attr("vy"))) //set moving distance
        ball.attr("cy",parseInt(ball.attr("moveY")))
        time++
        
        if (time==60){
            time=0
            seconds++
        }
        var cx = ball.attr("cx")
        var cy = ball.attr("cy")
        $('#coord').text("mouse -> x:"+mouseX+" y:"+ mouseY+
                         "|| ball -> x:"+cx+" y:"+cy)
        $('#time').text("|| frames: "+time+" || seconds: "+seconds)
    }, 16.6) //number is rate lower => more refresh => faster response      
})