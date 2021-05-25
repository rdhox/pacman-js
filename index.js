const root = document.getElementById('root');

// General constants
const widthFloor = 700;
const heightFloor = 700;
const step = 5;
const stepGhost = 5;
const sizePacman = 50;
const heightGhost = 40;
const widthGhost = 35;
const wallDistance = 2;
const maxFood = 88;
const foodAte = [];
let intervalGhostId = null;
const angleDirection = {
  ArrowUp: -90,
  ArrowDown: 90,
  ArrowLeft: 180,
  ArrowRight: 0,
};
const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
const ghostLimitStraightLine = 100;
const colorsGhost = ['cyan', '#f5b041', '#e74c3c', '#e8daef'];

const animMouth = " @keyframes eat {\
  0% {\
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
  }\
  25% {\
    clip-path: polygon(100% 60%, 44% 48%, 100% 40%);\
  }\
  50% {\
    clip-path: polygon(100% 50%, 44% 48%, 100% 50%);\
  }\
  75% {\
    clip-path: polygon(100% 59%, 44% 48%, 100% 35%);\
  }\
  100% {\
    clip-path: polygon(100% 74%, 44% 48%, 100% 21%);\
  }\
}\
";
var s = document.createElement( 'style' );
s.innerHTML = animMouth;
root.appendChild(s);

// create elements
const screen = document.createElement('div');
screen.setAttribute('id', 'screen');
screen.style.display = 'flex';
screen.style.justifyContent = 'center';
screen.style.alignItems = 'center';
screen.style.width = '100%';
screen.style.height = '95vh';

const gameFloor = document.createElement('div');
gameFloor.setAttribute('id', 'gameFloor');
gameFloor.style.width = `${widthFloor}px`;
gameFloor.style.height = `${heightFloor}px`;
gameFloor.style.border = 'blue 1px solid';
gameFloor.style.position = 'relative';
gameFloor.style.backgroundColor = "black";

// Obstacles
const wallsInfos = [
  {width: 650, height: 30, left: 15, top:20},
  {width: 650, height: 30, left: 15, top:650},
  {width: 30, height: 300, left: 15, top:20},
  {width: 30, height: 250, left: 15, top:430},
  {width: 30, height: 300, left: 650, top:20},
  {width: 30, height: 250, left: 650, top:430},
  {width: 70, height: 180, left: 130, top: 260},
  {width: 70, height: 180, left: 480, top: 260},
  {width: 100, height: 70, left: 120, top: 520},
  {width: 100, height: 70, left: 460, top: 520},
  {width: 100, height: 20, left: 290, top: 570},
  {width: 100, height: 70, left: 120, top: 110},
  {width: 100, height: 70, left: 460, top: 110},
  {width: 100, height: 20, left: 290, top: 110},
  {width: 10, height: 178, left: 270, top: 260},
  {width: 10, height: 178, left: 400, top: 260},
];

