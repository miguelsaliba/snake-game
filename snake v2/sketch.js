var x = 0;
var y = 0;
var snakex = 0;
var snakey = 0;
var snax = [0];
var snay = [0];
var px;
var py;
var playPressed = false;
var highscore = 0;
var pelletRed;
var pelletGreen;
var pelletBlue;
var keyPress = false;
var currentx = 0;
var currenty = 0;

function setup() {
  frameRate(15);
  createCanvas(600,600);
  createPellet();
  ellipseMode(CORNER);
  noStroke();
  translate(2,2);
}

function draw() {
  if (snakex > 580 || snakex < 0 || snakey > 580 || snakey < 0)  death();
  snax.push(snakex); snay.push(snakey);
  snax.splice(0,1); snay.splice(0,1);
  if (snakex % 20 == 0 && snakey % 20 == 0){
    snakex+=x;
    snakey+=y;
    currentx=x;
    currenty=y;
  } else {
    snakex+=currentx;
    snakey+=currenty;
  }
  if (onSnake(snakex,snakey)) death();
  if (snakex == px && snakey == py) {
    document.getElementById('score').innerHTML="Score: " + snax.length
    createPellet();
    snax.unshift(snax[0]);
    snay.unshift(snay[0]);
  }
  background(0);
  push();
  rectMode(CORNERS);
  fill(pelletRed,pelletGreen,pelletBlue);
  ellipse(px,py,16,16);
  fill(255);
  for (var i = 1; i < snax.length; i++) {
    if (snax[i] < snax[i+1] || snay[i] < snay[i+1]){
      rect(snax[i], snay[i],snax[i+1] + 16,snay[i+1] + 16);
    } else {
      rect(snax[i+1], snay[i+1],snax[i] + 16,snay[i] + 16);
    }
  }
  pop();
  rect(snakex,snakey,16,16)
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
  while ((abs(px-snakex)<50 && abs(py-snakey)<50) || onSnake(px,py) || (px<=40 && py<=20));
  pelletRed = floor(random(16,250));
  pelletGreen = floor(random(16,250));
  pelletBlue = floor(random(16,250));
}

function onSnake(thex, they) {
  for (var i = 0; i < snax.length; i++) {
    if (thex == snax[i] && they == snay[i]) return true;
  }
  return false;
}

function play() {
  playPressed = true
  document.getElementById('button').style.visibility = 'hidden';
  x = 20;
}

function death() {
  playPressed = false;
  x = 0; y = 0;
  snakex = 0; snakey = 0;
  snax = [0]; snay =[0];
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
