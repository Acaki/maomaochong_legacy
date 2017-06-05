var EnemyType = {};

EnemyType.Trash = function (game) {
  Phaser.Group.call(this, game, game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);

  this.game = game;
  //Add 10 trash enemies into this group
  for (var i = 0; i < 40; i++) {
    this.add(new Enemy(game, 'enemy3', 5, 0), true);
  }
  return this;
}

//EnemyType inherited from Phaser.Group
EnemyType.Trash.prototype = Object.create(Phaser.Group.prototype);
EnemyType.Trash.prototype.constructor = EnemyType.Trash;

EnemyType.Trash.prototype.launch = function(x, y, angle, speed, xAccel, yAccel) {
  var enemy = this.getFirstExists(false);

  //Prevent sprite being cut off on the edges
  var halfWidth = enemy.body.halfWidth;
  if (x === undefined) { x = this.game.rnd.integerInRange(0 + halfWidth, this.game.width - halfWidth) }
  if (y === undefined) { y = 0; }
  if (angle === undefined) { angle = this.game.rnd.integerInRange(75, 105); }
  if (speed === undefined) { speed = game.rnd.between(120,200); }
  if (xAccel === undefined) { xAccel = 0; }
  if (yAccel === undefined) { yAccel = 0; }

  enemy.launch(x, y, angle, speed, xAccel, yAccel);
}

EnemyType.Trash.prototype.launchTween = function(x, y, properties, duration) {
  var enemy = this.getFirstExists(false);
  enemy.launchTween(x, y, properties, duration);
}

EnemyType.Trash2 = function (game) {
  Phaser.Group.call(this, game, game.world, 'Trash Enemy2', false, true, Phaser.Physics.ARCADE);

  this.game = game;
  //Add 10 trash enemies into this group
  for (var i = 0; i < 40; i++) {
    this.add(new Enemy(game, 'enemy4', 2, 1), true);
  }
  return this;
}

EnemyType.Trash2.prototype = Object.create(Phaser.Group.prototype);
EnemyType.Trash2.prototype.constructor = EnemyType.Trash2;

EnemyType.Trash2.prototype.launch = function(x, y, angle, speed, xAccel, yAccel) {
  var enemy = this.getFirstExists(false);
  //Prevent sprite being cut off on the edges
  var halfWidth = enemy.body.halfWidth;
  if (x === undefined) { x = this.game.rnd.integerInRange(0 + halfWidth, this.game.width - halfWidth) }
  if (y === undefined) { y = 0; }
  if (angle === undefined) { angle = this.game.rnd.integerInRange(75, 105); }
  if (speed === undefined) { speed = game.rnd.between(200,250); }
  if (xAccel === undefined) { xAccel = 0; }
  if (yAccel === undefined) { yAccel = 0; }

  enemy.launch(x, y, angle, speed, xAccel, yAccel);
}

EnemyType.Trash2.prototype.launchTween = function(x, y, properties, duration) {
  var enemy = this.getFirstExists(false);
  enemy.launchTween(x, y, properties, duration);
}
