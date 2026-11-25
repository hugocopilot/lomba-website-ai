function go(url, replace = false) {
    document.body.classList.add("page-out");
    setTimeout(() => {
        if (replace) location.replace(url);
        else location.href = url;
    }, 400);
}

function isInternal(a) {
    return a.origin === location.origin && !a.hash && !a.target;
}

document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || !isInternal(a) || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    go(a.href);
});

window.addEventListener("pageshow", (e) => {
    if (e.persisted) document.body.classList.remove("page-out");
});