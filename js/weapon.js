var Weapon = {};

Weapon.SingleBullet = function (game) {
  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.powerLevel = 1;
  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 100;
  for (var i = 0; i < 128; i++) {
    this.add(new Bullet(game, 'laserRed', 1), true);
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
    x = source.x + source.halfWidth;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
  }

  //Two columns of bullets
  else if (this.powerLevel == 2) {
    x = source.x + source.halfWidth - 15;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 30;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
  }

  else if (this.powerLevel == 3) {
    x = source.x + source.halfWidth - 10;
    y = source.y - source.halfHeight;

    this.getFirstExists(false).fire(x, y, -105, this.bulletSpeed, 0);
    x += 10;
    this.getFirstExists(false).fire(x, y, -90, this.bulletSpeed, 0);
    x += 10;
    this.getFirstExists(false).fire(x, y, -75, this.bulletSpeed, 0);
  }

  this.nextFire = this.game.time.time + this.fireRate;
}

//Enemy weapons
var Weapon2 = {};
Weapon2.EnemyBullet = function(game){
  Phaser.Group.call(this, game, game.world, 'EnemyBullet', false, true, Phaser.Physics.ARCADE);

  //this.powerLevel = 0;
  this.nextFire = 0;
  this.bulletSpeed = 300;
  this.fireRate = 70;
  for (var i = 0; i < 128; i++) {
    this.add(new Bullet(game, 'bullet1', 1), true);
  }
  return this;
}
Weapon2.EnemyBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon2.EnemyBullet.prototype.constructor = Weapon2.EnemyBullet;

Weapon2.EnemyBullet.prototype.fire = function (source) {
  if (this.game.time.time < this.nextFire) {
    return;
  }

  var x1, y1;
    x1 = source.x ;
    y1 = source.y ;
    this.getFirstExists(false).fire(x1, y1, 90, this.bulletSpeed, 0);

  this.nextFire = this.game.time.time + this.fireRate;
}

