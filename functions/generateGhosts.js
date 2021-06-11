import Ghost from '../models/ghost/Ghost';

let intervalGhostId = null;

function generateGhosts(level_0, pacMan, sizePacman, gameFloor) {
  const ghost1 = new Ghost(350, 350, level_0, pacMan, sizePacman);
  gameFloor.appendChild(ghost1.getGhost());
  intervalGhostId = setInterval(() => {
    gameFloor.appendChild(new Ghost(350, 350, level_0, pacMan, sizePacman ).getGhost());
  }, 10000);
}

export default generateGhosts;