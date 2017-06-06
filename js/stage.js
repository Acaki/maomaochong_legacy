var i;
function stageStart() {
  //game.time.events.add(3 * Phaser.Timer.SECOND, wave1, this);
  //game.time.events.add(20 * Phaser.Timer.SECOND, wave2, this);
  //game.time.events.add(41 * Phaser.Timer.SECOND, wave3, this);
  game.time.events.add(/*61*/0 * Phaser.Timer.SECOND, wave4, this);
}

//Intermidiate callback function for enemy.launch()
function launch(enemyGroup, x, y, angle, speed, xAccel, yAccel) {
  var enemy = enemyGroup.getFirstExists(false);
  if (enemy) {
    enemy.launch(x, y, angle, speed, xAccel, yAccel);
  }
}

//Intermidiate callback function for enemy.launchTween()
function launchTween(enemyGroup, x, y, properties, duration) {
  var enemy = enemyGroup.getFirstExists(false);
  if (enemy) {
    enemy.launchTween(x, y, properties, duration);
  }
}

//14 seconds
function wave1() {
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += 2 * Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, 200, 0, 90, 400, 0, -200);
    game.time.events.add(i, launch, this, enemyGroups.trash, 400, 0, 90, 400, 0, -200);
  }
  for (var j = i; j < i + 5 * Phaser.Timer.SECOND; j += Phaser.Timer.SECOND) {
    game.time.events.add(j, launch, this, enemyGroups.trash, game.world.width, 200, -180, 400, 150, 0);
    game.time.events.add(j, launch, this, enemyGroups.trash, 0, 400, 0, 400, -150, 0);
  }
}

//18 seconds
function wave2() {
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, game.world.width, 100, -180, 400, 150, 0);
    game.time.events.add(i, launch, this, enemyGroups.trash, 0, 300, 0, 400, -150, 0);
  }
  game.time.events.add(i, launch, this, enemyGroups.medium, 200, 0, 90, 50, 0, 0);
  game.time.events.add(i, launch, this, enemyGroups.medium, 400, 0, 90, 50, 0, 0);
  var halfHeight = enemyGroups.trash.getChildAt(0).height / 2 + 1;
  for (var j = i; j < i + 10 * Phaser.Timer.SECOND; j += Phaser.Timer.SECOND) {
    game.time.events.add(j, launchTween, this, enemyGroups.trash, 100, 0, { x: [500, 100, 500, 100], y: [200, 400, 600, 800 + halfHeight] }, 5000);
    game.time.events.add(j, launchTween, this, enemyGroups.trash, 500, 0, { x: [100, 500, 100, 500], y: [200, 400, 600, 800 + halfHeight] }, 5000);
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}

//17 seconds
function wave3() {
  for (i = 0; i < 10 * Phaser.Timer.SECOND; i += Phaser.Timer.SECOND) {
    game.time.events.add(i, launch, this, enemyGroups.trash, 0, 100, 45, 400, -200, 0);
    game.time.events.add(i, launch, this, enemyGroups.trash, game.world.width, 100, 135, 400, 200, 0);
  }
  for (var j = 0; j < 3; j++) {
    game.time.events.add(i, launchTween, this, enemyGroups.medium, j * 200 + 100, 0, { y: 200 }, 1000);
  }
  i += 7 * Phaser.Timer.SECOND;
  game.time.events.add(i, launchTween, this, enemyGroups.medium, 200, 0, { y: 300 }, 1000);
  game.time.events.add(i, launchTween, this, enemyGroups.medium, 400, 0, { y: 300 }, 1000);
}

function wave4() {
  for (i = 0; i < 20 * Phaser.Timer.SECOND; i += Phaser.Timer.HALF) {
    game.time.events.add(game.rnd.integerInRange(i, i + 250), launch, this, enemyGroups.meteorSmall, null, null, 90, 400);
    if (i % Phaser.Timer.SECOND == 0) {
      game.time.events.add(game.rnd.integerInRange(i, i + 250), launch, this, enemyGroups.meteorBig, null, null, 90, 200);
    }
  }
  game.time.events.add(game.rnd.integerInRange(3000, 5000), powerUp.drop, powerUp);
}
