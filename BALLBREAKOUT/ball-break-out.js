const WIDTH=500,
      HEIGHT=500,
 canvas=document.getElementById('canvas'),
 context=canvas.getContext('2d');

canvas.width=WIDTH;
canvas.height=HEIGHT;
canvas.style.background="#123456";

//Variables
var blockArr=[]
    blockIndex=0,
    numBlockCol=10,
    numBlockRow=4,
    colWidth=WIDTH/numBlockCol,
    padding=colWidth/4
    isGameOver=false
    isLeft=false,
    isRight=false;

var blockProp={
    w:colWidth,
    h:padding
}

var playerProp={
      x:(WIDTH/2-colWidth/2),
      y:(HEIGHT-1.5*padding),
      w:colWidth,
      h:padding
}

var ballProp={
      x:WIDTH/2,
      y:HEIGHT/2,
      radius:padding/3
}

window.addEventListener('keydown',function(event){
      if(event.keyCode==37){
      isLeft=true;
      isRight=false;
      }else if(event.keyCode==39){
            isLeft=false;
            isRight=true;
      }
});

window.addEventListener('keyup',function(){
      isLeft=false;
      isRight=false;
});

InitializeBlocks();
var player=new Player(playerProp.x, playerProp.y, playerProp.w, playerProp.h);
var ball=new Ball(ballProp.x, ballProp.y, ballProp.radius);
//Initialize the Blocks
function InitializeBlocks(){
      for(let i=1;i<numBlockCol;i++){
            for(let j=0;j<numBlockRow;j++){
               blockArr[blockIndex]=new Block(padding/2+(i)*(colWidth)-colWidth/2,colWidth+j*(colWidth-2*padding),blockProp.w-padding,blockProp.h,true);
               blockIndex++;
            }
      }
}

//Block function
function Block(x, y, width, height, isShow){
this.x=x;
this.y=y;
this.width=width;
this.height=height;
this.isShow=isShow;
}

//Display Blocks
function DisplayBlocks(){
      blockArr.forEach((b)=>{
      if(isBlockHitByball(ball, b) && b.isShow){
            b.isShow=false;
            ball.yDirSpeed=-ball.yDirSpeed;
      }
      if(b.isShow){
            context.beginPath();
            context.fillStyle='#E15517'
            context.fillRect(b.x, b.y, b.width, b.height);
            context.closePath();
      }
      });
}

//Player function
function Player(x, y, width, height){
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.lifeCount=3;//life count=3
      this.xDirSpeed=0;
}

Player.prototype.drawPlayer=function(){
      context.beginPath();
      context.fillStyle='#9EE117';
      context.fillRect(this.x, this.y,  this.width,  this.height);
      context.closePath();
}

Player.prototype.updatePlayer=function(x){
      this.x+=x;
      this.xDirSpeed=x;
      if(this.x<0){
            this.x=0;
            this.xDirSpeed=0;
      }else if(this.x+this.width>WIDTH){
            this.x=WIDTH-this.width;
            this.xDirSpeed=0;
      }
};

//Ball function
function Ball(x, y, radius){
      this.x=x;
      this.y=y;
      this.radius=radius;
      this.xDirSpeed=Math.random()<0.5?2:-2;
      this.yDirSpeed=Math.random()<0.5?2:-3;
}

Ball.prototype.drawBall=function(){
      context.beginPath();
      context.fillStyle='#E1E017';
      context.arc(this.x, this.y, this.radius,0,2*Math.PI);
      context.fill();
      context.closePath();
}

Ball.prototype.updateBall=function(playerObj){
      this.x+=this.xDirSpeed;
      this.y+=this.yDirSpeed;

     
      //If ball hits the left,right and top of the canvas
      if(this.x-this.radius<0){
            this.xDirSpeed=-this.xDirSpeed;;
      }else if(this.x+this.radius>WIDTH){
            this.xDirSpeed=-this.xDirSpeed;
      }else if(this.y-this.radius<0){
            this.yDirSpeed=-this.yDirSpeed;
      }

//If ball hits the payer
if (this.x+this.radius>playerObj.x && this.x-this.radius<(playerObj.x+playerObj.width) && this.y+this.radius>(HEIGHT-1.5*padding)){
            this.yDirSpeed=-this.yDirSpeed;
            this.y+=this.yDirSpeed;
            this.xDirSpeed+=playerObj.xDirSpeed/4;
      }

      //If ball misssed the player
      if(((this.x+this.radius<playerObj.x)||(this.x-this.radius)>(player.x+player.width))&& this.y+this.radius>HEIGHT){
            playerObj.lifeCount--;
            if(player.lifeCount<=0){
                  isGameOver=true;
                  console.log('Game Over');
            }else{
                  this.x=WIDTH/2;
                  this.y=HEIGHT/2;
                  this.xDirSpeed=Math.random()<0.5?2:-2;
                  this.yDirSpeed=Math.random()<0.5?2:-3;
            }
      }
}

function isBlockHitByball(ball, block){
      if(ball.x+ball.radius>block.x && ball.x-ball.radius<block.x+block.width && ball.y+ball.radius<block.y+block.height && ball.y-ball.radius>block.y){
            return true;
      }else{
            return false;
      }
}

function drawGame(){
      DisplayBlocks();
      player.drawPlayer();
      ball.drawBall();
}

function updateGame() {
      ball.updateBall(player);
      if(isLeft){
            player.updatePlayer(-4);
      }else if(isRight){
            player.updatePlayer(4);
      }
}

function animateGame(){
      context.clearRect(0,0,WIDTH,HEIGHT);
      drawGame();
      if(!isGameOver){
            updateGame();
      }
      
      requestAnimationFrame(animateGame);
}


animateGame();