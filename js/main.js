var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
  game.load.image('player', 'assets/player.png');
  game.load.image('background', 'assets/starBackground.png');
  game.load.image('laserRed', 'assets/laserRed.png');
}

var background;
var player;
var cursors;
var weapons = [];
var currentWeapon;
function create() {
  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
  //Make the background slowly scroll up
  background.autoScroll(0, -30);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  //Add the player plane on the middle bottom of the screen
  player = game.add.sprite(game.world.width / 2 - 50, game.world.height - 76, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  cursors = game.input.keyboard.createCursorKeys();

  weapons.push(new Weapon.SingleBullet(this.game));
  currentWeapon = 0;

  //Add key listener for 'shift'
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
}

function keyboardHandler() {
  player.body.velocity.set(0, 0);
  //Move the plane left
  if (cursors.left.isDown) {
    player.body.velocity.x = -300;
  }
  //Move the plane right
  else if (cursors.right.isDown) {
    player.body.velocity.x = 300;
  }
  //Up
  if (cursors.up.isDown) {
    player.body.velocity.y = -300;
  }
  //Down
  else if (cursors.down.isDown) {
    player.body.velocity.y = 300;
  }

  //Check if 'shift' is being pressed
  if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
    //Slow down the move speed for each direction
    if (player.body.velocity.x > 0) {
      player.body.velocity.x = 150;
    }
    if (player.body.velocity.x < 0) {
      player.body.velocity.x = -150;
    }
    if (player.body.velocity.y > 0) {
      player.body.velocity.y = 150;
    }
    if (player.body.velocity.y < 0) {
      player.body.velocity.y = -150;
    }
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    weapons[currentWeapon].fire(player);
  }
}

function update() {
  keyboardHandler();
}
