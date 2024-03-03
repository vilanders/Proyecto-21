var ground, fakeGround;
var walker;
var pua;
var score = 0, hscore = 0;
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
var what;

function preload(){
groundImage = loadImage("ground.png");
walkin = loadAnimation("walkin2.png","walkin3.png","walkin5.png","walkin7.png","walkin14.png","walkin15.png");
shine = loadAnimation("pua.png","pua2.png","pua3.png","pua4.png","pua5.png","pua6.png","pua7.png","pua8.png","pua9.png","pua10.png","pua11.png","pua12.png","pua13.png","pua14.png");
uded = loadAnimation("ded.png");
gameOver1 = loadAnimation("GameOver.png","GameOver2.png","GameOver3.png","GameOver4.png","GameOver5.png");
restart1 = loadAnimation("restart.png","restart2.png","restart3.png","restart4.png","restart5.png");
jump = loadSound("jump.mp3");
ded = loadSound("ded.mp3");
meow = loadSound("meow.mp3");
checkpoint = loadSound("checkpoint.mp3");
what = loadSound("what.mp3");
}

function setup() {
  
 
 createCanvas(windowWidth,windowHeight);

 ground = createSprite(width/2,height,width,2);
 ground.addImage("ground",groundImage);
 
 walker = createSprite(50,height-70,20,50);
 walker.addAnimation("walkin",walkin);

 //walker.debug=true;

 walker.setCollider("rectangle", -20, 5, 30, 120);

 walker.scale = 0.5;
 walker.x = 150;


 walker.addAnimation("u are ded",uded);

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
 

 meow.play();
 meow.loop();
 meow.setVolume(0.5);
  
}

function draw() {
 background("white");
 
 text("Score = " + score + "\nHigh score = " + hscore,width-150,50);
 fill("gray");

 text("Press [space] to JUMP \nKeep pressed [space] to FART-JUMP while in air",50,50);
 fill("black");

 if (gameState === play) {
  gameOver.visible = false;
  restart.visible = false;
  ground.velocityX = -25;

  score++;

  if (ground.x < 40) {
   ground.x = ground.width/2;   
  }

  if (touches.length > 0 || keyDown("space") && walker.y >= height-164) {
   walker.velocityY = -19;
   touches=[];   
  }

  if (walker.isTouching(ground) === false && walker.y >= height-174)
  {
    jump.play();
    jump.setVolume(0.5);
  }

  if (score>0 && score%100===0) {
    checkpoint.play(); 
    checkpoint.setVolume(0.5); 
    ground.velocityX = ground.velocityX - score/100;
    grupoPua.velocityX = grupoPua.velocityX - score/100;   
  }

  if (score > 0 && score % 1000 === 0) {
    what.play();
    ground.velocityX = ground.velocityX * 2;
    grupoPua.velocityX = grupoPua.velocityX * 2;
  }

  walker.velocityY = walker.velocityY+1.4;

  puas();

  if (grupoPua.isTouching(walker)) {
   gameState = end; 
   ded.play();
   ded.setVolume(0.5)
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

  if (score > hscore) {
    hscore = score;
  }

  if (mousePressedOver(restart) || keyDown("space")) {
   reset();

  }
 }
  
 
 walker.collide(fakeGround);

 drawSprites();
}

function puas() {
 if (frameCount%Math.round(random(60,101))===0) {
  pua = createSprite(width-50,height-95,20,30);
  pua.addAnimation("shine",shine);
  pua.scale = 0.4;   
  pua.velocityX = -25;
  pua.lifetime = 100;

 //pua.debug=true;

 pua.setCollider("rectangle", 0, 0, 10, pua.height);

  grupoPua.add(pua);
 }
 
}

function reset() {
 score=0;
 grupoPua.destroyEach();
 walker.changeAnimation("walkin",walkin);
 gameState=play;    
}