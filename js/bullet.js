var Bullet = function(game, key) {
  //Call constructor of Phaser.Sprite to initialize this
  Phaser.Sprite.call(this, game, 0, 0, key);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;
}

//Bullet inherited from Phaser.sprite
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function(x, y, angle, speed, xAccel) {
  //horizontal acceleration value
  xAccel = xAccel || 0;

  //Reset the bullet, which moves the bullet to the given x/y corrdinates and
  //sets 'exists' to true.
  this.reset(x, y);
  this.scale.set(1);

  //Set bullet's velocity that is calculated from the given angle and speed
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  this.angle = angle;
  this.body.acceleration.x = xAccel;
}
