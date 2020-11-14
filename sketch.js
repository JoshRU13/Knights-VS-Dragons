var maze = []
var knight,knightStill,knightWalk,knightAttack,knightWalkBack;
var dragonGroup,dragonImage,score,dragonBoss,dragonBossImg;
var gameState = 0;
function preload(){
knightWalk = loadImage("images/Knight 3.png")
knightStill = loadImage("images/Knight 1.png")
knightAttack = loadImage("images/Knight 2.png")
knightWalkBack = loadImage("images/Knight 4.png")
dragonImage = loadImage("images/Dragon 1.png")
fireballImage = loadImage("images/Fireball.png")
dragonBossImg = loadImage("images/Dragon 2.png")
}

function setup() {
  createCanvas(800,400);
dragonGroup = createGroup()
fireballGroup = createGroup()
  knight = createSprite(50, 355, 10, 40);
  knight.addImage(knightStill);
  knight.scale = 0.15
  var hline1 = createSprite(365,75,200,5);
  hline1.shapeColor ="blue"
  maze.push(hline1)
  var vline1 = createSprite(360,320,5,185);
  vline1.shapeColor = "blue"
  maze.push(vline1)
  var hline2 = createSprite(90,300,225,5);
  hline2.shapeColor = "blue"
  maze.push(hline2)
  var vline2 = createSprite(90,160,5,155)
  vline2.shapeColor = "blue"
  maze.push(vline2)
  var hline3 = createSprite(225,230,265,5);
  hline3.shapeColor = "blue"
  maze.push(hline3)
  var vline3 = createSprite(270,35,5,75)
  vline3.shapeColor = "blue"
  maze.push(vline3)
  var vline4 = createSprite(460,190,5,230)
  vline4.shapeColor = "blue"
  maze.push(vline4)
  var hline4 = createSprite(560,300,200,5)
  hline4.shapeColor = "blue"
  maze.push(hline4)
  var vline5 = createSprite(660,180,5,250)
  vline5.shapeColor = "blue"
  maze.push(vline5)
  //knight.debug = true;
  knight.setCollider("circle",5,5,45)
  score = 0;
}

function draw() {
  background("black"); 
  switch(gameState){
    case 0:
  text("Instructions",100,10);
  text("Press space to start",100,25);
  text("Use arrow keys to move",100,40);
  text("Collide with the dragons to destroy them",100,55);
  text("After destroying 15 dragons, you go to the 2nd stage",100,70);
  text("Be sure that you don't collide with the wall",100,85);
  text("There will be a boss dragon waiting for you on the 2nd stage",100,100);
  if(keyDown("space")){
    gameState = 1;
  }    
  break;
  case 1:if(knight.velocityX===0&&knight.velocityY===0){
    knight.addImage(knightStill);
    knight.scale = 0.15
  }
  else{
    knight.addImage(knightWalk);
    knight.scale = 0.2
  }
  if(keyWentUp(UP_ARROW)||keyWentUp(DOWN_ARROW)||keyWentUp(RIGHT_ARROW)||keyWentUp(LEFT_ARROW)){
    knight.setVelocity(0,0)
  }
  if(keyDown(UP_ARROW)){
    knight.setVelocity(0,-2)
  }
  if(keyDown(DOWN_ARROW)){
    knight.setVelocity(0,2)
  }
  if(keyDown(LEFT_ARROW)){
    knight.setVelocity(-2,0)
    knight.addImage(knightWalkBack)
    knight.scale = 0.2
  }
  if(keyDown(RIGHT_ARROW)){
    knight.setVelocity(2,0)
  }
  if(knight.collide(maze)){
    knight.x = 50;
    knight.y = 355;
  }
  for(var i=0;i<dragonGroup.length;i++){
    var d = dragonGroup.get(i)
    if(knight.isTouching(d)){
      d.destroy()
      score++
    }
  }
  textSize(20)
  text("Score: 0"+score,700,30)
  spawnDragons()
  drawSprites();
  if(score>=15){
    gameState = 2
  }
  break;
  case 2:
  var playMode = 1
  background("lightblue");
  dragonGroup.destroyEach()
  dragonBoss = createSprite(720,200,20,20)
  //dragonBoss.debug = true
  dragonBoss.setCollider("rectangle",0,0,150,100)
  dragonBoss.addImage(dragonBossImg)
 for(var i =0;i<maze.length;i++){
  maze[i].destroy()
 }
 drawSprites();
 if(playMode===1){
  fireball();
  if(knight.velocityX===0&&knight.velocityY===0){
    knight.addImage(knightStill);
    knight.scale = 0.15
  }
  else{
    knight.addImage(knightWalk);
    knight.scale = 0.2
  }
  if(keyWentUp(UP_ARROW)||keyWentUp(DOWN_ARROW)||keyWentUp(RIGHT_ARROW)||keyWentUp(LEFT_ARROW)){
    knight.setVelocity(0,0)
  }
  if(keyDown(UP_ARROW)){
    knight.setVelocity(0,-2)
  }
  if(keyDown(DOWN_ARROW)){
    knight.setVelocity(0,2)
  }
  if(keyDown(LEFT_ARROW)){
    knight.setVelocity(-2,0)
    knight.addImage(knightWalkBack)
    knight.scale = 0.2
  }
  if(keyDown(RIGHT_ARROW)){
    knight.setVelocity(2,0)
  }
  for(var i=0;i<fireballGroup.length;i++){
    var f = fireballGroup.get(i)
    if(knight.isTouching(f)){
     fireballGroup.setVelocityEach(0,0)
     fill("black")
     textSize(30)
     text("Game Over!",400,200);
     knight.setVelocity(0,0)
     playMode = 0
    }
  }
  if(knight.isTouching(dragonBoss)){
    fill("black")
    textSize(30)
    text("You Win!",400,200)
    fireballGroup.setVelocityEach(0,0)
    knight.addImage(knightAttack)
    knight.x = dragonBoss.x
    knight.y = dragonBoss.y-100
    knight.setVelocity(0,0)
    playMode = 0
  }
}
  }
  //text("X: "+mouseX+" , Y: "+mouseY, 50, 50);
  
}
function spawnDragons(){
  if(frameCount%40===0){
    var x = Math.round(random(30,600))
    var y = Math.round(random(40,330))
    var dragon = createSprite(x,y,20,20)
    dragon.addImage(dragonImage)
    dragon.lifetime = 200
    dragonGroup.add(dragon)
    dragon.scale = 0.3
  }
  
}
function fireball(){
  if(frameCount%10===0){
    var fireball = createSprite(random(50,650),0,20,20);
    fireball.velocityX = 0;
    fireball.velocityY = 2;
    fireball.shapeColor = "red";
    fireball.addImage(fireballImage)
    fireball.scale = 0.2
    fireballGroup.add(fireball)
  }
}