// Food 
const foodWidth = 10;
const foodHeight = 10;
const foodColor =  "#f3f1d6";
const foodsPosition = [
  {top: 70, left: 80, id: 1},
  {top: 110, left: 80, id: 2},
  {top: 150, left: 80, id: 3},
  {top: 190, left: 80, id: 4},
  {top: 230, left: 80, id: 5},
  {top: 270, left: 80, id: 6},
  {top: 310, left: 80, id: 7},
  {top: 350, left: 80, id: 8},
  {top: 390, left: 80, id: 9},
  {top: 430, left: 80, id: 10},
  {top: 470, left: 80, id: 11},
  {top: 510, left: 80, id: 12},
  {top: 550, left: 80, id: 13},
  {top: 590, left: 80, id: 14},
  {top: 615, left: 80, id: 15},

  {top: 615, left: 120, id: 16},
  {top: 615, left: 160, id: 17},
  {top: 615, left: 200, id: 18},
  {top: 615, left: 240, id: 19},
  {top: 615, left: 280, id: 20},
  {top: 615, left: 320, id: 21},
  {top: 615, left: 360, id: 22},
  {top: 615, left: 400, id: 23},
  {top: 615, left: 440, id: 24},
  {top: 615, left: 480, id: 25},
  {top: 615, left: 520, id: 26},
  {top: 615, left: 560, id: 27},

  {top: 615, left: 610, id: 28},
  {top: 590, left: 610, id: 29},
  {top: 550, left: 610, id: 30},
  {top: 510, left: 610, id: 31},
  {top: 470, left: 610, id: 32},
  {top: 430, left: 610, id: 33},
  {top: 390, left: 610, id: 34},
  {top: 350, left: 610, id: 35},
  {top: 310, left: 610, id: 36},
  {top: 270, left: 610, id: 37},
  {top: 230, left: 610, id: 38},
  {top: 190, left: 610, id: 39},
  {top: 150, left: 610, id: 40},
  {top: 110, left: 610, id: 41},
  {top: 70, left: 610, id: 42},

  {top: 70, left: 120, id: 43},
  {top: 70, left: 160, id: 44},
  {top: 70, left: 200, id: 45},
  {top: 70, left: 240, id: 46},
  {top: 70, left: 280, id: 47},
  {top: 70, left: 320, id: 48},
  {top: 70, left: 360, id: 49},
  {top: 70, left: 400, id: 50},
  {top: 70, left: 440, id: 51},
  {top: 70, left: 480, id: 52},
  {top: 70, left: 520, id: 53},
  {top: 70, left: 560, id: 54},

  {top: 215, left: 120, id: 55},
  {top: 215, left: 160, id: 56},
  {top: 215, left: 200, id: 57},
  {top: 215, left: 240, id: 58},
  {top: 215, left: 280, id: 59},
  {top: 215, left: 320, id: 60},
  {top: 215, left: 360, id: 61},
  {top: 215, left: 400, id: 62},
  {top: 215, left: 440, id: 63},
  {top: 215, left: 480, id: 64},
  {top: 215, left: 520, id: 65},
  {top: 215, left: 560, id: 66},

  {top: 475, left: 120, id: 67},
  {top: 475, left: 160, id: 68},
  {top: 475, left: 200, id: 69},
  {top: 475, left: 240, id: 70},
  {top: 475, left: 280, id: 71},
  {top: 475, left: 320, id: 72},
  {top: 475, left: 360, id: 73},
  {top: 475, left: 400, id: 74},
  {top: 475, left: 440, id: 75},
  {top: 475, left: 480, id: 76},
  {top: 475, left: 520, id: 77},
  {top: 475, left: 560, id: 78},

  {top: 430, left: 440, id: 79},
  {top: 390, left: 440, id: 80},
  {top: 350, left: 440, id: 81},
  {top: 310, left: 440, id: 82},
  {top: 270, left: 440, id: 83},
  
  {top: 430, left: 230, id: 84},
  {top: 390, left: 230, id: 85},
  {top: 350, left: 230, id: 86},
  {top: 310, left: 230, id: 87},
  {top: 270, left: 230, id: 88},
];


// Classes of characters
class Character {
  constructor(originalX, originalY, wallsInfo) {
    this.posX = originalX;
    this.posY = originalY;
    this.direction = 'ArrowRight';
    this.wallsInfo = wallsInfo;
    return this;
  }

  getDirection = () => this.direction;
  
  setDirection = direction => {
    this.direction = direction;
  }
  getPosX = () => this.posX;
  getPosY = () => {
    return this.posY;
  };
  setPosX = posX => {
    this.posX = posX;
  }
  setPosY = posY => {
    this.posY = posY;
  }
  detectLimitVerticalFloor = nextVerticalMove => {
    if(nextVerticalMove <= 0 || (nextVerticalMove + 50) >= heightFloor )
      return false;
    return true;
  }
  detectLimitHorizontalFloor = nextHorizontalMove => {
    if((nextHorizontalMove - 25) <= 0 || (nextHorizontalMove + 25) >= 700 )
      return false;
    return true;
  }
  detectVerticalWalls = (nextVerticalMove, nextHorizontalMove) => {
    let ok = true;
    this.wallsInfo.forEach(wall => {
      if(
        (nextVerticalMove <= (heightFloor - wall.top + wallDistance) && nextVerticalMove >= (heightFloor - wall.top)) ||
        ((nextVerticalMove + 50) >= (heightFloor - wall.top - wall.height - wallDistance ) && ((nextVerticalMove + 50) <= ((heightFloor - wall.top - wall.height))))
      ) {
        if(
          ((nextHorizontalMove + 25) >= wall.left && (nextHorizontalMove - 25) <= (wall.left + wall.width))
        ) {
          ok = false;
        }
      }
    })
    return ok;
  }
  detectHorizontalWalls = (nextHorizontalMove, nextVerticalMove) => {
    let ok = true;
    this.wallsInfo.forEach(wall => {
      if(
        (((nextHorizontalMove + 25) >= (wall.left - wallDistance)) && ((nextHorizontalMove + 25) <= wall.left )) ||
        (((nextHorizontalMove - 25) >= (wall.left + wall.width)) && ((nextHorizontalMove - 25) <= (wall.left + wall.width + wallDistance))) 
      ) {
        if(
          ((nextVerticalMove + 25) <= (heightFloor - wall.top)) && (nextVerticalMove >= (heightFloor - wall.top - wall.height))
        ) {
          ok = false;
        }
      }
    })
    return ok;
  }

