var car1,car1Img;
var opp1,opp1Img;
var opp2,opp2Img;
var coin,coinImg;
var petrol,petrolImg;
var road,roadImg;
var reset,resetImg;
var lose,loseImg;
var finish,finishImg;
var start,startImg;
var win,winImg;

var accident;
var horn;
var starting;
var carsound;
var coinS;
var clap;
var beep;
var opp1G;
var opp2G;
var coinG;
var petrolG;
var stop;
var alert;

var START = 0;
var PLAY = 1;
var END = 2;
var WIN = 3;
var WINN = 4;
var PAUSE = 5;

var score;
var coins;
var petrolS;

var gameState = START;

function preload(){
  car1Img=loadImage("car1-removebg-preview.png");
  opp1Img=loadImage("car2-removebg-preview (1).png");
  opp2Img=loadImage("car4-removebg-preview.png");
  coinImg=loadImage("coin-removebg-preview.png");
  petrolImg=loadImage("fuel-removebg-preview.png  ");
  roadImg=loadImage("road.jpg");
  resetImg=loadImage("restart1.png");
  loseImg=loadImage("images-removebg-preview (3).png");
  startImg=loadImage("start.png");
  finishImg=loadImage("finish1.png");
  winImg=loadImage("win1.png");
  
  accident=loadSound("WoodCrashesDistant FS022705.mp3");
  horn=loadSound("Cutlass80HornMediu PE867510.mp3");
  starting=loadSound("salamisound-3482788-start-mb-100-mercedes-benz.mp3");
  carsound=loadSound("VEHCar_Motor car 1 (ID 0290)_BSB.wav");
  coinS=loadSound("Catching-Coins-In-Hand-B-www.fesliyanstudios.com.mp3");
  clap=loadSound("mixkit-girls-audience-applause-510.wav");
  beep=loadSound("beep-07.mp3");
  stop=loadSound("GunSnglShotFireEx PE1107203.mp3");
  alert=loadSound("censor-beep-01.mp3");
}  

function setup(){
  createCanvas(400,500);
  
  
  road = createSprite(200,250,20,20);
  road.addAnimation("road",roadImg);
  road.scale=1.5;
  
  car1 = createSprite(200,430,20,20);
  car1.addAnimation("car1",car1Img);
  car1.scale=0.2;
  car1.setCollider("rectangle",0,0,200,400);

  lose = createSprite(200,240,20,20);
  lose.addAnimation("lose",loseImg);
  lose.scale = 1.3;
  
  reset = createSprite(200,300,20,20);
  reset.addAnimation("reset",resetImg);
  reset.scale = 0.2;
  reset.setCollider("rectangle",0,0,520,170);
  //reset.debug = true;
  
  start = createSprite(200,220,30,30);
  start.addAnimation("start",startImg);
  start.scale = 0.3;
  start.setCollider("rectangle",0,0,570,140);
  //start.debug = true;
  
  finish = createSprite(200,30,20,20);
  finish.addAnimation("finish",finishImg);
  finish.scale = 1.5;
  
  win = createSprite(200,200,30,30);
  win.addAnimation("win",winImg);
  win.scale = 1;
  
  score = 0;
  coins = 0;
  
  opp1G = new Group();
  opp2G = new Group();
  coinG = new Group();
  petrolG = new Group();
}

