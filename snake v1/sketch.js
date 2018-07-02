var x = 0;
var y = 0;
var snakex = 0;
var snakey = 0;
var snax = [0];
var snay =[0];
var px;
var py;
var playPressed = false;
var highscore = 0;
var pelletRed;
var pelletGreen;
var pelletBlue;
var keyPress = false;

function setup() {
  createCanvas(600,600);
  frameRate(15)
  createPellet();
  ellipseMode(CORNER);
  noStroke();
}

function draw() {
  if (snakex > 580)  snakex = 0;
  if (snakex < 0)  snakex = 600;
  if (snakey > 580)  snakey = 0;
  if (snakey < 0)  snakey = 600;
  snax.push(snakex); snay.push(snakey);
  snax.splice(0,1); snay.splice(0,1);
  snakex+=x;
  snakey+=y;
  if (snakex == px && snakey == py) {
    document.getElementById('score').innerHTML="Score: " + snax.length
    createPellet();
    snax.unshift(snax[0]);
    snay.unshift(snay[0]);
  }
  background(0);
  for (var i = 0; i < snax.length; i++) {
    rect(snax[i], snay[i],20,20)
  }
  push();
  fill(pelletRed,pelletGreen,pelletBlue);
  ellipse(px,py,20,20);
  pop();
  keyPress = false;
}

function keyPressed() {
  if (playPressed == true && keyPress == false) {
    if (keyCode === RIGHT_ARROW && x!=-20) {
      x = 20; y = 0;
      keyPress = true;
    } else if (keyCode === LEFT_ARROW && x!=20) {
      x = -20; y = 0;
      keyPress = true;
    } else if (keyCode === UP_ARROW && y!=20) {
      x = 0; y = -20;
      keyPress = true;
    } else if (keyCode === DOWN_ARROW && y!=-20) {
      x = 0; y = 20;
      keyPress = true;
    }
  }
}

function createPellet() {
  do {
    px = 20 * Math.floor(random(0,30)); py = 20 * Math.floor(random(0,30));
  }
  while ((abs(px-snakex)<50 && abs(py-snakey)<50) || pelletOnSnake() || (px<=40 && py<=20));
  pelletRed = floor(random(16,250));
  pelletGreen = floor(random(16,250));
  pelletBlue = floor(random(16,250));
}

function pelletOnSnake() {
  for (var i = 0; i < snax.length; i++) {
    if (px == snax[i] && py == snay[i]) return true;
  }
  return false;
}

function play() {
  playPressed = true
  document.getElementById('button').style.visibility = 'hidden';
  x = 20;
}

function death() {
  if (snax.length > highscore) {
    highscore = snax.length;
  }
  document.getElementById('button').style.visibility = 'visible';
}

function mouseClicked() {
  document.getElementById('score').innerHTML="Score: " + snax.length
  snax.unshift(snax[0]);
  snay.unshift(snay[0]);
}
