var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;

var score =0;
function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();
 
  
}

function draw() {
 background(0);
 if(gameState === PLAY){

  // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyWentDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 40 == 0) {
    switch(select_balloon ){
      case 1:spawnredballoon();
      break;
      case 2:spawnblueballoon();
      break;
      case 3:spawnpinkballoon();
      break;
      case 4:spawngreenballoon();
      break;
      default:break;
    }
  }

  
 
  
  for(var j=0; j<redB.length; j++){
    for(var i=0; i<arrowGroup.length; i++){
      if(arrowGroup.get(i).isTouching(redB.get(j))){
        redB.get(j).destroy();
        arrowGroup.get(i).destroy();
        gameState=END;
      }
    }
  }
 
   if (gameState === END) {
  scene.velocityX = 0;
}

// green balloon should have +3 scores
 for(var j=0; j<greenB.length;j++){
   for(var i=0; i<arrowGroup.length; i++){
     if(arrowGroup.get(i).isTouching(greenB.get(j))){
       greenB.get(j).destroy();
       arrowGroup.get(i).destroy();
       score=score+3;

     }
   }
 }


// blue balloon should have +2 scores
for(var j=0; j<blueB.length; j++){
  for(var i=0; i<arrowGroup.length; i++){
    if(arrowGroup.get(i).isTouching(blueB.get(j))){
      blueB.get(j).destroy();
      arrowGroup.get(i).destroy();
      score=score+2;

    }
  }
}


// pink balloon should have +1 score
for(var j=0; j<pinkB.length; j++){
  for(var i=0; i<arrowGroup.length; i++){
    if(arrowGroup.get(i).isTouching(pinkB.get(j))){
      pinkB.get(j).destroy();
      arrowGroup.get(i).destroy();
      score=score+1;
    }
  }
}
 }
  
  drawSprites();
  text("Score: "+ score, 300,50);
}


function spawnredballoon() {
  var red = createSprite(20, 370, 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.y=Math.round(random(50,300));
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function spawnblueballoon() {
  var blue = createSprite(20, 370, 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.y=Math.round(random(170,300));
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function spawngreenballoon() {
  var green = createSprite(20, 370, 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.y=Math.round(random(60,150));
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function spawnpinkballoon() {
  var pink = createSprite(20, 370, 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.y=Math.round(random(100,200));
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
   
}
