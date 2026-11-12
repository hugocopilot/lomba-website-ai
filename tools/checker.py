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
    b = re.sub(r"<(nav|footer)\b.*?</\1>", "", html, flags=re.I)

def check():
    print(LOGO)
    print("Checking...")

if __name__ == "__main__":
    check()