const root = document.documentElement;
const NEXT = "home.html";

function saveMode(mode) {
    try { localStorage.setItem("mode", mode); } catch (e) {}
}

function leave() {
    if (typeof go === "function") {
        go(NEXT, true);
    } else {
        location.replace(NEXT);
    }
}

function choose(mode) {
    root.dataset.mode = mode;
    saveMode(mode);
    leave();
}

function init() {
    if (root.dataset.returning) {
        setTimeout(leave, 3200);
        return;
    }
    document.querySelectorAll("[data-set-mode]").forEach((btn) => {
        btn.addEventListener("click", () => choose(btn.dataset.setMode));
    });
}

init();