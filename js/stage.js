var i;
function stageStart() {
  game.time.events.add(0, wave1, this);
  game.time.events.add(3000, wave2, this);
  game.time.events.add(10000, wave3, this);
}

//Intermidiate callback function for enemy.launch()
function launch(enemyGroup, x, y, angle, speed, xAccel, yAccel) {
  var enemy = enemyGroup.getFirstExists(false);
  enemy.launch(x, y, angle, speed, xAccel, yAccel);
}

//Intermidiate callback function for enemy.launchTween()
function launchTween(enemyGroup, x, y, properties, duration) {
  var enemy = enemyGroup.getFirstExists(false);
  enemy.launchTween(x, y, properties, duration);
}

function wave1() {
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, launch, this, trashEnemy2, 0, 100, 0, 400, -150, 0);
  }
  for (i = 0; i < 5; i++) {
    game.time.events.add(i * 1000, launch, this, trashEnemy, 500, 0, 135, 100, 20, 0);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

function wave2() {
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, launch, this, trashEnemy2, game.width, 100, -180, 400, 150, 0);
  }
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, launch, this, trashEnemy2, 0, 400, 0, 400, -150, 0);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

function wave3() {
  for (i = 0; i < 3; i++) {
    launchTween(trashEnemy, i * 200 + 100, 0, { y: 200 }, 1000);
  }
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, launch, this, trashEnemy2, 0, 100, 45, 400, -150, 0);
  }
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, launch, this, trashEnemy2, game.width, 100, 135, 400, 150, 0);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}
