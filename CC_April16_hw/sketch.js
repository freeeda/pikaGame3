var backgroundImage;
var ball, pika;

var pikaX, pikaY;

var ballX, ballY;

var speedX;
var speedY;

//count variables
var points;
var miss;

//sound variables
var bouncing;
var falling;
var getPoint;

function preload(){

  backgroundImage = loadImage("images/bg.jpg");
  pika = loadImage("images/pika1.png");
  ball = loadImage("images/pokeball.png");

  bouncing = loadSound("sounds/bouncing.mp3");
  getPoint = loadSound("sounds/points.mp3");
  falling = loadSound("sounds/fail.mp3");
}

function setup(){

  createCanvas(1000,800);

  //set up initial position of basket
  pikaX = 500;
  pikaY = 760;

  //set up initial position of ball at the center of screen
  ballX = 500;
  ballY = 400;

  // set the INITIAL speed of the ball
  speedX = random(1,4);
  speedY = random(1,4);

  //set up points and miss
  points = 0;
  miss = 0;

  textSize(20);
}

function draw(){
  imageMode(CORNER)
  image(backgroundImage, 0, 0);

  //draw pika and pokeball
  imageMode(CENTER);
  image(pika, pikaX, pikaY);
  image(ball, ballX, ballY, 75, 75);

  //borders
  fill(139,69,19);
  rect(0,0,25,800);
  rect(25,0,1000,25);
  rect(975,0,25,800);

  //track points and misses
  text("Score: " + points, 50, 50);
  text("Misses: " + miss, 50, 70);


  ballX += speedX;
  ballY += speedY;

  //ball hits top border
  if (ballY < 25){
    speedY *= -1;
    bouncing.play();
  }

  //ball hits right or left border
  if (ballX > width-25 || ballX < 25 ){
    speedX *= -1;
    bouncing.play();

  }

  if (ballY >= height - pika.height){
    //when pika catches the ball - add point
    if (dist(ballX, ballY, pikaX, pikaY)< 25){
      points++;
      //change the direction of ball when it hits the right side of the pika
      if (ballX > pikaX){
        if (speedX < 0){
          speedX *= -1;
          speedY *= -1;
          bouncing.play();
        }

        else if (speedX > 0){
          speedX *= 1;
          speedY *= -1;
          bouncing.play();
        }
      }
      //change the direction of ball when it hits the left side of pika
      else if (ballX < pikaX){
        if (speedX < 0){
          speedX *= 1;
          speedY *= -1;
          bouncing.play();
        }
        else if (speedX > 0){
          speedX *= -1;
          speedY *= -1;
          bouncing.play();
        }
      }
    }
    //when pika misses the ball
    else if (ballY > height){
      ballX = 500;
      ballY = 400;

      // pick a new random speed
      speedX = random(1, 4);
      speedY = random(1, 4);

      falling.play();
      miss += 1;

    }
  }

  //pika moves to left
  if (keyIsDown(65) == true){
    pikaX -= 5;

    //stop when touching the left edge
    if (pikaX < 75){
      pikaX = 75;
    }
  }
  //pika moves to right
  if (keyIsDown(68) == true){
    pikaX += 5;

    //stop when touching the right edge
    if (pikaX > 925){
      pikaX = 925;
    }

  }


}
