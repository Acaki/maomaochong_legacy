var game = new Phaser.Game(600, 800, Phaser.AUTO, '', {preload: preload, create: create, update: update});

function preload() {
  game.load.image('player', 'assets/player.png');
}

var player;
function create() {
  player = game.add.sprite(game.world.width / 2 - 50, game.world.height - 76, 'player');
}

function update() {

}
