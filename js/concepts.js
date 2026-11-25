const SLOW_DOWN = 2.5;
const SPEED_UP = 1;

const orbit = document.querySelector(".orbit");
const stage = document.querySelector(".stage");
const hubImg = stage.querySelector(".hub-img");
const arms = [...orbit.children];
let target = 1, speed = 1, raf = 0, last = 0;

arms.forEach((arm, i) => {
    arm.style.setProperty("--i", i);
    new Image().src = arm.querySelector("article").dataset.img;
});
orbit.style.setProperty("--step", `${360 / arms.length}deg`);

function ease(now) {
    const secs = target < speed ? SLOW_DOWN : SPEED_UP;
    speed += (target - speed) * (1 - Math.exp(-3 * (now - last) / 1000 / secs));
    last = now;
    if (Math.abs(target - speed) < 0.002) speed = target;
    orbit.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = speed));
    raf = speed === target ? 0 : requestAnimationFrame(ease);
}

function setTarget(t) {
    target = t;
    if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(ease);
    }
}

orbit.addEventListener("pointerover", (e) => {
    const card = e.target.closest("article");
    setTarget(card ? 0 : 1);
    stage.classList.toggle("showing", !!card);
    if (card) hubImg.src = card.dataset.img;
});

orbit.addEventListener("pointerleave", () => {
    setTarget(1);
    stage.classList.remove("showing");
});