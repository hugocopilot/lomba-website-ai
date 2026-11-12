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
    return re.search(rf"<")

def check():
    print(LOGO)
    print("Checking...")

if __name__ == "__main__":
    check()