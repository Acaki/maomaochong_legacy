var Enemy = {};

Enemy.Trash = function (game) {
  Phaser.Group.call(this, game, game.world, 'Trash', false, true, Phaser.Physics.ARCADE);

  return this;
}

//Enemy inherited from Phaser.Group
Enemy.Trash.prototype = Object.create(Phaser.Group.prototype);
Enemy.Trash.prototype.constructor = Enemy.Trash;
