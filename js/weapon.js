/*
 * @param offsetX - The horizontal offset from the Sprites position to be applied to the Weapon.
 * @param offsetY - The vertical offset from the Sprites position to be applied to the Weapon.
 */

var ScatterBullet = function (game, sprite, offsetX, offsetY) {
  this.weapon = game.add.weapon(128, 'laserRed');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 600;
  this.weapon.fireRate = 90;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, offsetX, offsetY);
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

var Beam = function (game, sprite, offsetX, offsetY) {
  this.weapon = game.add.weapon(256, 'laserGreen');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = 1000;
  this.weapon.fireRate = 0;
  //Tell the bullet to track the sprite location
  this.weapon.trackSprite(sprite, offsetX, offsetY);
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

//Enemy weapons
var EnemyBullet = function(game){
  this.weapon = game.add.weapon(128, 'bullet1');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = -300;
  this.weapon.fireRate = 70;
  this.weapon.multiFire = true;
  this.weapon.bullets.setAll('damage', 1);

  return this;
}

EnemyBullet.prototype.shoot = function(source) {
  this.weapon.fire(source);
}

//Enemy weapons2
var EnemyBullet2 = function(game){
  this.weapon = game.add.weapon(128, 'bullet2');

  this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  //Rotate the bullet image to face up
  this.weapon.bulletAngleOffset = -90;
  this.weapon.bulletSpeed = -500;
  this.weapon.fireRate = 70;
  this.weapon.multiFire = true;
  this.weapon.bullets.setAll('damage', 1);

  return this;
}
EnemyBullet2.prototype = Object.create(Phaser.Group.prototype);
EnemyBullet2.prototype.constructor = EnemyBullet2;

EnemyBullet2.prototype.shoot = function (source) {
  var x = source.x - 15;
  var y = source.y;

  this.weapon.fire(new Phaser.Point(x, y));
  x += 30;
  this.weapon.fire(new Phaser.Point(x, y));
}
