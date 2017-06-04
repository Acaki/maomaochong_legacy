var Weapon = {};

/*
 * @param offsetX - The horizontal offset from the Sprites position to be applied to the Weapon.
 * @param offsetY - The vertical offset from the Sprites position to be applied to the Weapon.
 */
Weapon.SingleBullet = function (game, sprite, offsetX, offsetY) {
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

  return this;
}

Weapon.SingleBullet.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.shoot = function (source) {
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

Weapon.Beam = function (game) {
  Phaser.Group.call(this, game, game.world, 'Beam', false, true, Phaser.Physics.ARCADE);

  this.powerLevel = 1;
  this.nextFire = 0;
  this.bulletSpeed = 1000;
  this.fireRate = 0;
  for (var i = 0; i < 256; i++) {
    this.add(new Bullet(game, 'laserGreen', 0.2), true);
  }
  return this;
}

//Weapon inherited from Phaser.Group
Weapon.Beam.prototype = Object.create(Phaser.Group.prototype);
Weapon.Beam.prototype.constructor = Weapon.Beam;

Weapon.Beam.prototype.fire = function (source) {
  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x, y;
  if (this.powerLevel == 1) {
    x = source.x + source.halfWidth;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
  }

  //Two columns of bullets
  else if (this.powerLevel == 2) {
    x = source.x + source.halfWidth - 3;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 6;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
  }

  else if (this.powerLevel == 3) {
    x = source.x + source.halfWidth - 6;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 6;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 6;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
  }

  this.nextFire = this.game.time.time + this.fireRate;
}

//Enemy weapons
Weapon.EnemyBullet = function(game){
  Phaser.Group.call(this, game, game.world, 'EnemyBullet1', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 300;
  this.fireRate = 70;
  for (var i = 0; i < 128; i++) {
    this.add(new Bullet(game, 'bullet1', 1), true);
  }
  return this;
}
Weapon.EnemyBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.EnemyBullet.prototype.constructor = Weapon.EnemyBullet;

Weapon.EnemyBullet.prototype.fire = function (source) {
  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x, y;
  x = source.x ;
  y = source.y ;
  this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0);

  this.nextFire = this.game.time.time + this.fireRate;
}

//Enemy weapons2
Weapon.EnemyBullet2 = function(game){
  Phaser.Group.call(this, game, game.world, 'EnemyBullet2', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 500;
  this.fireRate = 70;
  for (var i = 0; i < 128; i++) {
    this.add(new Bullet(game, 'bullet2', 1), true);
  }
  return this;
}
Weapon.EnemyBullet2.prototype = Object.create(Phaser.Group.prototype);
Weapon.EnemyBullet2.prototype.constructor = Weapon.EnemyBullet2;

Weapon.EnemyBullet2.prototype.fire = function (source) {
  if (this.game.time.time < this.nextFire) {
    return;
  }
  var x, y;
  x = source.x ;
  y = source.y ;
  this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0);
  x += 30;
  this.getFirstExists(false).fire(x, y, 90, this.bulletSpeed, 0);

  this.nextFire = this.game.time.time + this.fireRate;
}
