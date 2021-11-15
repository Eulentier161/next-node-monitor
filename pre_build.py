from requests import get
from pathlib import Path

with open(Path("./config.ts").resolve(), "r") as f:
    address = f.readline().split("'")[1]

svg = get(f"https://monkey.banano.cc/api/v1/monkey/{address}").text
with open(Path("./public/monkey.svg").resolve(), "w") as f:
    f.write(svg)
