const orbit = document.querySelector(".orbit");
const arms = [...orbit.children];
let target = 1, speed = 1, raf = 0;

arms.forEach((arm, i) => arm.style.setProperty("--i", i));
orbit.style.setProperty("--step", `${360 / arms.length}deg`);

function ease() {
    speed += (target - speed) * 0.05;
    if (Math.abs(target - speed) < 0.002) speed = target;
    orbit.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = speed));
    raf = speed === target ? 0 : requestAnimationFrame(ease);
}

function setTarget(t) {
    target = t;
    if (!raf) ease();
}

orbit.addEventListener("pointerover", (e) => setTarget(e.target.closest("article") ? 0 : 1));
orbit.addEventListener("pointerleave", () => setTarget(1));