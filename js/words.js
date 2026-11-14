function splitWords(el) {
  const text = el.textContent.trim();
  el.setAttribute("aria-label", text);
  el.innerHTML = text.split(/\s+/).map((w, i) =>
    `<span class="word" aria-hidden="true" style="--i:${i}">${w}</span>`
  ).join(" ");
}

document.querySelectorAll("[data-words]").forEach(splitWords);