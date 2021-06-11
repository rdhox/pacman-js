import level_0 from './levelsDesign/level_0/level_0.json';
import { sizePacman, widthFloor, heightFloor } from './config/general';
import PacMan from './models/pacman/PacMan';
// import functions
import generateGame from './functions/generateGame';
import generateGhosts from './functions/generateGhosts';
import generateLevels from './functions/generateLevels';

const root = document.getElementById('root');

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

function launchGame() {
  // We generate level
  const {gameFloor, screen} = generateGame(widthFloor, heightFloor);
  // We generate the characters
  const pacMan = new PacMan(350, 50, level_0);
  // We generate levels infos
  const { walls, foods } = generateLevels(level_0);

  // we inject the element on root
  walls.forEach(wall => gameFloor.appendChild(wall));
  foods.forEach(food => gameFloor.appendChild(food));
  gameFloor.appendChild(pacMan.getPacMan());
  screen.appendChild(gameFloor);
  root.appendChild(screen);

  // Create Ghost
  generateGhosts(level_0, pacMan, sizePacman, gameFloor);
}


launchGame();

