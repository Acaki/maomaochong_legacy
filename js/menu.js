var menuState = {
    preload: function() {
    game.load.image('space', 'assets/starfield.png', 138, 15);
    game.load.image('logo', 'assets/phaser2.png');
    },

    create: function () {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
      game.add.tileSprite(0, 0, 600, 800, 'space');

          var sprite = game.add.sprite(game.world.centerX, game.world.centerY-50, 'logo');

          sprite.anchor.setTo(0.5, 0.5);
          sprite.alpha = 0;
          //  Create our tween. This will fade the sprite to alpha 1 over the duration of 2 seconds
          var tween = game.add.tween(sprite).to( { alpha: 1 }, 2000, "Linear", true);

          var startLabelUp = game.add.text(game.world.centerX, game.world.height - 120, 'Press the Enter key to start the game', { font: '36px Arial', fill: '#ff0000' });
          startLabelUp.anchor.setTo(0.5, 0.5);
          game.add.tween(startLabelUp).to({alpha: 0}, 500).to({alpha: 1}, 3000).loop().start();
          var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
          enterKey.onDown.addOnce(this.startplay, this);
    },

    startplay: function(){
      game.state.start('main');
    }
};
