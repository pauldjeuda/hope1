from PIL import Image, ImageDraw
import os

src = r"C:\Users\paul\Downloads\hope\public\brand\logo-source.png"
out = r"C:\Users\paul\Downloads\hope\public\brand"

img = Image.open(src).convert("RGBA")
w, h = img.size
px = img.load()

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if r < 28 and g < 28 and b < 28:
            px[x, y] = (0, 0, 0, 0)

bbox = img.getbbox()
full = img.crop(bbox)
pad = 12
padded = Image.new("RGBA", (full.width + pad * 2, full.height + pad * 2), (0, 0, 0, 0))
padded.paste(full, (pad, pad), full)
padded.save(os.path.join(out, "logo-full.png"))

fw, fh = padded.size
mark_h = int(fh * 0.52)
mark = padded.crop((0, 0, fw, mark_h))
mb = mark.getbbox()
mark = mark.crop(mb)

side = max(mark.width, mark.height)
square = Image.new("RGBA", (side + 20, side + 20), (0, 0, 0, 0))
ox = (square.width - mark.width) // 2
oy = (square.height - mark.height) // 2
square.paste(mark, (ox, oy), mark)
square.save(os.path.join(out, "logo-mark.png"))


def circle_badge(fg: Image.Image, bg_rgb: tuple[int, int, int, int], size: int = 256) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    draw.ellipse((2, 2, size - 3, size - 3), fill=bg_rgb)
    m = fg.copy()
    m.thumbnail((int(size * 0.78), int(size * 0.78)), Image.Resampling.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    return canvas


cream = (244, 240, 232, 255)
circle_badge(square, cream).save(os.path.join(out, "logo-mark-cream.png"))
square.resize((256, 256), Image.Resampling.LANCZOS).save(os.path.join(out, "logo-mark-512.png"))
circle_badge(square, cream, 192).save(os.path.join(out, "icon-192.png"))
circle_badge(square, cream, 512).save(os.path.join(out, "icon-512.png"))
circle_badge(square, cream, 180).save(os.path.join(out, "apple-touch-icon.png"))
circle_badge(square, cream, 32).save(os.path.join(out, "favicon-32.png"))

ratio = padded.height / padded.width
target_w = min(900, padded.width)
padded.resize((target_w, int(target_w * ratio)), Image.Resampling.LANCZOS).save(
    os.path.join(out, "logo-color.png")
)

print("full", padded.size, "mark", square.size)
print("done")