function draw(){
  background(200);
  
  if(gameState===START){
    
    if(keyDown("space")){
      horn.play();
    }
    
    score = 0;
    coins = 0;
    petrolS = 10;
    
    car1.Y = 400;
    
    road.velocityY=0;
    

    start.visible = true;
    car1.visible = true;
    
    win.visible = false;
    finish.visible = false;
    reset.visible = false;
    lose.visible = false;
    
    if(mousePressedOver(start)){
      starting.play();
      gameState = PLAY;
   }
    
  }
  
  if(gameState===PLAY){
    
    
    
    car1.visible = true;
    
    win.visible = false;
    finish.visible = false;
    lose.visible = false;
    reset.visible = false;
    start.visible = false;
  
    if(keyDown("space")){
      horn.play();
    }
    
    opp1c();
    opp2c();
    coinc();
    petC();
    
    car1.x=World.mouseX;
    road.velocityY=4+score/6;
  
    if(frameCount%50==0){
      score = score+2;
    }
    
    if(road.y>420){
    road.y=width/2;
  }
     
    
    if(petrolS === 1){
    alert.play();
  } 
    
  if(keyDown("k")){
    gameState = PAUSE;
  }
    
  if(car1.isTouching(petrolG)){
    beep.play();
    petrolG.destroyEach();
    petrolS = petrolS+1;
  }  
    
  if(frameCount%200 === 0){
    petrolS = petrolS-1;
  }  
    
  if(opp1G.isTouching(coinG)){
    coinG.destroyEach();
  }
    
    if(opp2G.isTouching(coinG)){
    coinG.destroyEach();
  }
    
  if(car1.isTouching(coinG)){
    coinS.play();
    coins = coins+1;
    coinG.destroyEach();
  }  
    
    if(coins === 20){
      gameState = WIN;
    }
    
  if(car1.isTouching(opp1G)){
    accident.play();
    opp1G.destroyEach();
    opp2G.destroyEach();
    gameState=END;
  }
    
    if(car1.isTouching(opp2G)){
      accident.play();
      opp1G.destroyEach();
      opp2G.destroyEach();
      gameState=END;
    }
   
    if(petrolS == 0){
      stop.play();
      gameState = END;
    }
   
}
  
 else if(gameState===END){
    
    win.visible = false;
    car1.visible = false;
    start.visible = false;
    coin.visible = false;
    finish.visible = false;
    petrol.visible = false;
   
    lose.visible = true;
    reset.visible = true;
   
   
    road.velocityY=0;
   
   if(mousePressedOver(reset)){
     gameState = START;
   }
   
  }
  
  if(gameState === WIN){
    
    finish.visible = true;
    
    road.velocityY = 0;
    car1.velocityY = -6;
    car1.x = World.mouseX;
    
    opp1G.destroyEach();
    opp2G.destroyEach();
    coinG.destroyEach();
    
    car1.depth = finish.depth;
    car1.depth = car1.depth + coin.depth  ;
    
   if(car1.isTouching(finish)){
     clap.play();
     
     gameState = WINN;
     
   }
    
  }  
  
  if(gameState === WINN){
    car1.velocityY = 0;
    car1.y = 430;
    
    win.visible = true;
    reset.visible = true;
    
    car1.visible = false;
    finish.visible = false;
    
    if(mousePressedOver(reset)){
      gameState = START;
      coins = 0;
      score = 0;
    }
    
  }
  
  if(gameState === PAUSE){
  road.velocityY=0;
  opp1.velocityY=0;
  opp2.velocityY=0;
  coin.velocityY=0;
  petrol.velocityY=0;
    
  opp1.lifetime = -10;
  opp2.lifetime = -10;
  coin.lifetime = -10;
  petrol.lifetime  =-10;  
    
  if(keyDown("p")) {
    
    coin.velocityY=4+score/6;
    opp1.velocityY=4+score/6;
    opp2.velocityY=4+score/6;
    petrol.velocityY=4+score/6;
    
    gameState = PLAY;
  }
    
  }
  drawSprites();
  
  textSize (23);
  fill ("red");
  text("distance : "+score+" m",200,20);
  
  
  fill("yellow");
  text("coins : "+coins,10,20);
  
  if(gameState === PLAY){
    fill ("white");
    text("petrol : "+petrolS,260,490);
  }
  
  if(petrolS === 1){
    fill("pink");
    textSize("200");
    text("fuel is low",150,80);
  }
  
  if(petrolS === 0){
    fill("pink");
    textSize("200");
    text("fuel is over",150,80);
  }
  
  
  if(gameState === START){
    
    fill("white");
    text("Read Instruction",110,50);    
    fill("orange");
    text("press space to horn !!",110,90);
    text("press K to pause !!",110,120);
    text("press P to play !!",110,150);
    text("take the petrol cans !!",110,180);
  }
  
  if(gameState === WINN){
    //fill("blue");
    text("you take "+coins+" coins",125,350);
    text("you travelled "+ score +" m",125,390)
  }
}

function opp1c(){
  if(frameCount%100==0){
  opp1 = createSprite(Math.round(random(20,370),-200,20,20));
  opp1.addAnimation("opp1",opp1Img);
  opp1.scale = 0.2;
  opp1.velocityY=4+score/6;
  opp1.setCollider("rectangle",0,0,230,400);
  opp1.lifetime=150;
  
   opp1G.add(opp1);
}
 }
 
function opp2c(){
  if(frameCount%122==0){
  opp2 = createSprite(Math.round(random(20,370),-200,20,20));
  opp2.addAnimation("opp2",opp2Img);
  opp2.scale = 0.2;
  opp2.velocityY=4+score/6;
  opp2.lifetime = 150;    
    
  opp2G . add (opp2);  
}
}

function coinc(){
  if(frameCount%120==0){
    coin = createSprite(Math.round(random(20,380),-200,20,20));
    coin.addAnimation("coin",coinImg);
    coin.scale = 0.3/4;
    coin.velocityY=4+score/6;
    coin.lifetime=150;
    
    coinG . add (coin);
  }
}

function petC(){
  if(frameCount%200 == 0){
    petrol = createSprite(Math.round(random(20,380),-100,10,10));
    petrol.addAnimation("petrol",petrolImg);
    petrol.scale = 0.1;
    petrol.velocityY = 4+score/6;
    petrol.lifetime = 200;
    
    petrolG . add (petrol);
  }
}     