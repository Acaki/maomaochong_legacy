// MainState
var background;
var fightMusic;
var playerShoot;
var enemyDie;

var player;
var cursors;
var weapons = [];
var currentWeapon = 0;
var enemyGroups = {};
var enemyBulletGroups = [];
var explosions;
var powerUp;

var currentAngle;
var invincible = false;

var MainState = function(game){};
MainState.prototype = {

//var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});
preload: function() {
  game.load.image('player', 'assets/player.png');
  game.load.image('playerLeft', 'assets/playerLeft.png');
  game.load.image('playerRight', 'assets/playerRight.png');

  game.load.image('background', 'assets/backgrounds/purple.png');

  //Player bullet and power up images
  game.load.image('laserRed', 'assets/bullets/laserRed02.png');
  game.load.image('powerupRed_star', 'assets/power-ups/powerupRed_star.png');
  game.load.image('laserGreen', 'assets/bullets/laserGreen10.png');
  game.load.image('powerupGreen_star', 'assets/power-ups/powerupGreen_star.png');
  game.load.image('laserBlue', 'assets/bullets/laserBlue13.png');
  game.load.image('powerupBlue_star', 'assets/power-ups/powerupBlue_star.png');

  //Enemy object images
  game.load.image('enemyShip', 'assets/enemies/enemyShip.png');
  game.load.image('enemyUFO', 'assets/enemies/enemyUFO.png');
  game.load.image('meteorBig', 'assets/enemies/meteorBig.png');
  game.load.image('meteorSmall', 'assets/enemies/meteorSmall.png');
  game.load.image('enemyBlue','assets/enemies/enemyBlue2.png');
  game.load.image('enemyGreen', 'assets/enemies/enemyGreen5.png');

  //Enemy bullet images
  game.load.image('spaceMissile', 'assets/bullets/spaceMissiles_004.png');
  game.load.image('star','assets/bullets/star3.png');
  game.load.image('laserGreen16','assets/bullets/laserGreen16.png');

  game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);

  //game.load.audio('enemyDie' , 'alien_death1.wav');
},



 create: function() {
 background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
 //Make the background slowly scroll up
 background.autoScroll(0, -30);
 //Audio create
 //battle BGM
 fightMusic = game.add.audio('fight');
 fightMusic.loop = true;
 fightMusic.volume = 0.2;
 fightMusic.play();
 //player shooting
 playerShoot = game.add.audio('playershoot');
 playerShoot.volume = 0.05;

 enemyDie = game.add.audio('boom');
 enemyDie.volume = 0.1;


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
 weapons.push(new SplashBullet(game, player));

 //Enemy group creation
 enemyGroups.trash = game.add.group(game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);
 for (var i = 0; i < 10; i++) {
   var enemyWeapon = new Missile(game);
   enemyGroups.trash.add(new Enemy(game, 'enemyUFO', 1, enemyWeapon), true);
   enemyBulletGroups.push(enemyWeapon.weapon.bullets);
 }

 enemyGroups.medium = game.add.group(game.world, 'Trash Enemy2', false, true, Phaser.Physics.ARCADE);
 for (var i = 0; i < 20; i++) {
   var enemyWeapon = new ThreeARow(game);
   enemyGroups.medium.add(new Enemy(game, 'enemyBlue', 10, enemyWeapon), true);
   enemyBulletGroups.push(enemyWeapon.weapon.bullets);
 }

 enemyGroups.meteorSmall = game.add.group(game.world, 'Small Meteor', false, true, Phaser.Physics.ARCADE);
 for (var i = 0; i < 10; i++) {
   enemyGroups.meteorSmall.add(new Enemy(game, 'meteorSmall', 2), true);
 }

 enemyGroups.meteorBig = game.add.group(game.world, 'Big Meteor', false, true, Phaser.Physics.ARCADE);
 for (var i = 0; i < 10; i++) {
   enemyGroups.meteorBig.add(new Enemy(game, 'meteorBig', 5), true);
 }

 enemyGroups.green = game.add.group(game.world, 'Green Enemy', false, true, Phaser.Physics.ARCADE);
 for (var i = 0; i < 10; i++) {
   var enemyWeapon = new VariedAngle(game);
   enemyGroups.green.add(new Enemy(game, 'enemyGreen', 10, enemyWeapon), true);
   enemyBulletGroups.push(enemyWeapon.weapon.bullets);
 }

 cursors = game.input.keyboard.createCursorKeys();
 //Add key listener for 'shift'
 game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
 game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

 explosions = new Explosion(game);
 powerUp = new PowerUpGroup(game);

 stageStart();
},

 update: function() {
 keyboardHandler();
 for (var key in enemyGroups) {
   if (enemyGroups.hasOwnProperty(key)) {
     game.physics.arcade.overlap(weapons[currentWeapon].weapon.bullets, enemyGroups[key], damageEnemy, null, this);
     game.physics.arcade.overlap(player, enemyGroups[key], hitPlayer, null, this);
     enemyGroups[key].forEachExists(enemyShoot, this);
   }
 }
 game.physics.arcade.overlap(player, enemyBulletGroups, hitPlayer, null, this);
 game.physics.arcade.overlap(player, powerUp, powerUpWeapon, null, this);
},

};  //MainState prototype end

function keyboardHandler () {
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
if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !player.body.velocity.isZero()) {
 //Slow down the move speed for each direction
 game.physics.arcade.velocityFromAngle(currentAngle, 200, player.body.velocity);
}

if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
 weapons[currentWeapon].shoot();
 playerShoot.play();
  }
}
function resetTint(enemy) {
 enemy.tint = 0xffffff;
}

function damageEnemy(bullet, enemy) {
 enemy.damage(bullet.damage);
 enemy.tint = 0xff0000;
 game.time.events.add(15, resetTint, this, enemy);
 bullet.kill();
 if(!enemy.alive)
 {
   //Remove the tween that is associated with the enemy
   game.tweens.removeFrom(enemy);
   enemyDie.play();
   explosions.display(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
 }
}


function revivePlayer() {
 player.reset(game.world.width / 2, game.world.height);
 invincible = true;
 game.time.events.add(2000, function() { invincible = false; }, this);
}

function hitPlayer(player) {
 if (!invincible) {
   player.kill();
   game.time.events.add(1000, revivePlayer, this);
 }
}

function enemyShoot(enemy) {
 if (enemy.weapon) {
   enemy.weapon.shoot(enemy);
 }
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
function render() {
 game.debug.body(player);
}

