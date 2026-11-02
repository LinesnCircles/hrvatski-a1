#!/usr/bin/env python3
"""Generate launcher icons for the Hrvatski A1 app.

Design: the Croatian šahovnica (5x5 red/white checkerboard).
Writes res/drawable/ic_launcher_foreground.xml (adaptive-icon foreground)
and res/mipmap-*/ic_launcher.png (legacy icons).
Requires: pip install pillow
"""
import os
import sys

from PIL import Image, ImageDraw

RED = "#C8102E"
WHITE = "#FFFFFF"
BORDER = "#9E0B24"

RES = os.path.join(os.path.dirname(__file__), "..", "app", "src", "main", "res")

SIZES = {
    "mdpi": 48,
    "hdpi": 72,
    "xhdpi": 96,
    "xxhdpi": 144,
    "xxxhdpi": 192,
}


def checkerboard(draw, x0, y0, cell, n=5, color=RED):
    for r in range(n):
        for c in range(n):
            if (r + c) % 2 == 0:
                draw.rectangle(
                    [x0 + c * cell, y0 + r * cell, x0 + (c + 1) * cell - 1, y0 + (r + 1) * cell - 1],
                    fill=color,
                )


def png_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    margin = max(2, size // 14)
    radius = max(4, size // 5)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=WHITE, outline=BORDER, width=max(1, size // 32))
    cell = (size - 2 * margin) / 5.0
    checkerboard(d, margin, margin, cell)
    return img


def vector_foreground():
    n = 5
    board = 72.0
    cell = board / n
    off = (108.0 - board) / 2.0
    paths = []
    for r in range(n):
        for c in range(n):
            if (r + c) % 2 == 0:
                x0 = off + c * cell
                y0 = off + r * cell
                paths.append(
                    'M%.2f %.2fh%.2fv%.2fh-%.2fz' % (x0, y0, cell, cell, cell)
                )
    return (
        '<?xml version="1.0" encoding="utf-8"?>\n'
        '<vector xmlns:android="http://schemas.android.com/apk/res/android"\n'
        '    android:width="108dp"\n'
        '    android:height="108dp"\n'
        '    android:viewportWidth="108"\n'
        '    android:viewportHeight="108">\n'
        '    <path\n'
        '        android:fillColor="%s"\n'
        '        android:pathData="%s" />\n'
        '</vector>\n' % (RED, " ".join(paths))
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
