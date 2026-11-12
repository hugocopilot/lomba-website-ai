from pathlib import Path
import re
import asyncio

LOGO = r"""
   ________  __    _    __     ___      ____________
  / ____/ / / /   | |  / /    <  /     / ____/ ____/
 / /   / /_/ /____| | / /_____/ /_____/ /_  / /     
/ /___/ __  /_____/ |/ /_____/ /_____/ __/ / /___   
\____/_/ /_/      |___/     /_/     /_/    \____/   
"""

def has_tag(html, tag):
    return re.search(rf"<{tag}[\s>]", html, re.I) is not None

def has_viewport(html):
    return re.search(r'<meta[^>+name=["\']viewport["\']', html, re.I) is not None

def has_cta(html):
    body = re.sub(r"<(nav|footer)\b.*?</\1>", "", html, flags=re.I | re.S)
    return has_tag(body, "button") or has_tag(body, "a")

def has_nav_links(html):
    navs = re.findall(r"<nav\b.*?,/nav>", html, re.I | re.S)
    for nav in navs:
        for href in re.findall(r'href=["\']([^"\']*)["\']', nav, re.I):
            if href.strip() not in ("", "#"):
                return True
    return False

def check(path):
    html = path.read_text(encoding="utf-8")
    return {
        ""
    }

def main():
    print(LOGO)
    print("Checking...")

if __name__ == "__main__":
    main()