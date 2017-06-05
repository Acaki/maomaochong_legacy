var i;
function stageStart() {
  game.time.events.add(0, wave1, this);
  game.time.events.add(3000, wave2, this);
  game.time.events.add(10000, wave3, this);
}

function wave1() {
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, enemies2.launch, enemies2, 0, 100, 0, 400, -150, 0);
  }
  for (i = 0; i < 5; i++) {
    game.time.events.add(i * 1000, enemies.launch, enemies, 500, 0, 135, 100, 20, 0);
  }
}

function wave2() {
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, enemies2.launch, enemies2, game.width, 100, -180, 400, 150, 0);
  }
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, enemies2.launch, enemies2, 0, 400, 0, 400, -150, 0);
  }
}

function wave3() {
  for (i = 0; i < 3; i++) {
    enemies.launchTween(i * 200 + 100, 0, { y: 200 }, 1000);
  }
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, enemies2.launch, enemies2, 0, 100, 45, 400, -150, 0);
  }
  for (i = 0; i < 10; i++) {
    game.time.events.add(i * 500, enemies2.launch, enemies2, game.width, 100, 135, 400, 150, 0);
  }
}
