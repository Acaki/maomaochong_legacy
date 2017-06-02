var EnemyType = {};

EnemyType.Trash = function (game) {
  Phaser.Group.call(this, game, game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);
    
  //Add 10 trash enemies into this group
  for (var i = 0; i < 10; i++) {
    this.add(new Enemy(game, 'enemy3'), true);
    this.add(new Enemy(game, 'enemy4'), true);
  }
  return this;
}

//EnemyType inherited from Phaser.Group
EnemyType.Trash.prototype = Object.create(Phaser.Group.prototype);
EnemyType.Trash.prototype.constructor = EnemyType.Trash;

EnemyType.Trash.prototype.launch = function() {
  var enemy = this.getFirstExists(false);
  enemy.body.drag.x = 100;
  //Prevent sprite being cut off on the edges
  var halfWidth = enemy.width / 2;
  var x = this.game.rnd.integerInRange(0 + halfWidth, this.game.width - halfWidth);
  var angle = this.game.rnd.integerInRange(45, 135);
  var speed = game.rnd.between(120,200);
 
  //Launch the enemy starting on top of the screen
  enemy.launch(x, 0, angle, speed, 0);
}
