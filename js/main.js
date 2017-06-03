var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
  game.load.image('player', 'assets/player.png');
  game.load.image('background', 'assets/starBackground.png');
  game.load.image('laserRed', 'assets/laserRed.png');
  game.load.image('enemy3','assets/enemy3.png');
  game.load.image('enemy4','assets/enemy4.png');
  game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
}

var background;
var player;
var damageAmount;
var cursors;
var weapons = [];
var currentWeapon = 0;
var explosions;

var enemies;
var enemies2;
var Hp;
function create() {
  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
  //Make the background slowly scroll up
  background.autoScroll(0, -30);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  //Add the player plane on the middle bottom of the screen
  player = game.add.sprite(game.world.width / 2, game.world.height, 'player');
  player.damageAmount = 1;
  player.anchor.set(0.5, 1.0);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  weapons.push(new Weapon.SingleBullet(this.game));

  cursors = game.input.keyboard.createCursorKeys();
  //Add key listener for 'shift'
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

  //Create a group of trash enemy
  enemies = new EnemyType.Trash(this.game);
  enemies2 = new EnemyType.Trash2(this.game);
  //Spawn an enemy every 0.5 ~ 3 seconds
  game.time.events.loop(
    game.rnd.integerInRange(500, 1000),
    function() { enemies.launch(); enemies2.launch();}
  );

  explosions = new Explosion(this.game);
}

var currentAngle;
function keyboardHandler() {
  player.body.velocity.set(0, 0);
  //Move the plane left
  if (cursors.left.isDown) {
    game.physics.arcade.velocityFromAngle(-180, 300, player.body.velocity);
    currentAngle = -180;
  }
  //Move the plane right
  if (cursors.right.isDown) {
    game.physics.arcade.velocityFromAngle(0, 300, player.body.velocity);
    currentAngle = 0;
  }
  //Up
  if (cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-90, 300, player.body.velocity);
    currentAngle = -90;
  }
  //Down
  if (cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(90, 300, player.body.velocity);
    currentAngle = 90;
  }

  //Up-left
  if (cursors.left.isDown && cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-135, 300, player.body.velocity);
    currentAngle = -135;
  }

  //Up-right
  if (cursors.right.isDown && cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(-45, 300, player.body.velocity);
    currentAngle = -45;
  }

  //Down-left
  if (cursors.left.isDown && cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(135, 300, player.body.velocity);
    currentAngle = 135;
  }

  //Down-right
  if (cursors.right.isDown && cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(45, 300, player.body.velocity);
    currentAngle = 45;
  }

  //Check if 'shift' is being pressed
  if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
    //Slow down the move speed for each direction
    game.physics.arcade.velocityFromAngle(currentAngle, 200, player.body.velocity);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    weapons[currentWeapon].fire(player.body);
  }
}

function damageEnemy(bullet, enemy) {
  bullet.kill();
  //alert(enemy.Hp)
  enemy.Hp -= player.damageAmount;
  if(enemy.Hp <= 0)
  {
    enemy.kill();
    explosions.display(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
  }
}

function update() {
  keyboardHandler();
  game.physics.arcade.overlap(
    weapons[currentWeapon],
    enemies,
    damageEnemy,
    null,
    this
  );
  game.physics.arcade.overlap(
    weapons[currentWeapon],
    enemies2,
    damageEnemy,
    null,
    this
  );
}
