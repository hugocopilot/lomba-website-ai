from pathlib import Path
import argparse
import re
import sys
import time

BLACK = "\033[0;30m"
RED = "\033[0;31m"
GREEN = "\033[0;32m"
BLUE = "\033[0;34m"
RESET = "\033[0m"

DEFAULT_IGNORE = {"tools", "node_modules", ".venv", ".git", "pendidikan-for-later"}
LOGO = rf"""{RED}
   ________  __    _    __     ___      ____________
  / ____/ / / /   | |  / /    <  /     / ____/ ____/
 / /   / /_/ /____| | / /_____/ /_____/ /_  / /     
/ /___/ __  /_____/ |/ /_____/ /_____/ __/ / /___   
\____/_/ /_/      |___/     /_/     /_/    \____/   {RESET}
"""

def parse_args():
    p = argparse.ArgumentParser(description="Checker V1 For Competition")
    p.add_argument("folder", nargs="?", help="ts (Default : root project)")
    p.add_argument("--ignore", action="append", default=[], metavar="FOLDER",
                   help="ignore folder")
    p.add_argument("--live", action="store_true", help="every 1000ms check")
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

def find_files(folder, ignore):
    return [f for f in sorted(folder.rglob("*.html"))
            if not ignore & set(f.relative_to(folder).parts[:-1])]

def build_report(folder, ignore):
    files = find_files(folder, ignore)
    start = time.perf_counter()
    results = {f: check(f) for f in files}
    ms = (time.perf_counter() - start) * 1000
    lines = [f"Checking {len(files)} file(s) in {folder}"]
    for f, res in results.items():
        lines.append(f"\n{f.relative_to(folder)}")
        lines += [f"  [{f'{GREEN}OK{RESET}' if ok else f'{RED}--{RESET}'}] {name}" for name, ok in res.items()]
    lines.append(f"\nDone in {ms:.2f} ms")
    return "\n".join(lines)

def main():
    args = parse_args()
    default = Path(__file__).resolve().parent.parent
    folder = Path(args.folder).resolve() if args.folder else default
    ignore = DEFAULT_IGNORE | set(args.ignore)
    try:
        while True:
            report = build_report(folder, ignore)
            if args.live:
                sys.stdout.write("\033[H\033[J")
            sys.stdout.write(LOGO + report + "\n")
            sys.stdout.flush()
            if not args.live:
                break
            time.sleep(1)
    except KeyboardInterrupt:
        sys.stdout.write("\nStopped.\n")

if __name__ == "__main__":
    main()