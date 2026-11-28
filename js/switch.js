(() => {
    const root = document.documentElement;
    const MODES = [
        { id: "interactive", label: "Interaktif", icon: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>' },
        { id: "formal", label: "Sederhana", icon: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>' },
    ];

    const bar = document.createElement("div");
    bar.className = "mode-switch";
    bar.setAttribute("role", "group");
    bar.setAttribute("aria-label", "Pilih tampilan situs");
    bar.innerHTML = MODES.map((m) =>
        `<button type="button" data-mode-btn="${m.id}" aria-label="${m.label}">` +
        `<svg viewBox="0 0 24 24" aria-hidden="true">${m.icon}</svg><span>${m.label}</span></button>`
    ).join("");
    document.body.append(bar);

    function paint() {
        bar.querySelectorAll("button").forEach((b) =>
            b.setAttribute("aria-pressed", String(b.dataset.modeBtn === root.dataset.mode)));
    }

    bar.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        root.dataset.mode = btn.dataset.modeBtn;
        try { localStorage.setItem("mode", root.dataset.mode); } catch (err) {}
        paint();
        document.dispatchEvent(new CustomEvent("modechange"));
    });

    paint();
})();