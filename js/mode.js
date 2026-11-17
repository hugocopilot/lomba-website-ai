const root = document.documentElement;
const choice = document.querySelector(".choice");

function applyMode(mode) {
    root.dataset.mode = mode;
}

function saveMode(mode) {
  try { localStorage.setItem("mode", mode); } catch (e) {}
}

function leave() {
  choice.classList.add("leave");
  choice.addEventListener("animationend", (e) => {
    if (e.target === choice) choice.hidden = true;
  });
}

document.querySelectorAll("[data-set-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.setMode;
    applyMode(mode);
    saveMode(mode);
    leave();
  });
});

try {
  const saved = localStorage.getItem("mode");
  if (saved) { applyMode(saved); choice.hidden = true; }
} catch (e) {}