var arrow, bow, cloud;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, cloudImage;
var arrowGroup, greenB, redB, pinkB, blueB;
var red, blue, green, pink;
var score, cloudX, gameState="play";

function preload(){
  cloudImage = loadImage("cloud.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  createCanvas(400, 400);

  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage);
  bow.scale = 1;

  score = 0;

  //making groups
  arrowGroup = new Group();
  redB = new Group();
  blueB = new Group();
  greenB = new Group();
  pinkB = new Group();
}

function draw() {
 background("lightBlue");

 if (gameState=="play") {
  // moving clouds up 
  if (frameCount % 100==0) {
  cloudX=Math.round(random(35,375));
  cloud=createSprite(cloudX, 450);
  cloud.addImage(cloudImage);
  cloud.scale=0.175;
  cloud.depth=2;
  bow.depth=cloud.depth+1;
  cloud.velocityY=-4;
  cloud.lifetime=125;
  }

  //moving bow 
  bow.y = World.mouseY
  
  // release arrow when space key is pressed
  if (keyWentDown("space")){
    arrow= createSprite(100, 100, 60, 10);
    arrowGroup.add(arrow)
    arrow.addImage(arrowImage);
    arrow.x = 360;
    arrow.y=bow.y;
    arrow.velocityX = -40;
    arrow.lifetime = 100;
    arrow.scale = 0.3;
  }
  arrowGroup.setColliderEach("rectangle", 0, 0, 2, 35);

   
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
      red = createSprite(Math.round(random(20, 50)),400, 10, 10);
      redB.add(red);
      /*redB.setColliderEach("rectangle");
      redB.debug=true;*/
      red.addImage(red_balloonImage);
      red.velocityY = -7
      red.lifetime = 150;
      red.scale = 0.1;
    } else if (select_balloon == 2) {
      green = createSprite(Math.round(random(20, 50)),400, 10, 10);
      greenB.add(green);
      /*blueB.setColliderEach("rectangle", 0, 0);
      blueB.debug=true;*/
      green.addImage(green_balloonImage);
      green.velocityY = -6;
      green.lifetime = 150;
      green.scale = 0.1;
    } else if (select_balloon == 3) {
      blue = createSprite(Math.round(random(20, 50)),400, 10, 10);
      blueB.add(blue);
      /*blueB.setColliderEach("rectangle", 0, 0);
      blueB.debug=true;*/
      blue.addImage(blue_balloonImage);
      blue.velocityY = -7;
      blue.lifetime = 150;
      blue.scale = 0.1;
    } else {
      pink = createSprite(Math.round(random(20, 50)),400, 10, 10);
      pinkB.add(pink);
      /*pinkB.setColliderEach("rectangle", 0, 0);
      pinkB.debug=true;*/
      pink.addImage(pink_balloonImage);
      pink.velocityY = -8;
      pink.lifetime = 150;
      pink.scale = 1.3;
    }
  }  

  //destroy ballon when arrow is hit
  //add score
  if (arrowGroup.isTouching(redB)) {
    redB.destroyEach();
    arrowGroup.destroyEach();
    gameState="end";
  }

  if (arrowGroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score=score+2;
  }

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score=score+3;
  }

  if (arrowGroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score=score+4;
  }
  }else if (gameState=="end") {
    cloud.velocityY=0;
    textSize(30)
    textAlign(CENTER,CENTER);
    text("Game Over", 200,185);
    text("Your score is "+score, 200, 215);
    cloud.lifetime=-1;
    if(keyDown("space")){
      gameState="play";
      cloud.destroy();
      score=0;
    }
  }
  drawSprites();
 //text(cloud.lifetime, 200,200)
  //console.log(cloud.lifetime);
  if (gameState=="play") {
  //make score
  textSize(20);
  text("Score: "+ score, 270, 30); 
  }
}


// Creating  arrows for bow
 function createArrow() {
  arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -40;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
}

function redBalloon() {
  red = createSprite(Math.round(random(20, 50)),400, 10, 10);
  red.addImage(red_balloonImage);
  red.velocityY = -5;
  red.lifetime = 150;
  red.scale = 0.1;
}

function blueBalloon() {
  blue = createSprite(Math.round(random(20, 50)),400, 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityY = -6;
  blue.lifetime = 150;
  blue.scale = 0.1;
}

function greenBalloon() {
  green = createSprite(Math.round(random(20, 50)),400, 10, 10);
  green.addImage(green_balloonImage);
  green.velocityY = -7;
  green.lifetime = 150;
  green.scale = 0.1;
}

function pinkBalloon() {
  pink = createSprite(Math.round(random(20, 50)),400, 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityY = -8;
  pink.lifetime = 150;
  pink.scale = 1.3
}