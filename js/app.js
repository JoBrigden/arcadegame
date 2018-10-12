// Enemies to avoid
var Enemy = function(x, y, speed) {
  this.x = x; // x-axis left to right
  this.y = y; // y axis up down for player icon
  this.speed = speed; //speed of the Enemies
  this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt; //  movement multiplied by the dt parameter

  if(this.x > 510) {
    this.x = -50; // a new bug appears on the left-hand-side of the screen
    this.speed = 100 + Math.floor(Math.random() * 150);
  }

  if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && player.y + 60 > this.y) {
    player.x = 202;
    player.y = 405;
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
};

// update method
Player.prototype.update = function(dt) {

};

// render method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.player), this.x, this.y);
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
    }, 400);
  }
}

// array for allEnemies
var allEnemies = [];
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function(locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

// variable for player
var player = new Player(202, 405);

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
