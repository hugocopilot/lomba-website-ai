const root = document.documentElement;
const NEXT = "home.html";

function saveMode(mode) {
    try { localStorage.setItem("mode", mode); } catch (e) {}
}

function choose(mode) {
    root.dataset.mode = mode;
    saveMode(mode);
    go(NEXT, true);
}

function init() {
    if (root.dataset.returning) {
        setTimeout(() => go(NEXT, true), 3200);
        return;
    }
    document.querySelectorAll("[data-set-mode]").forEach((btn) => {
        btn.addEventListener("click", () => choose(btn.dataset.setMode));
    });
}

init();