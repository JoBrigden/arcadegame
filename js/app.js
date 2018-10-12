// Enemies to avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed; //speed of the Enemies
  this.sprite = 'images/enemy-bug.png';
};

// speed beetles move across the screen
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt; //  movement multiplied by the dt parameter

  if(this.x > 510) {
    this.x = -50; // a new beetle appears on the left-hand-side of the screen
    this.speed = 100 + Math.floor(Math.random() * 150);
  }

  if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
    Player.reset();
  }
};

Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
var Player = function (x, y) {
  this.x = x;
  this.y = y;
  this.player = 'images/char-princess-girl.png';
  this.score = 0;
};

// update method
Player.prototype.update = function(dt) {
  if(this.x > 405) {
    this.x = 405;
  }

  if(this.x < 0) {
    this.x = 0;
  }

  if(this.y > 405) {
    this.y = 405;
  }

  if(this.y < 0) {
    this.y = 405;
    this.x = 202;
    this.addPoints();
  }
};

// render method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
  // add score
  ctx.fillText("Score: " + this.score, 10, 100);
  ctx.font='40px Bodoni MT Black';
  ctx.fillStyle='white';
  ctx.strokeStyle='black';
};

// handleInput method
Player.prototype.handleInput = function(keyPress) {
  if(keyPress == 'right' && this.x < 405) {
    this.x += 102;
  }

  if(keyPress == 'left' && this.x > 0) {
    this.x -= 102;
  }

  if(keyPress == 'up' && this.y > 0) {
    this.y -= 83;
  }

  if (keyPress == 'down' && this.y < 405) {
    this.y += 83;
  }

  if (this.y < 0) {
    setTimeout(function() {
      player.x = 202;
      player.y = 405;
      this.addPoints();
    }, 400);
  }
}

// colliding with the beetles
Player.prototype.reset = function() {
  player.x = 202;
  player.y = 405;
  this.score = 0;
}

// add score when player reaches water
Player.prototype.addPoints = function() {
  this.score += 10;
};

// variable for player
var player = new Player(202, 405);

// array for allEnemies
var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function(locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// event listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
