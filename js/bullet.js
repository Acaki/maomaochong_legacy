var Bullet = function (game, key) {
  //Call constructor of Phaser.Sprite to initialize this
  Phaser.Sprite.call(this, game, 0, 0, key);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;

  this.tracking = false;
  this.scaleSpeed = 0;
}

//Bullet inherited from Phaser.sprite
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function
