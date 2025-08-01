//* GLOBAL DOM ELEMENTS

// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// buttons
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");
const scoreNode = document.querySelector("#score-value");

//* GLOBAL GAME VARIABLES
let birdObj = null; // initialise an empty bird object as a global level variable. Now when you play with it in functions it is accessable everywhere
let obstacleArr = [];
let minimumTopObstaclePosition = -120;
let obstacleSeperation = 340;

let gameIntervalID = null;
let obstacleSpawnIntervalId = null;
let score = 0;

//* GLOBAL GAME FUNCTIONS

function startGame() {
  // hide the start gaeme screen
  startScreenNode.style.display = "none";
  // show the game screen
  gameScreenNode.style.display = "flex";
  // add any itital elements to the game
  birdObj = new Bird();

  // start the game loop (interval)
  gameIntervalID = setInterval(gameLoop, Math.round(1000 / 60));
  // start any other interbal or timeouts the we need
  obstacleSpawnIntervalId = setInterval(spawnObstacle, 2000);
}

function spawnObstacle() {
  let randomPosYTop = Math.floor(Math.random() * minimumTopObstaclePosition);

  let obstacleTop = new Obstacle("top", randomPosYTop);
  obstacleArr.push(obstacleTop);

  let obstacleBottom = new Obstacle(
    "bottom",
    randomPosYTop + obstacleSeperation
  );
  obstacleArr.push(obstacleBottom);

  console.log(obstacleArr);
}

function checkDespawnObstacle() {
  if (obstacleArr[0] && obstacleArr[0].x < 0 - obstacleArr[0].w) {
    // to remove elements from the game you need to remove it from the JS and the DOM
    obstacleArr[0].node.remove();
    obstacleArr.splice(0, 1); // can also use shift if its the first
    score += 0.5;
  }
}

function gameLoop() {
  //console.log("intervalRunning")
  birdObj.gravityEffect();

  obstacleArr.forEach((eachObstacleObj) => {
    eachObstacleObj.automaticMovement();
  });

  checkDespawnObstacle();
  checkCollisionBirdFloor();
  checkCollisionBirdObstacle();
}

function checkCollisionBirdFloor() {
  if (birdObj.y + birdObj.h > gameBoxNode.offsetHeight) {
    gameOver();
  }

  scoreNode.innerHTML = Math.floor(score);
}

function gameOver() {
  // clear all intervals and timeouts
  clearInterval(gameIntervalID);
  clearInterval(obstacleSpawnIntervalId);
  //hide the game screen

  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
  //makje the game over screen appear
  //we need to clear the game
}

function handleBirdJump(event) {
  if (event.code === "Space" || event.key === "ArrowUp") {
    birdObj.jump();
  }
}

function checkCollisionBirdObstacle() {
  let isColliding = false;

  obstacleArr.forEach((eachObstacleObj) => {
    isColliding = checkCollision(birdObj, eachObstacleObj);
    if (isColliding) {
      gameOver();
    }
  });
}

function checkCollision(element1, element2) {
  if (
    element1.x < element2.x + element2.w &&
    element1.x + element1.w > element2.x &&
    element1.y < element2.y + element2.h &&
    element1.y + element1.h > element2.y
  ) {
    return true;
  } else {
    return false;
  }
}

//* EVENT LISTENERS

startBtnNode.addEventListener("click", startGame);
document.addEventListener("keydown", handleBirdJump);

/*
Brainstorm

X Background

Bird
X locationx locationy width height, speedx speedy
X method to jump (but can't move past cieling)

Obstacles
-x y height width speed
-X automatic movement
-X spawn obstacles
-X despawn obstacles



CollisionBirdPipe
-GameOver (good to have this seperate incase it get triggered for other reason)

CollisionBirdFloor


Bonus - count number of pipes to score



*/
