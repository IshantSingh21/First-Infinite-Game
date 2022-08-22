var rocket, meteor
var bgImg, rocketImg, meteorImg
var gameState = "play"
var score;

function preload(){
bgImg = loadImage("Starry bg.jpg")
rocketImg = loadImage("Rocket.png")
meteorImg = loadImage("Meteor.png")
}

function setup() {
 createCanvas(600,600)
 bg = createSprite(110, 400)
 bg.addImage(bgImg)
 bg.scale = 3
 bg.velocityY=4

 rocket = createSprite(100,300,50,50)
 rocket.scale = 0.2
 rocket.addImage(rocketImg)
 rocket.setCollider("rectangle", 0, 0, 100, 200)
 rocket.debug = true;
 meteorsGroup = new Group();

 score = 0;

}

function draw() {
  
  text("score: "+score,300,50) 
  score=score+Math.round(frameCount/60)

  if (gameState = "play"){
    score = score + Math.round(getFrameRate()/20);

 if(bg.y > 550){
    bg.y = 300
  }  
// Moving rockets with Keys
  if(keyDown("LEFT_ARROW")){
     rocket.x = rocket.x -3
  }

  if(keyDown("RIGHT_ARROW")){
    rocket.x = rocket.x +3

  }

  if(keyDown("space")){

   rocket.velocityY = -10
  
  }
// Giving gravity to Rocket
 rocket.velocityY = rocket.velocityY +0.8;

if(rocket.y > 600){
  rocket.destroy();
  gameState = "end"
}
if(rocket.isTouching(meteorsGroup)){
 gameState ="end"


}

if(keyDown("space")){
gameState = "play"

}
 spawnMeteors();
  drawSprites();

}


if(gameState === "end"){
  fill("red")
  textSize(50)
  text("Game Over ☠", 55, 200)

  bg.velocity = 0;
  rocket.velocity = 0;
  meteorsGroup.setVelocityYEach(0)
 }
}

 function spawnMeteors(){

if (frameCount % 200 === 0){
meteor = createSprite(200, -50)
meteor.velocityY = 10 
meteor.addImage(meteorImg)
meteor.scale = 0.1
meteorsGroup.add(meteor);

meteor.x = Math.round(random(30,380))

meteor.setCollider("rectangle", 20, 30)
meteor.debug = true;
}

}
