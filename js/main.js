var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
  game.load.image('player', 'assets/player.png');
  game.load.image('background', 'assets/starBackground.png');
  game.load.image('laserRed', 'assets/laserRed.png');
  game.load.image('laserRedPowerUp', 'assets/laserRedShot.png');
  game.load.image('laserGreen', 'assets/laserGreen.png');
  game.load.image('laserGreenPowerUp', 'assets/laserGreenShot.png');
  game.load.image('enemy3','assets/enemy3.png');
  game.load.image('enemy4','assets/enemy4.png');
  game.load.image('bullet1','assets/bullet1.png');
  game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);

}

var background;
var player;
var cursors;
var weapons = [];
var currentWeapon = 0;
var enemyWeapons = [];
var explosions;
var powerUp;

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
  //Reduce the size of the player plane;
  player.scale.set(0.5);
  player.anchor.set(0.5, 1.0);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  weapons.push(new Weapon.SingleBullet(game));
  enemyWeapons.push(new Weapon2.EnemyBullet(this.game));
  cursors = game.input.keyboard.createCursorKeys();
  //Add key listener for 'shift'
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

  //Create a group of trash enemy
  enemies = new EnemyType.Trash(game);
  enemies2 = new EnemyType.Trash2(game);
  //Spawn an enemy every 0.5 ~ 3 seconds
  game.time.events.loop(
    game.rnd.integerInRange(500, 1000),
    function() { enemies.launch(); enemies2.launch();}
  );

  explosions = new Explosion(game);

  powerUp = new PowerUpGroup(game);
  //Spawn a power up item every 5 ~ 10 seconds
  game.time.events.loop(
    game.rnd.integerInRange(5000, 10000),
    function() { powerUp.drop(); }
  );
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
  var isDead = enemy.isDead(bullet, enemy)
  if(isDead)
  {
    enemy.kill();
    explosions.display(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
  }
}

function powerUpWeapon(player, powerUp) {
  powerUp.kill();
  //Increase power level of current weapon
  if (currentWeapon == powerUp.weaponType && weapons[currentWeapon].powerLevel < 3) {
    weapons[currentWeapon].powerLevel++;
  }
  //Switch the weapon
  else if (currentWeapon != powerUp.weaponType) {
    currentWeapon = powerUp.weaponType;
  }
}
function enemyAttack(enemy){
    enemyWeapons[currentWeapon].fire(enemy.body);
}
function update() {
  keyboardHandler();
  game.physics.arcade.overlap(
    weapons[currentWeapon],
    enemies,
    damageEnemy,
    enemyAttack,
    null,
    this
  );
  game.physics.arcade.overlap(
    weapons[currentWeapon],
    enemies2,
    damageEnemy,
    enemyAttack,
    null,
    this
  );
  game.physics.arcade.overlap(
    player,
    powerUp,
    powerUpWeapon,
    null,
    this
  );
}
