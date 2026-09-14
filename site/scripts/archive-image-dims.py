#!/usr/bin/env python3
"""Regenerate app/archive/imageDims.ts from the real files under
public/archive. Run after adding or replacing archive images:

    python3 scripts/archive-image-dims.py

Part of the 2026-09-14 layout-shift fix: the dimensions feed width/height
attributes on the lazy archive <img> tags so the browser reserves each
image's box before it loads (see imageDims.ts header)."""
from PIL import Image
import os

root = os.path.join(os.path.dirname(__file__), "..", "public", "archive")
out = os.path.join(os.path.dirname(__file__), "..", "app", "archive", "imageDims.ts")

dims = {}
for dirpath, _, files in os.walk(root):
    for f in sorted(files):
        p = os.path.join(dirpath, f)
        rel = os.path.relpath(p, root).replace(os.sep, "/")
        try:
            with Image.open(p) as im:
                dims[rel] = im.size
        except Exception:
            pass

lines = [
    "/**",
    " * GENERATED — real pixel dimensions for every file under public/archive.",
    " * Regenerate with scripts/archive-image-dims.py after adding images.",
    " *",
    " * Why this exists (2026-09-14, the layout-shift fix): the archive detail",
    ' * images are loading="lazy" with no stated size, so each one arrived at',
    " * height 0 and pushed its own caption and everything below it when it",
    " * landed — Cloudflare's CLS debug view had figure > figcaption at 20 of",
    " * 110 poor loads. With width/height on the <img>, the browser reserves",
    " * the box before the bytes arrive and nothing moves.",
    " */",
    "export const archiveImageDims: Record<string, { width: number; height: number }> = {",
]
for rel in sorted(dims):
    w, h = dims[rel]
    lines.append(f'  "{rel}": {{ width: {w}, height: {h} }},')
lines.append("};")
lines.append("")
with open(out, "w") as fh:
    fh.write("\n".join(lines))
print(f"wrote {len(dims)} entries to {out}")
