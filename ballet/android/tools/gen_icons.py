#!/usr/bin/env python3
"""Generate launcher icons for the Ballet 1830-1930 app.

Design: a gold tutu "fan" (radiating pleats) on the app's dark background.
Writes res/drawable/ic_launcher_foreground.xml (adaptive-icon foreground)
and res/mipmap-*/ic_launcher.png (legacy icons).
Requires: pip install pillow
"""
import math
import os
import sys

from PIL import Image, ImageDraw

GOLD = "#D4AF37"
GOLD_DARK = "#A8842A"
DARK = "#14100C"

RES = os.path.join(os.path.dirname(__file__), "..", "app", "src", "main", "res")

SIZES = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192,
}


def tutu(draw, cx, cy, radius, n=13):
    """A pancake tutu: filled pleat wedges fanning downward from the waist."""
    r_in = radius * 0.18
    for i in range(n - 1):
        a1 = math.radians(200 + (140.0 / (n - 1)) * i)
        a2 = math.radians(200 + (140.0 / (n - 1)) * (i + 1))
        col = GOLD if i % 2 == 0 else GOLD_DARK
        pts = [
            (cx + r_in * math.cos(a1), cy + r_in * math.sin(a1)),
            (cx + radius * math.cos(a1), cy + radius * math.sin(a1)),
            (cx + radius * math.cos(a2), cy + radius * math.sin(a2)),
            (cx + r_in * math.cos(a2), cy + r_in * math.sin(a2)),
        ]
        draw.polygon(pts, fill=col)
    draw.arc([cx - radius, cy - radius, cx + radius, cy + radius],
             start=200, end=340, fill=GOLD, width=max(1, int(radius * 0.06)))
    draw.line([cx - r_in, cy, cx + r_in, cy], fill=GOLD, width=max(1, int(radius * 0.07)))
    draw.ellipse([cx - 2.5, cy - 2.5, cx + 2.5, cy + 2.5], fill=GOLD)


def png_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    radius = max(4, size // 14)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=DARK)
    cx, cy = size / 2.0, size * 0.40
    tutu(d, cx, cy, size * 0.40, n=13)
    return img


def vector_foreground():
    n = 13
    cx, cy, r = 54.0, 44.0, 42.0
    r_in = r * 0.18
    paths = []
    for i in range(n - 1):
        a1 = math.radians(200 + (140.0 / (n - 1)) * i)
        a2 = math.radians(200 + (140.0 / (n - 1)) * (i + 1))
        col = GOLD if i % 2 == 0 else GOLD_DARK
        p = ("M%.2f %.2fL%.2f %.2fL%.2f %.2fL%.2f %.2fz"
             % (cx + r_in * math.cos(a1), cy + r_in * math.sin(a1),
                cx + r * math.cos(a1), cy + r * math.sin(a1),
                cx + r * math.cos(a2), cy + r * math.sin(a2),
                cx + r_in * math.cos(a2), cy + r_in * math.sin(a2)))
        paths.append((col, p))
    body = "".join(
        '    <path android:fillColor="%s" android:pathData="%s" />\n' % (c, p)
        for c, p in paths
    )
    extras = (
        f'    <path android:strokeColor="{GOLD}" android:strokeWidth="2.6" android:strokeLineCap="round"\n'
        f'        android:pathData="M{cx - r:.2f} {cy:.2f}A{r:.2f} {r:.2f} 0 0 1 {cx + r:.2f} {cy:.2f}" />\n'
        f'    <path android:strokeColor="{GOLD}" android:strokeWidth="3" android:strokeLineCap="round"\n'
        f'        android:pathData="M{cx - r_in:.2f} {cy:.2f}h{2 * r_in:.2f}" />\n'
        f'    <path android:fillColor="{GOLD}" android:pathData="M{cx - 2.6:.2f} {cy - 2.6:.2f}a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0 -5.2 0" />\n'
    )
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<vector xmlns:android="http://schemas.android.com/apk/res/android"\n'
        '    android:width="108dp"\n'
        '    android:height="108dp"\n'
        '    android:viewportWidth="108"\n'
        '    android:viewportHeight="108">\n'
        + body + extras +
        '</vector>\n'
    )


def main():
    for bucket, size in SIZES.items():
        d = os.path.join(RES, "mipmap-" + bucket)
        os.makedirs(d, exist_ok=True)
        png_icon(size).save(os.path.join(d, "ic_launcher.png"))
        print("wrote", os.path.join(d, "ic_launcher.png"))
    d = os.path.join(RES, "drawable")
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "ic_launcher_foreground.xml"), "w", encoding="utf-8") as f:
        f.write(vector_foreground())
    print("wrote", os.path.join(d, "ic_launcher_foreground.xml"))


if __name__ == "__main__":
    sys.exit(main())