  handleMove = (move, step) => {
    switch (move) {
      case 'ArrowUp':
        if(this.detectLimitVerticalFloor(this.posY + step)  && this.detectVerticalWalls(this.posY + step, this.posX)) {
          this.posY = this.posY + step;
          this.direction = 'ArrowUp';
        }
        break;
      case 'ArrowDown':
        if(this.detectLimitVerticalFloor(this.posY - step)  && this.detectVerticalWalls(this.posY - step, this.posX)) {
          this.posY =  this.posY - step;
          this.direction = 'ArrowDown';
        }
        break;
      case 'ArrowRight':
        if(this.detectLimitHorizontalFloor(this.posX + step) && this.detectHorizontalWalls(this.posX + step, this.posY)) {
          this.posX = this.posX + step;
          this.direction = 'ArrowRight';
        }
        break;
      case 'ArrowLeft':
        if(this.detectLimitHorizontalFloor(this.posX - step) && this.detectHorizontalWalls(this.posX - step, this.posY)) {
          this.posX = this.posX - step;
          this.direction = 'ArrowLeft';
        }
        break;
      default:
        break;
    }
  }
}

class PacMan extends Character {
  constructor (originalX, originalY, wallsInfo, foods) {
    const _super = super(originalX, originalY, wallsInfo);
    this._super = _super;
    this.foodsInfo = foods;
    this.countFoods = 0;
    // Pac Body
    this.pac = document.createElement('div');
    this.pac.setAttribute('id', 'pacman');
    this.pac.style.width = `${sizePacman}px`;
    this.pac.style.height = `${sizePacman}px`;
    this.pac.style.borderRadius = '25px';
    this.pac.style.border = 'solid 2px black';
    this.pac.style.backgroundColor = 'yellow';
    this.pac.style.position = 'absolute';
    this.pac.style.left = `${this.posX - 25}px`;
    this.pac.style.bottom = `${this.posY}px`;
    // Pac Mouth
    const mouth = document.createElement('div');
    mouth.style.backgroundColor = "black";
    mouth.style.position = "absolute";
    mouth.style.width = "100%";
    mouth.style.height = "100%";
    mouth.style.clipPath = "polygon(100% 74%, 44% 48%, 100% 21%)";
    mouth.style.animationName = "eat";
    mouth.style.animationDuration = "0.7s";
    mouth.style.animationIterationCount = "infinite";
    this.pac.appendChild(mouth);
    this.initialization(this);
  }

  initialization = (_self) => {
    document.addEventListener('keydown', function(event) {
      if (directions.includes(event.key)){
        _self._super.handleMove(event.key, step)
        _self.updatePosition();
      }
    });
  }

  getPacMan = () => this.pac;

  getCountFood = () => this.countFoods;

  eatFood = () => {
    this.foodsInfo.forEach((f, i) => {
      // // We check if pac eat food vertically
      if (Math.abs((heightFloor - f.top + foodHeight) - this.posY) <= 3 ||
          Math.abs(this.posY + sizePacman - (heightFloor - f.top)) <= 3) {
        // We check if pacman is align with food laterally
        if(Math.abs(this.posX - f.left) < 10) {
          const foodEl = document.getElementById(f.id);
          if (foodEl) {
            foodEl.style.display = 'none';
            if (!foodAte.includes(f.id)) {
              this.countFoods += 1;
              foodAte.push(f.id);
            }
            if (this.countFoods === maxFood) {
              Victory();
            }
          }
        }
      }

      // We check if pac eat food laterally
      if (Math.abs(this.posX + sizePacman - f.left) <= 3 ||
          Math.abs(f.left + foodWidth - this.posX) <= 3) {
        // We check if pacman is align with food vertically
        if(Math.abs(this.posY - (heightFloor - f.top)) <= 40) {
          const foodEl = document.getElementById(f.id);
          if (foodEl) {
            foodEl.style.display = 'none';
            if (!foodAte.includes(f.id)) {
              this.countFoods += 1;
              foodAte.push(f.id);
            }
            if (this.countFoods === maxFood) {
              Victory();
            }
          }
        }
      }

    });
  }

  updatePosition = () => {
    this.pac.style.transform = `rotate(${angleDirection[this.direction]}deg)`;
    this.pac.style.left = `${this.posX - 25}px`;
    this.pac.style.bottom = `${this.posY}px`;
    this.eatFood();
  }
}

