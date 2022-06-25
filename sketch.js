var bg, bgImg;
var bird, birdFlying, birdCollided;
var aeroplane, aeroplaneImg;
var restart, restartImg;
var gameOver, gameOverImg;
var gameState="play"
var aeroplaneGrp;
var score=0;

function preload(){
  bgImg = loadImage("bg.png");
  birdFlying = loadAnimation("bird1.png","bird2.png","bird3.png","bird4.png","bird5.png");
  birdCollided = loadAnimation("birdcollided.png");
  aeroplaneImg = loadImage("aeroplane.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameover.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(width/2, height/2, width, height);
  bg.addImage(bgImg);
  bg.scale = 1.5;

  bird = createSprite(width/2, height/2);
  bird.addAnimation("birdFlying", birdFlying);
  bird.addAnimation("birdCollided", birdCollided);
  bird.changeAnimation("birdFlying");

  bird.scale = 0.5;

  invisibleGround = createSprite(width/2,height,windowWidth,10);
  invisibleGround.visible = false;
  invisibleGround2 = createSprite(width/2,0,windowWidth,10);
  invisibleGround2.visible = false;

  gameOver = createSprite(width/2, height/2);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  gameOver.scale=0.7;

  restart = createSprite(width-50, 50);
  restart.addImage(restartImg);
  restart.scale=0.4;
  restart.visible=false;

  aeroplaneGrp= new Group();
}

function draw(){
  background(bgImg);
  if( gameState=="play"){
    bg.velocityX=-4;
    if ( bg.x<0){
      bg.x=width/2;
    }
  
    if (keyDown("SPACE")){
      bird.velocityY=-10;
    }
    bird.velocityY=bird.velocityY+0.5;

    //score=score+Math.round(getFrameRate()/60);
    for(var a in aeroplaneGrp){
      if(a.x<bird.x){
        score=score+5;
      }
    }
  if (bird.isTouching(invisibleGround)||bird.isTouching(invisibleGround2)||bird.isTouching(aeroplaneGrp)){
    gameState="end"
  }
    spawnAeroplane();
  }
   else if (gameState=="end"){
    bird.changeAnimation("birdCollided");
    bird.velocityY=0;
    bg.velocityX=0;
    aeroplaneGrp.setVelocityXEach(0);
    gameOver.visible=true;
    restart.visible=true;

    if (mousePressedOver(restart)){
    reset();
      
    }
   }


  drawSprites();
  textSize(50);
  fill("black");
  text("Score:"+score, 50, 80);
}

function spawnAeroplane(){
  if(frameCount%150 == 0){
    var aeroplane = createSprite(windowWidth+50, 100);
    aeroplane.addImage(aeroplaneImg);
    aeroplane.y=Math.round(random(100,height))
    aeroplane.velocityX=-5;
    aeroplane.scale=0.7;
    aeroplaneGrp.add(aeroplane);
  }
  
}

function reset(){
  gameState="play";
  gameOver.visible=false;
  restart.visible=false;
  aeroplaneGrp.destroyEach();
  bird.changeAnimation("birdFlying");
  bird.y=height/2;
}
