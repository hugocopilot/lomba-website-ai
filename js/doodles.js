const rand = (a, b) => a + Math.random() * (b - a);

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

function randomize(el, x, y, k) {
    const d = rand(12, 22);
    const set = (name, value) => el.style.setProperty(name, value);
    set("--x", `${x}px`);
    set("--y", `${y}px`);
    set("--d", `${d}s`);
    set("--sw", `${rand(6, 14)}s`);
    set("--r", `${rand(2.5, 6) * k}rem`);
    set("--a", `${rand(6, 18)}deg`);
    set("--dir", Math.random() < 0.5 ? -1 : 1);
    set("--t1", `${-rand(0, d)}s`);
    set("--t2", `${-rand(0, 14)}s`);
}

function scatter() {
    const box = document.querySelector(".doodles");
    const W = box.clientWidth;
    const H = box.clientHeight;
    const small = W < 600;
    const all = shuffle([...box.querySelectorAll(".doodle")]);
    const max = small ? 6 : all.length;
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