var EnemyType2 = {};

EnemyType2.Trash = function (game) {
  Phaser.Group.call(this, game, game.world, 'Trash enemy2', false, true, Phaser.Physics.ARCADE);

  //Add 10 trash enemies into this group
  for (var i = 0; i < 10; i++) {
    this.add(new Enemy(game, 'enemy4' , 1 ), true);
  }
  //this.health = 200;
  return this;
}

//EnemyType2 inherited from Phaser.Group
EnemyType2.Trash.prototype = Object.create(Phaser.Group.prototype);
EnemyType2.Trash.prototype.constructor = EnemyType2.Trash;

EnemyType2.Trash.prototype.launch = function() {

  var enemy2 = this.getFirstExists(false);
  enemy2.body.drag.x = 100;
  //Prevent sprite being cut off on the edges
  var halfWidth2 = enemy2.width / 2;
  var x2 = this.game.rnd.integerInRange(0 + halfWidth2, this.game.width - halfWidth2);
  var angle2 = this.game.rnd.integerInRange(45, 135);
  var speed2 = game.rnd.between(120,200);

  //Launch the enemy starting on top of the screen
  enemy2.launch(x2, 0, angle2, speed2, 0);
}
