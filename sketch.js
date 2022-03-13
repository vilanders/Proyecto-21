var ground, fakeGround;
var walker;
var pua;
var score = 0;
var play = 1;
var end = 0;
var gameState = play;
var gameOver;
var restart;
var touches;
var jump;
var ded;
var meow;
var checkpoint;

function preload(){
groundImage = loadImage("ground.png");
walkin = loadAnimation("walkin.png","walkin2.png","walkin3.png","walkin4.png","walkin5.png","walkin6.png","walkin7.png","walkin8.png","walkin9.png","walkin10.png","walkin11.png","walkin12.png","walkin13.png","walkin14.png","walkin15.png");
shine = loadAnimation("pua.png","pua2.png","pua3.png","pua4.png","pua5.png","pua6.png","pua7.png","pua8.png","pua9.png","pua10.png","pua11.png","pua12.png","pua13.png","pua14.png");
uded = loadAnimation("ded.png");
gameOver1 = loadAnimation("GameOver.png","GameOver2.png","GameOver3.png","GameOver4.png","GameOver5.png");
restart1 = loadAnimation("restart.png","restart2.png","restart3.png","restart4.png","restart5.png");
jump = loadSound("jump.mp3");
ded = loadSound("ded.mp3");
meow = loadSound("meow.mp3");
checkpoint = loadSound("checkpoint.mp3");
}

function setup() {
meow.play();
meow.loop();
 createCanvas(windowWidth,windowHeight);

 walker = createSprite(50,height-70,20,50);
 walker.addAnimation("walkin",walkin);
 walker.scale = 0.5;
 walker.x = 150;

 walker.addAnimation("u are ded",uded);

 ground = createSprite(width/2,height,width,2);
 ground.addImage("ground",groundImage);
 

 fakeGround = createSprite(width/2,height-10,width,125);
 fakeGround.visible = false;
 var rand = Math.round(1,100);

 gameOver = createSprite(width/2,height/2-150);
 gameOver.addAnimation("gameOver",gameOver1);

 restart = createSprite(width/2,height/2+50);
 restart.addAnimation("restart",restart1);
 restart.scale = 0.5;

 console.log("velocidad = " + ground.velocityX);


 grupoPua = new Group();
}

function draw() {
 background("white");

 text("Score = " + score,width-150,50);
 fill("gray");

 text("Press [space] to JUMP",50,50);
 fill("gray");

 if (gameState === play) {
  gameOver.visible = false;
  restart.visible = false;
  ground.velocityX = -25;

  score = score + Math.round(frameCount/60);

  if (ground.x < 0) {
   ground.x = ground.width/2;   
  }

  if (touches.length > 0 || keyDown("space") && walker.y >= height-164) {
   walker.velocityY = -17;
   jump.play();
   touches=[];   
  }

  if (score>0 && score%100===0) {
    checkpoint.play();  
    ground.velocityX = -(25 + score/100);
    grupoPua.velocityX = -(25 + score/100);   
  }

  walker.velocityY = walker.velocityY+0.8;

  puas();

  if (grupoPua.isTouching(walker)) {
   gameState = end; 
   ded.play();
  }
 }

 else if (gameState === end) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX=0;
  walker.changeAnimation("u are ded",uded);
  grupoPua.setVelocityXEach(0);
  grupoPua.setLifetimeEach(-1);
  walker.velocityY = 0;

  if (mousePressedOver(restart)) {
   reset();

  }
 }

 walker.collide(fakeGround);

 drawSprites();
}

function puas() {
 if (frameCount%Math.round(random(60,100))===0) {
  pua = createSprite(width-50,height-95,20,30);
  pua.addAnimation("shine",shine);
  pua.scale = 0.4;   
  pua.velocityX = -25;
  pua.lifetime = 100;

 //pua.debug=true;

 pua.setCollider("rectangle", 0, 0, 40, pua.height);

  grupoPua.add(pua);
 }
 
}

function reset() {
 score=0;
 grupoPua.destroyEach();
 walker.changeAnimation("walkin",walkin);
 gameState=play;    
}