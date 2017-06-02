var EnemyType = {};

EnemyType.Trash = function (game) {
  Phaser.Group.call(this, game, game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);

  this.enemySpeed = 200;
  for (var i = 0; i < 10; i++) {
    this.add(new Enemy(game, 'enemy3'), true);
  }
  return this;
}

//EnemyType inherited from Phaser.Group
EnemyType.Trash.prototype = Object.create(Phaser.Group.prototype);
EnemyType.Trash.prototype.constructor = EnemyType.Trash;

EnemyType.Trash.prototype.launch = function() {
  var enemy = this.getFirstExists(false);
  var halfWidth = enemy.width / 2;
  var x = this.game.rnd.integerInRange(0 + halfWidth, this.game.width - halfWidth);
  enemy.launch(x, 0, 90, this.enemySpeed, 0);
}