class Ghost extends Character {
  constructor (originalX, originalY, wallsInfo, pacman) {
    const _super = super(originalX, originalY, wallsInfo);
    this._super = _super;
    this.pac = pacman;
    this.countTop = 0;
    this.countRight = 0;
    this.switchLeft = false;
    this.switchTop = false;
    this.intervalId = null;
    this.biasDirectionX = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowRight" : "ArrowLeft";
    this.biasDirectionY = Math.floor(Math.random() * 100) % 2 == 0 ? "ArrowUp" : "ArrowDown";
    // Ghost
    // Take random color
    const i = Math.floor(Math.random() * 4);
    const eyes = document.createElement('div');
    eyes.style.height = "20px";
    eyes.style.width = `${widthGhost}px`;
    eyes.style.display = 'flex';
    eyes.style.justifyContent = 'space-around';
    eyes.style.alignItems = 'flex-end';
    const eye = document.createElement('div');
    eye.style.backgroundColor = '#fff';
    eye.style.height = '15px';
    eye.style.width = '15px';
    eye.style.borderRadius = '100%';
    eye.style.display = 'flex';
    eye.style.justifyContent = 'flex-start';
    eye.style.alignItems = 'center';
    const iris = document.createElement('div');
    iris.style.backgroundColor = 'blue';
    iris.style.height = '7px';
    iris.style.width = '7px';
    iris.style.borderRadius = '100%';
    eye.appendChild(iris);
    eyes.appendChild(eye);
    const eye2 = eye.cloneNode();
    const iris2 = iris.cloneNode();
    eye2.appendChild(iris2);
    eyes.appendChild(eye2);
    const tail = document.createElement('div');
    tail.style.backgroundRepeat = 'repeat-x';
    tail.style.bottom = '-10px';
    tail.style.height = '10px';
    tail.style.position = 'absolute';
    tail.style.width = '35px';
    tail.style.background = `linear-gradient(-45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%, linear-gradient( 45deg, transparent 75%, ${colorsGhost[i]} 75%) 0 50%`;
    tail.style.backgroundSize = "10px 10px, 10px 10px";
    this.ghost = document.createElement('div');
    this.ghost.setAttribute('class', 'ghost');
    this.ghost.style.height = `${heightGhost}px`;
    this.ghost.style.width = `${widthGhost}px`;
    this.ghost.style.borderRadius = '30% 30% 0 0'
    this.ghost.style.backgroundColor = colorsGhost[i];
    this.ghost.style.position = 'absolute';
    this.ghost.style.left = `${this.posX - 25}px`;
    this.ghost.style.bottom = `${this.posY}px`;
    this.ghost.appendChild(eyes);
    this.ghost.appendChild(tail);
    this.initialization(this);
  }

  initialization = (_self) => {
    _self.intervalId = setInterval(() => {
      function getRandomMove() {
        let randomIndex = Math.floor(Math.random() * 4);
        // incorporing bias
        const rand1 = Math.floor(Math.random() * 100);
        const rand2 = Math.floor(Math.random() * 100);
        randomIndex = (randomIndex === 2 && rand1 % 2 === 0) ? 3 : randomIndex;
        randomIndex = (randomIndex === 1 && rand2 % 2 === 0) ? 0 : randomIndex;
        let randomMove = directions[randomIndex];
        if(randomMove === 'ArrowUp' || randomMove === 'ArrowDown') {
          if(_self.countTop < ghostLimitStraightLine && !_self.switchTop) {
            randomMove = _self.biasDirectionY;
            _self.countTop += 1;
          } else if (_self.countTop == ghostLimitStraightLine && !_self.switchTop) {
            _self.countTop = 0;
            _self.switchTop = true;
          }
          if(_self.countTop < ghostLimitStraightLine && _self.switchTop) {
            randomMove = _self.biasDirectionY === 'ArrowDown' ? 'ArrowUp' : 'ArrowDown';
            _self.countTop += 1;
          } else if (_self.countTop == ghostLimitStraightLine && _self.switchTop) {
            _self.countTop = 0;
            _self.switchTop = false;
          }
        } 
        if(randomMove === 'ArrowLeft' || randomMove === 'ArrowRight') {
          if(_self.countRight < ghostLimitStraightLine && !_self.switchLeft) {
            randomMove = _self.biasDirectionX;
            _self.countRight += 1;
          } else if (_self.countRight == ghostLimitStraightLine && !_self.switchLeft) {
            _self.countRight = 0;
            _self.switchLeft = true;
          }
          if(_self.countRight < ghostLimitStraightLine && _self.switchLeft) {
            randomMove = _self.biasDirectionX === 'ArrowRight' ? 'ArrowLeft' : 'ArrowRight';
            _self.countRight += 1;
          } else if (_self.countRight == ghostLimitStraightLine && _self.switchLeft) {
            _self.countRight = 0;
            _self.switchLeft = false;
          }
        } 
          _self._super.handleMove(randomMove, stepGhost);
          _self.updatePosition();
        }
      getRandomMove();
    }, 70);
  }

