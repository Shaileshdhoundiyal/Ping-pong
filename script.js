let box = document.getElementById("gamebox");
let paddle1 = document.getElementById("paddle1");
let paddlle2 = document.getElementById("paddle2");
let ball = document.getElementById("ball");
let player1Score = document.getElementById("player1score");
let player2Score = document.getElementById("player2score");
let start = document.getElementById("start");
let zPress = false;
let xPress = false;
let downPress = false;
let upPress = false;
let reqId;
let flag = true;
let i = 1;

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

function keyDownHandler(e){
    if(e.keyCode == 13){
        start.innerText="";
        gameLoop();
    }
    if(e.key == 'z'){
        zPress=true;
        //console.log("z is pressed");
    }
    else if(e.key == 'x'){
        xPress = true;
        //console.log("x is pressed");
        
    }
    else if(e.keyCode == 38){
        upPress = true;
        //console.log("up is pressed");
    }
    else if(e.keyCode == 40){
        downPress = true;
        //console.log("down is pressed");
    }
}



function keyUpHandler(e){
    if(e.key == 'z'){
        zPress=false;
        //console.log("z is release");
    }
    else if(e.key == 'x'){
        xPress = false;
        //console.log("x is released");
        
    }
    else if(e.keyCode == 38){
        upPress = false;
        //console.log("up is released");
    }
    else if(e.keyCode == 40){
        downPress = false;
        //console.log("down is released");
    }
}

let Vx = 5;
let Vy = 3;
function reset(){
    ball.style.top = "50%";
    ball.style.left = "50%";
    setTimeout(function again(){
        let x = Math.floor(Math.random()*2);
        let y = Math.floor(Math.random()*2);
        if(x==1){
            Vx = -5;
        }
        else{
            Vx = 5;
        }
        if(y==1){
            Vy = -3;
        }
        else{
            Vy = 3;
        }
        flag = true;
        i=1;
        gameLoop();
    },3000);
}
function gameLoop(){
    if(ball.offsetLeft <= paddle1.offsetLeft + paddle1.offsetWidth && ball.offsetTop + ball.offsetHeight >= paddle1.offsetTop - 50 && ball.offsetTop  <= paddle1.offsetTop + paddle1.offsetHeight - 20){
        Vx = - Vx;
    }
    else if(ball.offsetLeft + ball.offsetWidth >= paddlle2.offsetLeft && ball.offsetTop + ball.offsetHeight >= paddlle2.offsetTop - 50 && ball.offsetTop < paddlle2.offsetTop + paddlle2.offsetHeight -20){
        Vx = -Vx;
    }
    else if(ball.offsetLeft <= 0){
        player2Score.innerText++;
        window.cancelAnimationFrame(reqId);
        flag = false;
        reset();
    }
    else if(ball.offsetLeft >= box.offsetWidth - ball.offsetWidth){
        player1Score.innerText++;
        window.cancelAnimationFrame(reqId);
        flag = false;
        reset();
    }
    else if(ball.offsetTop <= 0){
        Vy = - Vy
    }
    else if(ball.offsetTop > box.offsetHeight - ball.offsetHeight){
        Vy = -Vy;
    }

    ball.style.left = ball.offsetLeft + Vx*i + "px";
    ball.style.top = ball.offsetTop + Vy * i + "px";
    
    if(zPress && paddle1.offsetTop > 55 ){
        paddle1.style.top = paddle1.offsetTop - 5 + "px";

    }
    if(xPress && paddle1.offsetTop < box.offsetHeight - paddle1.offsetHeight + 40){
        paddle1.style.top = paddle1.offsetTop + 5 + "px";

    }
    if(upPress && paddle2.offsetTop > 55){
        paddle2.style.top = paddle2.offsetTop - 5 + "px";

    }
    if(downPress && paddle2.offsetTop < box.offsetHeight - paddle2.offsetHeight + 40){
        paddle2.style.top = paddle2.offsetTop + 5 + "px";

    }
    
    if(flag){
        reqId=requestAnimationFrame(gameLoop);
    }
}
setTimeout(function (){
    i++;

},5000);

