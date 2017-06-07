// MainState
var background;
var fightMusic;
var playerShoot;
var enemyDie;

var player;
var cursors;
var weapons = [];
var currentWeapon = 0;
var enemyGroups = {};
var enemyBulletGroups = [];
var explosions;
var powerUp;

var invincible = false;

var MainState = function(game){};
MainState.prototype = {

  preload: function() {
    game.load.image('player', 'assets/player.png');
    game.load.image('playerLeft', 'assets/playerLeft.png');
    game.load.image('playerRight', 'assets/playerRight.png');

    game.load.image('background', 'assets/backgrounds/purple.png');

    //Player bullet and power up images
    game.load.image('laserRed', 'assets/bullets/laserRed02.png');
    game.load.image('powerupRed_star', 'assets/power-ups/powerupRed_star.png');
    game.load.image('laserGreen', 'assets/bullets/laserGreen10.png');
    game.load.image('powerupGreen_star', 'assets/power-ups/powerupGreen_star.png');
    game.load.image('laserBlue', 'assets/bullets/laserBlue13.png');
    game.load.image('powerupBlue_star', 'assets/power-ups/powerupBlue_star.png');
    game.load.image('spaceRocketPart', 'assets/bullets/spaceRocketParts_015.png');
    game.load.image('tinyBullet', 'assets/bullets/bullet5.png');

    //Enemy object images
    game.load.image('enemyShip', 'assets/enemies/enemyShip.png');
    game.load.image('enemyUFO', 'assets/enemies/enemyUFO.png');
    game.load.image('meteorBig', 'assets/enemies/meteorBig.png');
    game.load.image('meteorSmall', 'assets/enemies/meteorSmall.png');
    game.load.image('enemyBlue','assets/enemies/enemyBlue2.png');
    game.load.image('enemyGreen', 'assets/enemies/enemyGreen5.png');
    game.load.image('enemyBlack', 'assets/enemies/enemyBlack1.png');
    game.load.image('enemyRed', 'assets/enemies/enemyRed4.png');
    game.load.image('spaceBuilding', 'assets/enemies/spaceBuilding_014.png');
    game.load.image('spaceStation', 'assets/enemies/spaceStation_021.png');

    //Enemy bullet images
    game.load.image('spaceMissile', 'assets/bullets/spaceMissiles_004.png');
    game.load.image('star','assets/bullets/star3.png');
    game.load.image('laserGreen16','assets/bullets/laserGreen16.png');
    game.load.image('laserBlue02', 'assets/bullets/laserBlue02.png');
    game.load.image('laserRed08', 'assets/bullets/laserRed08.png');

    game.load.spritesheet('explosion', 'assets/explosion.png', 128, 128);
    game.load.audio('fight' , 'assets/fight.mp3');
    game.load.audio('playershoot' , 'assets/blaster.mp3');
    game.load.audio('boom' , 'assets/explosion.mp3');
    //game.load.audio('enemyDie' , 'alien_death1.wav');
  },

  create: function() {
    background = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'background');
    //Make the background slowly scroll up
    background.autoScroll(0, -30);
    //Audio create
    //battle BGM
    fightMusic = game.add.audio('fight');
    fightMusic.volume = 0.2;
    fightMusic.play();
    //player shooting
    playerShoot = game.add.audio('playershoot');
    playerShoot.volume = 0.05;

    enemyDie = game.add.audio('boom');
    enemyDie.volume = 0.1;


    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Add the player plane on the middle bottom of the screen
    player = game.add.sprite(game.world.width / 2, game.world.height, 'player');
    //Reduce the size of the player plane;
    player.scale.set(0.5);
    player.anchor.set(0.5, 1.0);
    game.physics.arcade.enable(player);
    player.body.setCircle(7, player.width - 10, player.height - 10);
    player.body.collideWorldBounds = true;

    //Player weapons list
    weapons.push(new ScatterBullet(game, player));
    weapons.push(new Beam(game, player));
    weapons.push(new SplashBullet(game, player));

    //Enemy group creation
    enemyGroups.trash = game.add.group(game.world, 'Trash Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      var enemyWeapon = new Missile(game);
      enemyGroups.trash.add(new Enemy(game, 'enemyUFO', 1, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.medium = game.add.group(game.world, 'Trash Enemy2', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 20; i++) {
      var enemyWeapon = new ThreeARow(game);
      enemyGroups.medium.add(new Enemy(game, 'enemyBlue', 10, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.meteorSmall = game.add.group(game.world, 'Small Meteor', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      enemyGroups.meteorSmall.add(new Enemy(game, 'meteorSmall', 2), true);
    }

    enemyGroups.meteorBig = game.add.group(game.world, 'Big Meteor', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      enemyGroups.meteorBig.add(new Enemy(game, 'meteorBig', 5), true);
    }

    enemyGroups.green = game.add.group(game.world, 'Green Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 10; i++) {
      var enemyWeapon = new VariedAngle(game);
      enemyGroups.green.add(new Enemy(game, 'enemyGreen', 10, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.spaceBuilding = game.add.group(game.world, 'Space Building', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 30; i++) {
      enemyGroups.spaceBuilding.add(new Enemy(game, 'spaceBuilding', 0.5), true);
    }

    enemyGroups.spaceStation = game.add.group(game.world, 'Space Station', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 2; i ++) {
      var enemyWeapon = [];
      enemyWeapon.push(new RingScattered(game));
      enemyWeapon.push(new VariedAngle(game));
      enemyWeapon.push(new Missile(game));
      for (var j = 0; j < 3; j++) {
        enemyBulletGroups.push(enemyWeapon[i]);
      }
      enemyGroups.spaceStation.add(new Enemy(game, 'spaceStation', 100, enemyWeapon), true);
    }

    enemyGroups.black = game.add.group(game.world, 'Black Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 3; i++) {
      var enemyWeapon = new Circle(game);
      enemyGroups.black.add(new Enemy(game, 'enemyBlack', 20, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    enemyGroups.red = game.add.group(game.world, 'Red Enemy', false, true, Phaser.Physics.ARCADE);
    for (var i = 0; i < 5; i++) {
      var enemyWeapon = new RandomSplash(game);
      enemyGroups.red.add(new Enemy(game, 'enemyRed', 15, enemyWeapon), true);
      enemyBulletGroups.push(enemyWeapon.weapon.bullets);
    }

    cursors = game.input.keyboard.createCursorKeys();
    //Add key listener for 'shift'
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SHIFT]);
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    explosions = new Explosion(game);
    powerUp = new PowerUpGroup(game);

    stageStart();
  },

  resetTint: function(enemy) {
    enemy.tint = 0xffffff;
  },

  damageEnemy: function(bullet, enemy) {
    enemy.damage(bullet.damage);
    enemy.tint = 0xff0000;
    game.time.events.add(15, this.resetTint, this, enemy);
    bullet.kill();
    if(!enemy.alive)
    {
      //Remove the tween that is associated with the enemy
      game.tweens.removeFrom(enemy);
      enemyDie.play();
      explosions.display(enemy.body.x + enemy.body.halfWidth, enemy.body.y + enemy.body.halfHeight);
    }
  },

  revivePlayer: function() {
    player.reset(game.world.width / 2, game.world.height);
    invincible = true;
    game.time.events.add(2000, function() { invincible = false; }, this);
  },

  hitPlayer: function(player) {
    if (!invincible) {
      player.kill();
      explosions.display(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
      game.time.events.add(1000, this.revivePlayer, this);
    }
  },

  enemyShoot: function(enemy) {
    if (enemy.weapon) {
      if (enemy.weapon instanceof Array) {
        for (var i = 0; i < enemy.weapon.length; i++) {
          enemy.weapon[i].shoot(enemy);
        }
      }
      else {
        enemy.weapon.shoot(enemy);
      }
    }
  },

  powerUpWeapon: function(player, powerUp) {
    powerUp.kill();
    var currentPowerLevel = weapons[currentWeapon].powerLevel;
    //Increase power level of current weapon
    if (currentWeapon == powerUp.weaponType && currentPowerLevel < 3) {
      weapons[currentWeapon].powerLevel++;
    }
    //Switch the weapon
    else if (currentWeapon != powerUp.weaponType) {
      currentWeapon = powerUp.weaponType;
      weapons[currentWeapon].powerLevel = currentPowerLevel;
    }
  },

  update: function() {
    keyboardHandler();
    for (var key in enemyGroups) {
      if (enemyGroups.hasOwnProperty(key)) {
        game.physics.arcade.overlap(weapons[currentWeapon].weapon.bullets, enemyGroups[key], this.damageEnemy, null, this);
        game.physics.arcade.overlap(player, enemyGroups[key], this.hitPlayer, null, this);
        enemyGroups[key].forEachExists(this.enemyShoot, this);
      }
    }
    game.physics.arcade.overlap(player, enemyBulletGroups, this.hitPlayer, null, this);
    game.physics.arcade.overlap(player, powerUp, this.powerUpWeapon, null, this);
  }
};  //MainState prototype end

var currentAngle;
function keyboardHandler() {
  if (!player.alive) {
    return;
  }
  player.body.velocity.set(0, 0);
  player.loadTexture('player');
  //Move the plane left
  if (cursors.left.isDown) {
    game.physics.arcade.velocityFromAngle(-180, 300, player.body.velocity);
    currentAngle = -180;
    player.loadTexture('playerLeft');
  }
  //Move the plane right
  if (cursors.right.isDown) {
    game.physics.arcade.velocityFromAngle(0, 300, player.body.velocity);
    currentAngle = 0;
    player.loadTexture('playerRight');
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
  if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT) && !player.body.velocity.isZero()) {
    //Slow down the move speed for each direction
    game.physics.arcade.velocityFromAngle(currentAngle, 200, player.body.velocity);
  }

  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    weapons[currentWeapon].shoot();
    playerShoot.play();
  }
}
