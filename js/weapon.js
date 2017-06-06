/*
 * @param offsetX - The horizontal offset from the Sprites position to be applied to the Weapon.
 * @param offsetY - The vertical offset from the Sprites position to be applied to the Weapon.
 */

var ScatterBullet = function (game, sprite) {
  this.weapon = game.add.weapon(128, 'laserRed');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 600;
  this.weapon.fireRate = 90;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, 0, -sprite.height - 10);
  this.weapon.multiFire = true;

  this.powerLevel = 1;
  this.weapon.bullets.setAll('damage', 0.25);
  this.weapon.bullets.setAll('alpha', 0.5);

  return this;
}

ScatterBullet.prototype.shoot = function () {
  //Reset the fire angle to up
  this.weapon.fireAngle = -90;
  if (this.powerLevel == 1) {
    this.weapon.fire(null, null, null, -10);
    this.weapon.fire(null, null, null, 10);
  }
  else if (this.powerLevel == 2) {
    this.weapon.fireAngle = -99;
    this.weapon.fire(null, null, null, -15);
    this.weapon.fireAngle = -93;
    this.weapon.fire(null, null, null, -5);
    this.weapon.fireAngle = -87;
    this.weapon.fire(null, null, null, 5);
    this.weapon.fireAngle = -81;
    this.weapon.fire(null, null, null, 15);
  }

  else if (this.powerLevel == 3) {
    this.weapon.fireAngle = -105;
    this.weapon.fire(null, null, null, -25);
    this.weapon.fireAngle = -99;
    this.weapon.fire(null, null, null, -15);
    this.weapon.fireAngle = -93;
    this.weapon.fire(null, null, null, -5);
    this.weapon.fireAngle = -87;
    this.weapon.fire(null, null, null, 5);
    this.weapon.fireAngle = -81;
    this.weapon.fire(null, null, null, 15);
    this.weapon.fireAngle = -75;
    this.weapon.fire(null, null, null, 25);
  }
}

var Beam = function (game, sprite) {
  this.weapon = game.add.weapon(256, 'laserGreen');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 1000;
  this.weapon.fireRate = 0;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, 0, -sprite.height - 10);
  this.weapon.multiFire = true;
  this.powerLevel = 1;

  this.weapon.bullets.setAll('damage', 0.2);
  this.weapon.bullets.setAll('alpha', 0.5);

  return this;
}

Beam.prototype.shoot = function () {
  if (this.powerLevel == 1) {
    this.weapon.fire();
  }

  else if (this.powerLevel == 2) {
    this.weapon.fire(null, null, null, -3);
    this.weapon.fire(null, null, null, 3);
  }

  else if (this.powerLevel == 3) {
    this.weapon.fire(null, null, null, -6);
    this.weapon.fire(null, null, null, 0);
    this.weapon.fire(null, null, null, 6);
  }
}

var SplashBullet = function (game, sprite) {
  this.weapon = game.add.weapon(128, 'laserBlue');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletAngleVariance = 30;
  this.weapon.bulletSpeedVariance = 50;
  this.weapon.bulletSpeed = 600;
  this.weapon.fireRate = 50;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, 0, -sprite.height - 10);
  this.weapon.multiFire = true;
  this.powerLevel = 1;

  this.weapon.bullets.setAll('damage', 0.5);
  this.weapon.bullets.setAll('alpha', 0.5);

  return this;
}

SplashBullet.prototype.shoot = function () {
  if (this.powerLevel == 1) {
    this.weapon.fire();
  }

  else if (this.powerLevel == 2) {
    this.weapon.fire(null, null, null, -5);
    this.weapon.fire(null, null, null, 5);
  }

  else if (this.powerLevel == 3) {
    this.weapon.fire(null, null, null, -10);
    this.weapon.fire(null, null, null, 0);
    this.weapon.fire(null, null, null, 10);
  }
}

//Enemy weapons1
var Missile = function(game){
  this.weapon = game.add.weapon(5, 'spaceMissile');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 200;

  this.weapon.fireRate = 800;
  this.weapon.multiFire = true;

  return this;
}

Missile.prototype.shoot = function (source) {
  var x = source.x - 15;
  var y = source.y;
  var playerX = player.body.x;
  var playerY = player.body.y;
  this.weapon.fire(new Phaser.Point(x, y) , playerX , playerY);
  x += 30;
  this.weapon.fire(new Phaser.Point(x, y) , playerX , playerY);
}

//Enemy weapons2
var ThreeARow = function(game){
  this.weapon = game.add.weapon(30, 'bullet6');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  this.weapon.bulletSpeed = 200;
  this.weapon.bulletAngleVariance = 5;
  this.weapon.fireRate = 800;
  this.weapon.multiFire = true;

  return this;
}

ThreeARow.prototype.shoot = function(source) {
  var x = source.x;
  var y = source.y;
  this.weapon.fireAngle = 100;
  this.weapon.fire(new Phaser.Point(x, y));
  this.weapon.fireAngle = 90;
  this.weapon.fire(new Phaser.Point(x, y));
  this.weapon.fireAngle = 80;
  this.weapon.fire(new Phaser.Point(x, y));
}

//Enemy weapons3
var EnemyBullet3 = function(game){
  this.weapon = game.add.weapon(10, 'bullet3');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 500;

  this.weapon.fireRate = 70;
  this.weapon.multiFire = true;

  return this;
}

EnemyBullet3.prototype.shoot = function (source) {
  var x = source.x - 15;
  var y = source.y;
  var playerX = player.body.x;
  var playerY = player.body.y;
  this.weapon.fire(new Phaser.Point(x, y) , playerX , playerY);
  x += 30;
  this.weapon.fire(new Phaser.Point(x, y) , playerX , playerY);
}

//Enemy weapons4
var EnemyBullet4 = function(game){
  this.weapon = game.add.weapon(10, 'bullet4');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 500;

  this.weapon.fireRate = 70;
  this.weapon.multiFire = true;

  return this;
}

EnemyBullet4.prototype.shoot = function (source) {
  var x = source.x - 15;
  var y = source.y;
  var playerX = player.body.x;
  var playerY = player.body.y;
  this.weapon.fire(new Phaser.Point(x, y) , playerX , playerY);
  x += 30;
  this.weapon.fire(new Phaser.Point(x, y) , playerX , playerY);
}
