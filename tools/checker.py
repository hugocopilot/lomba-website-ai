from pathlib import Path
import argparse
import re
import sys
import time

DEFAULT_IGNORE = {"tools", "node_modules", ".venv", ".git", "pendidikan-for-later"}
LOGO = r"""
   ________  __    _    __     ___      ____________
  / ____/ / / /   | |  / /    <  /     / ____/ ____/
 / /   / /_/ /____| | / /_____/ /_____/ /_  / /     
/ /___/ __  /_____/ |/ /_____/ /_____/ __/ / /___   
\____/_/ /_/      |___/     /_/     /_/    \____/   
"""

def parse_args():
    p = argparse.ArgumentParser(description="HTML requirements checker")
    p.add_argument("folder", nargs="?", help="folder to scan (default: project root)")
    p.add_argument("--ignore", action="append", default=[], metavar="FOLDER",
                   help="folder name to skip (can be repeated)")
    p.add_argument("--live", action="store_true", help="re-check every 1000 ms")
    return p.parse_args()

def has_tag(html, tag):
    return re.search(rf"<{tag}[\s>]", html, re.I) is not None

def has_viewport(html):
    return re.search(r'<meta[^>]+name=["\']viewport["\']', html, re.I) is not None

def has_cta(html):
    body = re.sub(r"<(nav|footer)\b.*?</\1>", "", html, flags=re.I | re.S)
    return has_tag(body, "button") or has_tag(body, "a")

def has_nav_links(html):
    navs = re.findall(r"<nav\b.*?</nav>", html, re.I | re.S)
    for nav in navs:
        for href in re.findall(r'href=["\']([^"\']*)["\']', nav, re.I):
            if href.strip() not in ("", "#"):
                return True
    return False

def check(path):
    html = path.read_text(encoding="utf-8")
    return {
        "Navigation menu (<nav>)": has_tag(html, "nav"),
        "Hero/header (<h1>)": has_tag(html, "h1"),
        "Footer (<footer>)": has_tag(html, "footer"),
        "CTA (Call-to-Action)": has_cta(html),
        "Image (<img>)": has_tag(html, "img"),
        "Responsive (meta name=viewport)": has_viewport(html),
        "Clear structure (h2 / section)": has_tag(html, "h2") or has_tag(html, "section"),
        "Working nav links": has_nav_links(html),
    }

def main():
    sys.stdout.write(LOGO + "\n")
    folder = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    files = sorted(folder.rglob("*.html"))
    sys.stdout.write(f"Checking {len(files)} file(s) in {folder}\n")
    start = time.perf_counter()

    for f in files:
        sys.stdout.write(f"\n{f}\n")
        for name, ok in check(f).items():
            sys.stdout.write(f"  [{'OK' if ok else '--'}] {name}\n")

    elapsed = time.perf_counter() - start

    sys.stdout.write(f"\nDone in {elapsed * 1000:.8f} ms\n")

if __name__ == "__main__":
    main()