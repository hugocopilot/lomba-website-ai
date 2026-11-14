const TYPES = ["square", "triangle", "circle"];
const COLORS = ["#16a34a", "#facc15", "#38bdf8", "#f472b6"];
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (list) => list[Math.floor(Math.random() * list.length)];

function makeShape(x, y) {
  const el = document.createElement("span");
  const size = rand(30, 80);
  const angle = Math.atan2(y - 50, x - 50);
  el.className = "shape " + pick(TYPES);
  el.style.cssText = `left:${x}%;top:${y}%;width:${size}px;height:${size}px;
    background:${pick(COLORS)};--rot:${rand(0, 360)}deg;--delay:${rand(0, 0.8)}s;
    --dx:${Math.cos(angle) * 120}vw;--dy:${Math.sin(angle) * 120}vh;`;
  return el;
}

function buildShapes(cols = 6, rows = 8) {
  const bg = document.querySelector(".splash-bg");
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      bg.appendChild(makeShape((c + Math.random()) / cols * 100, (r + Math.random()) / rows * 100));
}

buildShapes();