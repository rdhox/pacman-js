
function generateLevels(level_0) {
  // Create walls
  const walls = level_0.wallsInfos.map((wall, i) => {
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
  const foods = level_0.foodsPosition.map((p, i) => {
    const f = document.createElement('div');
    f.setAttribute('id', p.id);
    f.style.width = `${level_0.foodWidth}px`;
    f.style.height = `${level_0.foodHeight}px`;
    f.style.backgroundColor = level_0.foodColor;
    f.style.position = "absolute";
    f.style.top = `${p.top}px`;
    f.style.left = `${p.left}px`;
    return f;
  });

  return {walls, foods};
}

export default generateLevels;