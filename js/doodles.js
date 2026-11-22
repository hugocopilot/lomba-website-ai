const rand = (a, b) => a + Math.random() * (b - a);

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

function randomize(el, x, y) {
    const d = rand(12, 22);
    const set = (k, v) => el.style.setProperty(k, v);
    set("--x", `${x}%`);
    set("--y", `${y}%`);
    set("--d", `${d}s`);
    set("--sw", `${rand(6, 14)}s`);
    set("--r", `${rand(2.5, 6)}rem`);
    set("--a", `${rand(6, 18)}deg`);
    set("--dir", Math.random() < 0.5 ? -1 : 1);
    set("--t1", `${-rand(0, d)}s`);
    set("--t2", `${-rand(0, 14)}s`);
}

function scatter() {
    const items = [...document.querySelectorAll(".doodle")];
    const cols = 4;
    const rows = Math.ceil(items.length / cols);
    const cells = shuffle([...Array(cols * rows).keys()]);
    items.forEach((el, i) => {
        const col = cells[i] % cols;
        const row = Math.floor(cells[i] / cols);
        randomize(el, (col + rand(0.1, 0.8)) / cols * 85, (row + rand(0.1, 0.8)) / rows * 85);
    });
}

scatter();