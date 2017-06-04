var Weapon = {};

Weapon.SingleBullet = function (game) {
  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.powerLevel = 1;
  this.nextFire = 0;
  this.bulletSpeed = 500;
  this.fireRate = 100;
  for (var i = 0; i < 128; i++) {
    this.add(new Bullet(game, 'laserRed', 0.2), true);
  }
  return this;
}

//Weapon inherited from Phaser.Group
Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {
  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x, y;
  if (this.powerLevel == 1) {
    x = source.x + source.halfWidth - 10;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
  }

  //Two columns of bullets
  else if (this.powerLevel == 2) {
    x = source.x + source.halfWidth - 30;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -105, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -75, this.bulletSpeed, 0);
  }

  else if (this.powerLevel == 3) {
    x = source.x + source.halfWidth - 50;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -120, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -105, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -75, this.bulletSpeed, 0);
    x += 20;
    this.getFirstExists(false).fire(x, y, -60, this.bulletSpeed, 0);
  }

  this.nextFire = this.game.time.time + this.fireRate;
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
