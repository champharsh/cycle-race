var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

 var distance = 0;

function preload(){
pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  obstacle2Img = loadImage("Barrel2.png");
  obstacle3Img = loadImage("Barrel1.png");
  obstacle4Img = loadImage("Walk (9).png");
  obstacle5Img = loadImage("Walk (1).png");
  gameover = loadImage("gameOver.png");
  resetImg = loadImage("reset.png");
  
  
  
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
  
// Moving background
path=createSprite(300,height/2);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(width/2,height-20,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.addAnimation("fallen",mainRacerImg2);
mainCyclist.scale = 0.07;
  
  
  
obstaclesGroup = createGroup(); 
  
gameoverImg = createSprite(250,150,10,10);
gameoverImg.addImage(gameover);
gameoverImg.scale = 0.7;
  
reset = createSprite(mainCyclist.x,200,10,10);
reset.addImage(resetImg);
reset.scale = 0.2;
 
}

function draw() {
  background(0);
  
  gameoverImg.visible = false;
  reset.visible = false;
  
  if(gameState===PLAY){
    
path.velocityX = -(4 + 3* distance/100)
    distance = distance + Math.round(getFrameRate()/60);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  } 
    obstacles();
  
  if(obstaclesGroup.isTouching(mainCyclist)){
    gameState = END;
    
  }  
  }
  else if (gameState === END) {
    gameoverImg.visible = true;
    reset.visible = true;
    
    path.velocityX = 0;
 
    mainCyclist.changeAnimation("fallen",mainRacerImg2);
    
    mainCyclist.velocityY = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    
     obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityYEach(0);
    
    if(mousePressedOver(reset)){
      resets();
    }
    
  }
 drawSprites();
  
  textSize(20);
  fill("white");
  text("Distance: "+ distance,350,30);
}
function resets(){
  gameState = PLAY;
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
  obstaclesGroup.destroyEach();
  distance = 0;
}
function obstacles(){
  
if(frameCount%100===0)  {

var obstacle = createSprite(1000,100,10,10);  
obstacle.velocityX= -6; 

var rand = Math.round(random(1,4));  
switch(rand) {
    
  case 1 : obstacle.addImage(obstacle2Img);
           break;
           
  case 2 : obstacle.addImage(obstacle3Img);
           break;
           
  case 3 : obstacle.addImage(obstacle5Img);
           obstacle.scale = 0.01;
           obstacle.velocityY = 0.5;
           break;
           
   case 4 : obstacle.addImage(obstacle4Img);
            obstacle.scale = 0.01;
            obstacle.velocityY = 0.5;
            break; 
           
  default : break;
 
}
  obstaclesGroup.add(obstacle);
  obstacle.scale = 0.3;
  obstacle.y = Math.round(random(50,340));
  obstacle.lifetime = 600;
}


}  

  

  
  
 
  
  
