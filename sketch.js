var trex,trex_animation,trex_collided, trex_jump;
var edges;
var ground,ground_image;
var invisibleGround;
var cloud,cloud_image;
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6;
var score=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOver,gameOver_image;
var restart, restart_image;
var jumps,dies,checkPoints;

function preload(){
 trex_animation=loadAnimation("trex1.png","trex3.png","trex4.png"); 
  trex_jump=loadAnimation("trex1.png");
 ground_image=loadImage("ground2.png") ;
  
 cloud_image=loadImage("cloud.png") ;
 ob1=loadImage("obstacle1.png") ;
 ob2=loadImage("obstacle2.png") ; 
 ob3=loadImage("obstacle3.png") ; 
 ob4=loadImage("obstacle4.png") ; 
 ob5=loadImage("obstacle5.png") ; 
 ob6=loadImage("obstacle6.png") ;

  
 jumps=loadSound("jump.mp3");
 dies=loadSound("die.mp3"); 
 checkPoints=loadSound("checkPoint.mp3");
  
  
 trex_collided=loadAnimation("trex_collided.png") ;
 gameOver_image=loadImage("gameOver.png") ;
  restart_image=loadImage("restart.png");
  
}


function setup(){
 createCanvas(600,200) ; 
  
  //creating a trex
  trex=createSprite (40,160,10,10);  
  trex.addAnimation("trex",trex_animation); 
  trex.addAnimation("trex_c",trex_collided);
  trex.addAnimation("trex_J",trex_jump);
  trex.scale=0.5 ;
 // trex.debug=true;
  //trex.setCollider("rectangle",0,0,400,trex.height);
  
  //creating the ground
  ground=createSprite(300,180,600,10);
  ground.addImage("ground",ground_image);
  
  //creating invisible ground
  invisibleGround= createSprite(300,190,600,5);
  invisibleGround.visible=false;
  
  //gameover and restart
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;
  gameOver.visible=false;
  restart=createSprite(300,140);
  restart.addImage(restart_image);
  restart.scale=0.5;
  restart.visible=false;
  
  
  
  edges=createEdgeSprites();
  
  cloudsGroup= new Group();
  obstaclesGroup = new Group();
}


function draw(){
  console.log(getFrameRate());
  //frameRate(50);
 background("black") ;
 // console.log(trex.y);
  
  if(trex.y<163){
     trex.changeAnimation("trex_J"); 
  }
  else {
    trex.changeAnimation("trex");
    
  }
  
  //to display the score
  text("Score: "+score,500,50);
  
  if(gameState === PLAY){
    //SCORE
     score=score+Math.round(getFrameRate()/60);
    
     if(score % 500=== 0 && score>0){
      checkPoints.play() ;
     }
    
    
    
    
     if((keyDown("space")||keyDown("up"))&(trex.y>=164)) {
   trex.velocityY=-10; 
   jumps.play();
 }
    //to provide gravity for trex
  trex.velocityY=trex.velocityY+0.5 ;
  
     ground.velocityX=-(2+score/100);
  
  //resets the ground
  if(ground.x<0){
    ground.x=ground.width/2;
  }
   
  // console.info("Hello") ;
  // console.warn("you can die stop it !")
  // console.error("you are dead! time wastage ! stop  trying anymore!")
  flyClouds();
  runCactus(); 
    
    
   if (trex.isTouching(obstaclesGroup)) {
     dies.play() ; 
     gameState=END ;
    // trex.velocityY=-10;
    // jumps.play();
   } 
    
  }
  else if(gameState===END){
  ground.velocityX=0;
    trex.velocityY=0; 
  cloudsGroup.setVelocityXEach(0) ; 
   obstaclesGroup.setVelocityXEach(0) ;
    obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1) ;
    trex.changeAnimation("trex_c");
    gameOver.visible=true;
    restart.visible=true;
  
    if(mousePressedOver(restart)){
      reset();    
  }
  }

 
  //to stop the trex from falling
  trex.collide(invisibleGround) ;
 
  drawSprites() ;
 // console.timeEnd();
}

function reset(){
gameState=PLAY;
cloudsGroup.destroyEach();
obstaclesGroup.destroyEach();
score=0;
restart.visible=false;
gameOver.visible=false;
}

function flyClouds(){
  var r=Math.round(random(60,80))
 if(frameCount % r==0) {
 cloud=createSprite(600,100,10,10);  
 cloud.addImage("cloud",cloud_image) ; 
 cloud.velocityX=-3;
 cloud.scale=0.7;  
 cloud.y=Math.round(random(40,100))  ;
 
   trex.depth=cloud.depth;  
  trex.depth=trex.depth+1;
 console.log(cloud.depth) ;
  cloud.lifetime=210;
   cloudsGroup.add(cloud);
 }
  
}

function runCactus(){
 // var r=Math.round(random(60,65))
 if(frameCount % 60==0) {
   obstacle=createSprite(600,165,10,10);
   obstacle.velocityX=-(6+score/100);
   var ran=Math.round(random(1,6));
   switch(ran){
     case 1 :obstacle.addImage(ob1); 
       break;
     case 2 :obstacle.addImage(ob2); 
       break;
     case 3 :obstacle.addImage(ob3); 
       break;
     case 4 :obstacle.addImage(ob4);
       break;
     case 5 :obstacle.addImage(ob5); 
       break;
     case 6 :obstacle.addImage(ob6);  
       break;
     default:break  ;
       
   }
   obstacle.scale=0.5;
   obstacle.lifetime=110;
   trex.depth=obstacle.depth+1;
   obstaclesGroup.add(obstacle);
   
 }
  
}
