import base64
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(r"C:\Users\paul\Downloads\hope")
BRAND = ROOT / "public" / "brand"

# Latest capture passed via env file if any; else decode from stdin-less hardcoded reload
# Re-fetch by reading the most recent cdp response
logs = sorted(Path(r"C:\Users\paul\.cursor\browser-logs").glob("cdp-response-Page.captureScreenshot-*.json"))
if not logs:
    raise SystemExit("no cdp captures")
cdp = logs[-1]
print("using", cdp.name)
data = json.loads(cdp.read_text(encoding="utf-8"))
b64 = data.get("data") or data.get("result", {}).get("data")
if not b64:
    raise SystemExit("no data")
raw = base64.b64decode(b64)
cap = BRAND / "_capture.png"
cap.write_bytes(raw)
print("capture bytes", len(raw))

img = Image.open(cap).convert("L")
bw = img.point(lambda p: 255 if p > 128 else 0)
bbox = bw.getbbox()
print("bbox", bbox, "size", bw.size, "white%", sum(1 for p in bw.getdata() if p > 128) / (bw.width * bw.height))
if not bbox:
    raise SystemExit("empty")

pad = 16
l, t, r, b = bbox
l = max(0, l - pad)
t = max(0, t - pad)
r = min(bw.width, r + pad)
b = min(bw.height, b + pad)
cropped = bw.crop((l, t, r, b))
cropped.convert("RGB").save(BRAND / "africa-mask.png")
alpha = Image.new("RGBA", cropped.size, (255, 255, 255, 0))
alpha.putalpha(cropped)
alpha.save(BRAND / "africa-mask-alpha.png")
print("saved", cropped.size)

# Tighten SVG viewBox
sx = 1000 / bw.width
sy = 1000 / bw.height
vl, vt, vr, vb_ = l * sx, t * sy, r * sx, b * sy
vb = f"{vl:.2f} {vt:.2f} {vr - vl:.2f} {vb_ - vt:.2f}"
for name in ("africa-mask.svg", "africa-mask-alpha.svg", "africa.svg"):
    p = BRAND / name
    txt = p.read_text(encoding="utf-8")
    txt2 = re.sub(r'viewBox="[^"]+"', f'viewBox="{vb}"', txt, count=1)
    p.write_text(txt2, encoding="utf-8")
print("viewBox", vb)
