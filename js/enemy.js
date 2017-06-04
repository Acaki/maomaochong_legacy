var Enemy = function(game, key , health , level) {
  //Call constructor of Phaser.Sprite to initialize this
  //alert(level)
  Phaser.Sprite.call(this, game, 0, 0, key);

  //Set the origin point of the sprite to its center
  this.anchor.set(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  //Record whether sprite is processed by the update() function
  this.exists = false;
  this.maxHealth = health;
  this.currentHealth = health;
  //Enemy Level
  this.eneLevel = level;
}
//Enemy inherited from Phaser.sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.launch = function(x, y, angle, speed, xAccel) {
  //horizontal acceleration value
  xAccel = xAccel || 0;

  //Reset the Enemy, which moves the Enemy to the given x/y corrdinates and
  //sets 'exists' to true.
  this.reset(x, y);

  //Set Enemy's velocity that is calculated from the given angle and speed
  this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);
  this.body.acceleration.x = xAccel;
}

Enemy.prototype.resetHealth = function() {
  this.currentHealth = this.maxHealth;
}

Enemy.prototype.isDead = function(bullet, enemy)
{
  enemy.currentHealth -= bullet.damage;
  bullet.kill();
  if(enemy.currentHealth <= 0)
  {
    enemy.resetHealth();
    return true;
  }
  else {
    return false;
  }
}


