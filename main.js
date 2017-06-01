var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
  game.load.image('player', 'assets/player.png');
  game.load.image('background', 'assets/starBackground.png');
}

var background;
var player;
var cursors;
function create() {
  background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
  background.autoScroll(0, -30);

  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(game.world.width / 2 - 50, game.world.height - 76, 'player');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = -300;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 300;
  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -300;
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = 300;
  }
}
