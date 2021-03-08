
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var flapyBird, flappyBirdImg;
var ground;
var clouds;
var background1, backgroundImg;
var obstaclesGroup1, obstaclesGroup2, PipeImg2;
var gameState = 0;
var score = 0;
var restart;

function preload() {
	
	flappyBirdImg = loadImage("FlappyBird.jpg");
	PipeImg2 = loadImage("FlappyBirdPipes.jpg");
	backgroundImg = loadImage("FlappyBackground.png");

	
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	//fill("lightblue");
	//background1 = createSprite(400, 350, 800, 700);
	fill("black");
	flappyBird = createSprite(400, 400, 20, 20);
	flappyBird.addImage(flappyBirdImg);
	flappyBird.scale = 0.1
	ground = createSprite(400, 680, 800, 40);

	obstaclesGroup1 = new Group();
	obstaclesGroup2 = new Group();
	

	//Create the Bodies Here.


	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
	background(backgroundImg);

	ground.visible = false;

	if (keyDown("space")||keyDown("up_arrow")) {

		flappyBird.velocityY = -5;
	}

	flappyBird.velocityY = flappyBird.velocityY + 0.2

	flappyBird.collide(ground);

	obstacles();

	flappyBird.collide(obstaclesGroup1);
	flappyBird.collide(obstaclesGroup2);

	if (flappyBird.isTouching(obstaclesGroup1) || flappyBird.isTouching(obstaclesGroup2)) {
		gameState = 1;
	}

	if (gameState === 1) {
		textSize(30);
		text("Game Over!", 390, 350);
		textSize(25);
		text("Your score: " + score, 390, 370);
		var restart = createSprite(400, 400, 50, 50);
		obstaclesGroup1.destroyEach();
		obstaclesGroup2.destroyEach();
		obstaclesGroup1.setVelocityXEach(0);
		obstaclesGroup2.setVelocityXEach(0);
    }
  
  drawSprites();
 
}

function obstacles() {
	if (frameCount % 80 === 0) {
		
		var obstacle1 = createSprite(800, 10, 50, 200);
		
		var obstacle2 = createSprite(850, 680, 50, 500);
		obstacle2.addImage(PipeImg2);
		obstacle2.scale = random(0.22,0.4);

		obstaclesGroup1.add(obstacle1);
		obstaclesGroup2.add(obstacle2);

		obstacle1.velocityX = -5
		obstacle2.velocityX = -5

		obstacle1.lifeTime = 160;
		obstacle2.lifeTime = 160;

		var rand1 = random(200, 500);
		var rand2 = random(0.22, 0.4)

		obstacle1.height = rand1;
		obstacle2.height = rand1;




	}

}

