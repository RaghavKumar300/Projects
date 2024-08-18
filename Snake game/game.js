let cvs= document.getElementById("canvas");
let ctx= cvs.getContext("2d");

let box=32;
let move;
let score=0;
let sound=true;

// Images

let ground = new Image();
ground.src= "images/ground.jpg";

let food = new Image();
food.src="images/food.png";

let gameover = new Image();
gameover.src="images/gameover.png";

// Sound Effects

let dead= new Audio();
dead.src="audio/dead.mp3";

let up= new Audio();
up.src="audio/up.mp3";

let down= new Audio();
down.src="audio/down.mp3";

let right= new Audio();
right.src="audio/right.mp3";

let left= new Audio();
left.src="audio/left.mp3";

let eat= new Audio();
eat.src="audio/eat.mp3";

 //snake array
let snake= [];
snake[0]=
{
 x: 4*32,
 y: 7*32
}

//food object
let foodi=
{
x: Math.floor(Math.random() *17 +1) * box,
y: Math.floor(Math.random() *15 +3) * box,
}

// event litener
document.addEventListener("keydown",function(event)
{
 if(event.keyCode==37 && move!= "right")
 {
     if(sound)
     {
        left.play();
     }
  move="left";
 }
 else if(event.keyCode==38  && move!= "down")
 {
     if(sound)
     {
        up.play();
     }
    move="top";    
 }
 else if(event.keyCode==39  && move!= "left")
 {
     if(sound)
     {
        right.play();
     }
    move="right";    
 }
 else if(event.keyCode==40  && move!= "top")
 {
     if(sound)
     {
        down.play();
     }    
    move="down";    
 }
 console.log(move);
})
    function draw()
    {
     for(let i=0;i<snake.length;i++)
     {
        ctx.fillStyle= (i==0) ? "black":"orange";
        if(i%2==0)
        {
            ctx.fillStyle="black";
        }
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="#000000";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
     }
    // snake old position

    let snakeX= snake[0].x;
    let snakey= snake[0].y;

    if(move=="left")
    {
      snakeX-=box;
    }
    else if(move=="top")
    {
       snakey-=box
    }
    else if(move=="right")
    {
        snakeX+=box;
    }
    else if(move=="down")
    {
        snakey+=box;
    }
     // snake new head
    let newHead =
    {
        x:snakeX,
        y:snakey,
    }
    if(snakeX==foodi.x && snakey==foodi.y)
    {
        eat.play();
        score++;
        foodi.x=Math.floor(Math.random() *17 +1) * box;
        foodi.y=Math.floor(Math.random() *15 +3) * box;
    }
    else
    {
     snake.pop();
    }

    function collision(newHead,arry)
    {
        for(let i=0;i<arry.length;i++)
        {
            if(newHead.x==arry[i].x && newHead.y == arry[i].y)
            {
                return true;
            }
        }
        return false;
    }
    function dragon()
    {
     let dragon1= document.getElementById("dragon1");
     let dragon2= document.getElementById("dragon2");
     let dragon3= document.getElementById("dragon3");
    dragon1.style.display="block";
    dragon2.style.display="block";
    dragon3.style.display="block";
    }
    //Gameover logic
    if(snakeX<box || snakeX> box*17 || snakey<box*3 || snakey> box*17 || collision(newHead,snake))
    {
        dragon();
        dead.play();
     clearInterval(game);
     ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-100,200,200);
     sound=false;
    }
      snake.unshift(newHead);
      ctx.fillStyle="#ffffff";
      ctx.font="40px impact"
      ctx.fillText(score,box*2.2,box*1.6);


     ctx.drawImage(food,0,0,box,box,foodi.x,foodi.y,box,box);

    }

    function loop()
    {
    ctx.drawImage(ground,0,0,608,608,0,0,608,608);
    draw();
    }
    let game= setInterval(loop,100);   