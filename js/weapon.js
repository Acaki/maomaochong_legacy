var Weapon = {};

Weapon.SingleBullet = function (game) {
  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.bulletSpeed = 600;
  this.fireRate = 100;
  for (var i = 0; i < 64; i++) {
    this.add(new Bullet(game, 'laserRed'), true);
  }
  return this;
}

//Weapon inherited from Phaser.Group
Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {
  var x = source.x + 10;
  var y = source.y + 10;

  //Get a inactive bullet from the group
  var bullet = this.getFirstExists(false);
  bullet.fire(x, y, 0, this.bulletSpeed, 0);
}
