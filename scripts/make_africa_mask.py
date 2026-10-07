"""Build a solid Africa silhouette from Wikimedia BlankMap-Africa.svg."""
from __future__ import annotations

import re
import sys
from pathlib import Path
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
BRAND = ROOT / "public" / "brand"
SRC = BRAND / "_africa_try.svg"
OUT_SVG = BRAND / "africa-mask.svg"
OUT_ALPHA_SVG = BRAND / "africa-mask-alpha.svg"
OUT_OUTLINE = BRAND / "africa.svg"

MAIN_TRANSFORM = "matrix(1.59433, 0, 0, 1.59433, -1721.78, -693.262)"
NS = "http://www.w3.org/2000/svg"

# Hors silhouette continent + Madagascar
DROP_IDS = {
    "cv", "cv.", "km", "km.", "mu", "mu-", "sc", "sc-", "re", "re-",
    "yt", "yt-", "sh", "sh-", "st", "st.", "pt-30", "pt-30-", "pt-30_",
    "es-cn", "es-cn-",
}
DROP_ID_PREFIXES = ("pt-30", "es-cn", "cv", "km", "mu", "sc", "re", "yt", "sh", "st")


def extract_matrix_inner(svg_text: str) -> str:
    m = re.search(
        r'<g\b[^>]*transform="matrix\(1\.59433[^"]*"[^>]*>',
        svg_text,
    )
    if not m:
        raise RuntimeError("Main matrix group not found")
    start = m.end()
    depth = 1
    i = start
    while i < len(svg_text) and depth:
        next_open = svg_text.find("<g", i)
        next_close = svg_text.find("</g>", i)
        if next_close < 0:
            break
        if next_open >= 0 and next_open < next_close:
            depth += 1
            i = next_open + 2
        else:
            depth -= 1
            if depth == 0:
                return svg_text[start:next_close]
            i = next_close + 4
    raise RuntimeError("Could not close matrix group")


def should_drop(elem: ET.Element) -> bool:
    eid = elem.get("id") or ""
    cls = elem.get("class") or ""
    if "circle" in cls.split() or "lake" in cls.split():
        return True
    if eid in DROP_IDS:
        return True
    if any(eid.startswith(p) for p in DROP_ID_PREFIXES):
        return True
    if elem.tag.endswith("circle"):
        return True
    return False


def clean_tree(inner_xml: str) -> str:
    wrapped = (
        f'<g xmlns="{NS}" transform="{MAIN_TRANSFORM}">'
        f"{inner_xml}</g>"
    )
    root = ET.fromstring(wrapped)

    # Remove unwanted nodes (bottom-up)
    parents = {c: p for p in root.iter() for c in p}
    for elem in list(root.iter()):
        if elem is root:
            continue
        if should_drop(elem):
            parent = parents.get(elem)
            if parent is not None:
                parent.remove(elem)

    # Style all remaining paths
    for elem in root.iter():
        tag = elem.tag.split("}")[-1]
        if tag == "path":
            elem.set("fill", "#ffffff")
            elem.set("stroke", "#ffffff")
            elem.set("stroke-width", "1.4")
            elem.set("stroke-linejoin", "round")
            for k in list(elem.attrib):
                if k.startswith("stroke-") and k not in ("stroke-width", "stroke-linejoin"):
                    del elem.attrib[k]

    # Serialize without ns0: prefixes (browsers + CSS masks prefer default xmlns)
    ET.register_namespace("", NS)
    parts = []
    for child in root:
        s = ET.tostring(child, encoding="unicode")
        s = s.replace("ns0:", "").replace(f' xmlns:ns0="{NS}"', "")
        s = s.replace(f' xmlns="{NS}"', "")
        parts.append(s)
    return "\n".join(parts)


def build_svg(inner: str, *, mode: str) -> str:
    fill = "#ffffff"
    if mode == "outline":
        inner = inner.replace('fill="#ffffff"', 'fill="#000000"').replace(
            'stroke="#ffffff"', 'stroke="#000000"'
        )
        fill = "#000000"
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="{NS}" viewBox="0 0 1000 1000" width="1000" height="1000">',
    ]
    if mode == "mask":
        parts.append('<rect width="1000" height="1000" fill="#000000"/>')
    parts.append(f'<g transform="{MAIN_TRANSFORM}">')
    parts.append(inner)
    parts.append("</g></svg>")
    return "\n".join(parts)


def main() -> None:
    text = SRC.read_text(encoding="utf-8", errors="ignore")
    inner_raw = extract_matrix_inner(text)
    # Strip styles first for cleaner parse
    inner_raw = re.sub(r'\sstyle="[^"]*"', "", inner_raw)
    inner = clean_tree(inner_raw)
    path_count = inner.count("<path")
    print("paths in mask:", path_count)
    if path_count < 20:
        raise SystemExit(f"Too few paths after clean: {path_count}")

    for path, mode in (
        (OUT_SVG, "mask"),
        (OUT_ALPHA_SVG, "alpha"),
        (OUT_OUTLINE, "outline"),
    ):
        svg = build_svg(inner, mode=mode)
        path.write_text(svg, encoding="utf-8")
        ET.fromstring(svg)  # validate
        print("OK", path.name)

    print("Done — use browser capture for PNG if needed")


if __name__ == "__main__":
    main()
