var PowerUp = function(game, key) {
  //Call constructor of Phaser.Sprite to initialize this
  Phaser.Sprite.call(this, game, 0, 0, key);

  game.physics.arcade.enable(this);
  this.anchor.set(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  return this;
}

//PowerUp inherited from Phaser.sprite
PowerUp.prototype = Object.create(Phaser.Sprite.prototype);
PowerUp.prototype.constructor = PowerUp;

PowerUp.prototype.drop = function() {
  //Add the sprite to the game
  game.add.existing(this);
  
  var halfWidth = this.body.halfWidth;
  var x = this.game.rnd.integerInRange(0 + halfWidth, this.game.width - halfWidth);
  var angle = this.game.rnd.integerInRange(45, 135);
  var speed = game.rnd.between(120,200);
  //Reset the PowerUp, which moves the PowerUp to the given x/y corrdinates and
  //sets 'exists' to true.
  this.reset(x, 0);

  //Set PowerUp's velocity that is calculated from the given angle and speed
  game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
}
