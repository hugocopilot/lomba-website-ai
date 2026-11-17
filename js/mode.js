const root = document.documentElement;
const choice = document.querySelector(".choice");
const NEXT = "home.html";

function getMode() {
    try { return localStorage.getItem("mode"); } catch (e) { return null; }
}

function saveMode(mode) {
    try { localStorage.setItem("mode", mode); } catch (e) {}
}

function goNext() {
    window.location.href = NEXT;
}

function choose(mode) {
    root.dataset.mode = mode;
    saveMode(mode);
    choice.classList.add("leave");
    setTimeout(goNext, 600);
}

function init() {
    const saved = getMode();
    if (saved) {
        root.dataset.mode = saved;
        choice.hidden = true;
        setTimeout(goNext, 9000);
    }
    document.querySelectorAll("[data-set-mode]").forEach((btn) => {
        btn.addEventListener("click", () => choose(btn.dataset.setMode));
    });
}

init();