var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

function preload() {
  game.load.image('player', 'assets/player.png');
  game.load.image('playerLeft', 'assets/playerLeft.png');
  game.load.image('playerRight', 'assets/playerRight.png');
  game.load.image('background', 'assets/starBackground.png');
  game.load.image('laserRed', 'assets/laserRed.png');
  game.load.image('laserRedPowerUp', 'assets/laserRedShot.png');
  game.load.image('laserGreen', 'assets/laserGreen.png');
  game.load.image('laserGreenPowerUp', 'assets/laserGreenShot.png');
  game.load.image('enemy3','assets/enemy3.png');
  game.load.image('enemy4','assets/enemy4.png');
  game.load.image('bullet1','assets/bullet1.png');
  game.load.image('bullet2','assets/bullet2.png');
  game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);

}

var background;
var player;
var cursors;
var weapons = [];
var currentWeapon = 0;
var enemyGroups = {};
var enemyBulletGroups = [];
var explosions;
var powerUp;

function create() {
  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
  //Make the background slowly scroll up
  background.autoScroll(0, -30);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  //Add the player plane on the middle bottom of the screen
  player = game.add.sprite(game.world.width / 2, game.world.height, 'player');
  //Reduce the size of the player plane;
  player.scale.set(0.5);
  player.anchor.set(0.5, 1.0);
  game.physics.arcade.enable(player);
  player.body.setCircle(10, player.width - 10, player.height - 10);
  player.body.collideWorldBounds = true;

  weapons.push(new ScatterBullet(game, player));
  weapons.push(new Beam(game, player));

  //Enemy group creation
  enemyGroups.trash = game.add.group(game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);
  for (var i = 0; i < 40; i++) {
    var enemyWeapon = new EnemyBullet(game);
    enemyGroups.trash.add(new Enemy(game, 'enemy3', 5, enemyWeapon), true);
    enemyBulletGroups.push(enemyWeapon.weapon.bullets);
  }

  enemyGroups.trash2 = game.add.group(game.world, 'Trash Enemy2', false, true, Phaser.Physics.ARCADE);
  for (var i = 0; i < 40; i++) {
    var enemyWeapon = new EnemyBullet2(game);
    enemyGroups.trash2.add(new Enemy(game, 'enemy4', 1, enemyWeapon), true);
    enemyBulletGroups.push(enemyWeapon.weapon.bullets);
  }

  cursors = game.input.keyboard.createCursorKeys();
  //Add key listener for 'shift'
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

  explosions = new Explosion(game);
  powerUp = new PowerUpGroup(game);

  stageStart();
}

var currentAngle;
function keyboardHandler() {
  player.body.velocity.set(0, 0);
  player.loadTexture('player');
  //Move the plane left
  if (cursors.left.isDown) {
    game.physics.arcade.velocityFromAngle(-180, 300, player.body.velocity);
    currentAngle = -180;
    player.loadTexture('playerLeft');
  }
  //Move the plane right
  if (cursors.right.isDown) {
    game.physics.arcade.velocityFromAngle(0, 300, player.body.velocity);
    currentAngle = 0;
    player.loadTexture('playerRight');
  }
  //Up
  if (cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-90, 300, player.body.velocity);
    currentAngle = -90;
  }
  //Down
  if (cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(90, 300, player.body.velocity);
    currentAngle = 90;
  }

  //Up-left
  if (cursors.left.isDown && cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-135, 300, player.body.velocity);
    currentAngle = -135;
  }

  //Up-right
  if (cursors.right.isDown && cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-45, 300, player.body.velocity);
    currentAngle = -45;
  }

  //Down-left
  if (cursors.left.isDown && cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(135, 300, player.body.velocity);
    currentAngle = 135;
  }

  //Down-right
  if (cursors.right.isDown && cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(45, 300, player.body.velocity);
    currentAngle = 45;
  }

  //Check if 'shift' is being pressed
  if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
    //Slow down the move speed for each direction
    game.physics.arcade.velocityFromAngle(currentAngle, 200, player.body.velocity);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    weapons[currentWeapon].shoot();
  }
}

function damageEnemy(enemy, bullet) {
  enemy.damage(bullet.damage);
  bullet.kill();
  if(!enemy.alive)
  {
    //Remove the tween that is associated with the enemy
    game.tweens.removeFrom(enemy);
    explosions.display(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
  }
}

function damagePlayer(player, bullet) {
  console.log('hit!!!');
}

function powerUpWeapon(player, powerUp) {
  powerUp.kill();
  var currentPowerLevel = weapons[currentWeapon].powerLevel;
  //Increase power level of current weapon
  if (currentWeapon == powerUp.weaponType && currentPowerLevel < 3) {
    weapons[currentWeapon].powerLevel++;
  }
  //Switch the weapon
  else if (currentWeapon != powerUp.weaponType) {
    currentWeapon = powerUp.weaponType;
    weapons[currentWeapon].powerLevel = currentPowerLevel;
  }
}

function enemyShoot(enemy) {
  enemy.weapon.shoot(enemy);
}

function update() {
  keyboardHandler();
  for (var key in enemyGroups) {
    if (enemyGroups.hasOwnProperty(key)) {
      game.physics.arcade.overlap(enemyGroups[key], weapons[currentWeapon].weapon.bullets, damageEnemy, null, this);
      enemyGroups[key].forEachExists(enemyShoot, this);
    }
  }
  game.physics.arcade.overlap(player, enemyBulletGroups, damagePlayer, null, this);
  game.physics.arcade.overlap(player, powerUp, powerUpWeapon, null, this);
}

function render() {
  game.debug.body(player);
}