  getGhost = () => this.ghost;

  updatePosition = () => {
    // We check if the ghost hit pacman vertically
    if (Math.abs(this.posY - this.pac.getPosY() - sizePacman) < 15 ||
        Math.abs(this.pac.getPosY() - this.posY - sizePacman)  < 15 
    ) {
      // We check if pacman is align with ghost laterally
      if(Math.abs(this.posX - this.pac.getPosX()) < 25) {
        clearInterval(this.intervalId);
        GameOver();
      }
    }
    // We check if the ghost hit pacman laterally
    if( Math.abs(this.pac.getPosX() + sizePacman - this.posX) < 10 ||
        Math.abs(this.posX + widthGhost - this.pac.getPosX()) < 10
    ) {
      // We check if pacman is align with ghost vertically
      if(Math.abs(this.pac.getPosY() - this.posY) < 25) {
        clearInterval(this.intervalId);
        GameOver();
      }
    }
    this.ghost.style.left = `${this.posX - 25}px`;
    this.ghost.style.bottom = `${this.posY}px`;
  }
}

// initializing game elements
const pacMan = new PacMan(350, 50, wallsInfos, foodsPosition);

// Create Ghost
function generateGhosts() {
  const ghost1 = new Ghost(350, 350, wallsInfos, pacMan);
  gameFloor.appendChild(ghost1.getGhost());
  intervalGhostId = setInterval(() => {
    gameFloor.appendChild(new Ghost(350, 350, wallsInfos, pacMan).getGhost());
  }, 10000);
}

// Create walls
const walls = wallsInfos.map((wall, i) => {
  const w = document.createElement('div');
  w.setAttribute('id', `wall-${i}`);
  w.style.width = `${wall.width}px`;
  w.style.height = `${wall.height}px`;
  w.style.border = '#3F51B5 7px double';
  w.style.boxSizing = 'border-box';
  w.style.borderRadius = '2px';
  w.style.backgroundColor = 'black';
  w.style.position = 'absolute';
  w.style.top = `${wall.top}px`;
  w.style.left = `${wall.left}px`;
  return w;
});

// Create Food
const foods = foodsPosition.map((p, i) => {
  const f = document.createElement('div');
  f.setAttribute('id', p.id);
  f.style.width = `${foodWidth}px`;
  f.style.height = `${foodHeight}px`;
  f.style.backgroundColor = foodColor;
  f.style.position = "absolute";
  f.style.top = `${p.top}px`;
  f.style.left = `${p.left}px`;
  return f;
});

function GameOver() {
  const card = document.createElement('div');
  card.style.width = "300px";
  card.style.height = "300px";
  card.style.border = "solid 3px #3F51B5";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.backgroundColor = "black";
  card.style.zIndex= 999;
  card.style.position = "absolute";
  card.style.left = `${widthFloor/2 - 150}px`;
  card.style.top = `${heightFloor/2 - 150}px`;
  const text = document.createElement('div');
  text.innerHTML = "Game Over";
  text.style.color = "red";
  text.style.fontWeight = "bold";
  text.style.fontSize = "40px";
  card.appendChild(text);
  gameFloor.appendChild(card);
}

function Victory() {
  const card = document.createElement('div');
  card.style.width = "300px";
  card.style.height = "300px";
  card.style.border = "solid 3px #3F51B5";
  card.style.display = "flex";
  card.style.justifyContent = "center";
  card.style.alignItems = "center";
  card.style.backgroundColor = "black";
  card.style.zIndex= 999;
  card.style.position = "absolute";
  card.style.left = `${widthFloor/2 - 150}px`;
  card.style.top = `${heightFloor/2 - 150}px`;
  const text = document.createElement('div');
  text.innerHTML = "You won!!";
  text.style.color = "red";
  text.style.fontWeight = "bold";
  text.style.fontSize = "40px";
  card.appendChild(text);
  gameFloor.appendChild(card);
}

// we inject the element on root
walls.forEach(wall => gameFloor.appendChild(wall));
foods.forEach(food => gameFloor.appendChild(food));
gameFloor.appendChild(pacMan.getPacMan());
screen.appendChild(gameFloor);
root.appendChild(screen);

// We create the ghosts
generateGhosts();
