(() => {

const rand = (a, b) => a + Math.random() * (b - a);
const PALETTE = ["52,158,154", "22,163,74", "250,204,21", "56,189,248"];
const GAP = 10;
const MOVES = [
    { move: "sway", dirn: "alternate", ease: "ease-in-out", time: [5, 14] },
    { move: "turn", dirn: "normal", ease: "linear", time: [30, 70] },
    { move: "bob", dirn: "alternate", ease: "ease-in-out", time: [3, 7] },
];

const layer = document.querySelector(".doodles");
const isStill = () => document.documentElement.dataset.mode === "formal";
bodies = isStill() ? [] : placed.map((p) => makeBody(p, small ? 0.6 : 1));
let bodies = [], W = 0, H = 0, last = 0, visible = true;
let frame = 0, mx = 0, my = 0;

function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}

function restyle(el) {
    el.dataset.s ||= parseFloat(el.style.getPropertyValue("--s"));
    const depth = rand(0.35, 1);
    const m = MOVES[Math.floor(Math.random() * MOVES.length)];
    const rgb = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const set = (name, value) => el.style.setProperty(name, value);
    set("--s", `${el.dataset.s * (0.6 + depth * 0.8)}rem`);
    set("--move", m.move);
    set("--dirn", m.dirn);
    set("--ease", m.ease);
    set("--sw", `${rand(...m.time)}s`);
    set("--a", `${rand(6, 18)}deg`);
    set("--t2", `${-rand(0, 14)}s`);
    set("--e", `${rand(0, 1.2)}s`);
    set("--z", Math.round(depth * 60));
    set("--ink", `rgba(${rgb}, ${0.15 + depth * 0.4})`);
    set("--c", `rgba(${rgb}, 0.85)`);
    set("--f", `rgba(${rgb}, 0.3)`);
    el.style.translate = "";
    return depth;
}

function makeBody({ el, x, y, depth }, k) {
    const cs = getComputedStyle(el);
    const angle = rand(0, Math.PI * 2);
    const speed = rand(12, 50) * k * (0.4 + depth * 1.2);
    return {
        el, x, y, x0: x, y0: y,
        w: parseFloat(cs.width), h: parseFloat(cs.height),
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    };
}

function scatter() {
    if (!layer || !layer.clientWidth) return;
    if (visible && !isStill()) step(now);
    W = layer.clientWidth;
    H = layer.clientHeight;
    const small = W < 600;
    const all = shuffle([...layer.querySelectorAll(".doodle")]);
    const max = small ? 6 : Math.min(10, all.length);
    all.forEach((el, i) => { el.style.display = i < max ? "" : "none"; });
    const items = all.slice(0, max);
    const cols = small ? 2 : 4;
    const rows = Math.ceil(items.length / cols);
    const cells = shuffle([...Array(cols * rows).keys()]);
    const cw = W / cols;
    const ch = H / rows;
    const placed = items.map((el, i) => {
        const depth = restyle(el);
        const { width, height } = el.getBoundingClientRect();
        const x = (cells[i] % cols) * cw + rand(0, Math.max(0, cw - width));
        const y = Math.floor(cells[i] / cols) * ch + rand(0, Math.max(0, ch - height));
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
        return { el, x, y, depth };
    });
    bodies = still ? [] : placed.map((p) => makeBody(p, small ? 0.6 : 1));
    layer.classList.add("ready");
}

function collide(a, b) {
    const dx = a.x + a.w / 2 - (b.x + b.w / 2);
    const dy = a.y + a.h / 2 - (b.y + b.h / 2);
    const ox = (a.w + b.w) / 2 + GAP - Math.abs(dx);
    const oy = (a.h + b.h) / 2 + GAP - Math.abs(dy);
    if (ox <= 0 || oy <= 0) return;
    if (ox < oy) {
        const s = dx < 0 ? -1 : 1;
        a.x += (s * ox) / 2;
        b.x -= (s * ox) / 2;
        if ((a.vx - b.vx) * s < 0) [a.vx, b.vx] = [b.vx, a.vx];
    } else {
        const s = dy < 0 ? -1 : 1;
        a.y += (s * oy) / 2;
        b.y -= (s * oy) / 2;
        if ((a.vy - b.vy) * s < 0) [a.vy, b.vy] = [b.vy, a.vy];
    }
}

function step(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    for (const b of bodies) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx); }
        else if (b.x > W - b.w) { b.x = Math.max(0, W - b.w); b.vx = -Math.abs(b.vx); }
        if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy); }
        else if (b.y > H - b.h) { b.y = Math.max(0, H - b.h); b.vy = -Math.abs(b.vy); }
    }
    for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) collide(bodies[i], bodies[j]);
    }
    for (const b of bodies) b.el.style.translate = `${b.x - b.x0}px ${b.y - b.y0}px`;
}

function tick(now) {
    if (visible) requestAnimationFrame((t) => { last = t; tick(t); });
    else last = now;
    requestAnimationFrame(tick);
}

function follow() {
    layer.style.setProperty("--mx", mx);
    layer.style.setProperty("--my", my);
    frame = 0;
}

if (layer) {
    document.fonts.ready.then(scatter);
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(layer);
    if (isStill() || e.pointerType !== "mouse") return;

    let wasSmall = innerWidth < 600;
    addEventListener("resize", () => {
        W = layer.clientWidth;
        H = layer.clientHeight;
        const isSmall = innerWidth < 600;
        if (isSmall !== wasSmall) {
            wasSmall = isSmall;
            scatter();
        }
    });

    addEventListener("pointermove", (e) => {
        if (still || e.pointerType !== "mouse") return;
        mx = e.clientX / innerWidth - 0.5;
        my = e.clientY / innerHeight - 0.5;
        if (!frame) frame = requestAnimationFrame(follow);
    });
}

})();