let tileWidth = 101;
let tileHeight = 75;
function AllPlayers(){
  this.playerImages= [
    'images/char-boy.png',
    'images/char-pink-girl.png',
    'images/char-horn-girl.png',
    'images/char-cat-girl.png'
  ];
  this.bgColor=[
    'rgb(0,255,0)', 'rgb(0,255,50)', 'rgb(0,255,100)', 'rgb(0,255,150)'
  ]
}
let playerlists = new AllPlayers();

var Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.y = y;
    this.x = 0;
    this.random = Math.floor(Math.random() * 3) + 1;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = Math.round(this.x + (this.random + 1 * dt));
    if(this.x > 600) {
        this.x = 0;
        this.random = Math.floor(Math.random() * 3) + 1;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




var playerlist = function(y, x, imgSprite, color) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.y = y;
    this.x = x;
    this.bgcolor = color;
    this.random = Math.floor(Math.random() * 3) + 1;
    this.sprite = imgSprite;
    this.radius = 45;
};

playerlist.prototype.render = function() {
    ctx.beginPath();
    ctx.arc(this.x+50, this.y+100, this.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = this.bgcolor;
    ctx.fill();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {
  this.x = 200;
  this.y = 420;
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keyCode) {
  if(keyCode === 'up' && this.y > 0) {
    this.y = this.y - tileHeight;
  }
  if(keyCode === 'down' && this.y < 400) {
    this.y = this.y + tileHeight;
  }
  if(keyCode === 'right' && this.x < 400) {
    this.x = this.x + tileWidth;
  }
  if(keyCode === 'left' && this.x > 0) {
    this.x = this.x - tileWidth;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(70), new Enemy(140), new Enemy(210)];
// Place the player object in a variable called player
var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
var allPlayers = [];
playerlists.playerImages.forEach(function (element, index){
  allPlayers.push(new playerlist(0, index * 101, element, playerlists.bgColor[index]));
});
console.log(allPlayers);
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('click', (e) => {
  allPlayers.forEach(allPlayer => {
    allPlayer.addEventListener('click', function(){
      console.log("hi");
    });
  });
});