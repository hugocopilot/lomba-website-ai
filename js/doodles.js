const rand = (a, b) => a + Math.random() * (b - a);
const PALETTE = ["52,158,154", "22,163,74", "250,204,21", "56,189,248"];

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

function randomize(el, x, y, k) {
    const { width, height } = el.getBoundingClientRect();
    const depth = Math.min(1, Math.max(0.35, Math.sqrt(width * height) / 110));
    const rgb = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const d = rand(14, 24) * (1.6 - depth);
    const set = (name, value) => el.style.setProperty(name, value);
    set("--x", `${x}px`);
    set("--y", `${y}px`);
    set("--d", `${d}s`);
    set("--sw", `${rand(6, 14)}s`);
    set("--r", `${rand(2.5, 6) * k * (0.6 + depth)}rem`);
    set("--a", `${rand(6, 18)}deg`);
    set("--dir", Math.random() < 0.5 ? -1 : 1);
    set("--t1", `${-rand(0, d)}s`);
    set("--t2", `${-rand(0, 14)}s`);
    set("--e", `${rand(0, 1.2)}s`);
    set("--z", Math.round(depth * 50));
    set("--ink", `rgba(${rgb}, ${0.22 + depth * 0.3})`);
    set("--c", `rgba(${rgb}, 0.85)`);
    set("--f", `rgba(${rgb}, 0.3)`);
}

function scatter() {
    const box = document.querySelector(".doodles");
    if (!box) return;
    const W = box.clientWidth;
    const H = box.clientHeight;
    const small = W < 600;
    const all = shuffle([...box.querySelectorAll(".doodle")]);
    const max = small ? 6 : Math.min(10, all.length);
    all.forEach((el, i) => { el.style.display = i < max ? "" : "none"; });
    const items = all.slice(0, max);
    const cols = small ? 2 : 4;
    const rows = Math.ceil(items.length / cols);
    const cells = shuffle([...Array(cols * rows).keys()]);
    const cw = W / cols;
    const ch = H / rows;
    items.forEach((el, i) => {
        const { width, height } = el.getBoundingClientRect();
        const x = (cells[i] % cols) * cw + rand(0, Math.max(0, cw - width));
        const y = Math.floor(cells[i] / cols) * ch + rand(0, Math.max(0, ch - height));
        randomize(el, x, y, small ? 0.4 : 1);
    });
}

document.fonts.ready.then(scatter);

let wasSmall = innerWidth < 600;
addEventListener("resize", () => {
    const isSmall = innerWidth < 600;
    if (isSmall !== wasSmall) {
        wasSmall = isSmall;
        scatter();
    }
});

const layer = document.querySelector(".doodles");
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
let frame = 0, mx = 0, my = 0;

function follow() {
    layer.style.setProperty("--mx", mx);
    layer.style.setProperty("--my", my);
    frame = 0;
}

if (layer) {
    addEventListener("pointermove", (e) => {
        if (still || e.pointerType !== "mouse") return;
        mx = e.clientX / innerWidth - 0.5;
        my = e.clientY / innerHeight - 0.5;
        if (!frame) frame = requestAnimationFrame(follow);
    });
}