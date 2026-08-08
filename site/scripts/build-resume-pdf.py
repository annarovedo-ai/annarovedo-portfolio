#!/usr/bin/env python3
"""Build public/anna-rovedo-resume.pdf from app/resumeData.ts.

The download button on /resume and /about pointed at this file for weeks
before it existed; a recruiter clicking "Download resume" got a 404. This
script generates it FROM the same resumeData.ts the pages render, so the PDF
and the site cannot drift apart: edit resumeData.ts, re-run this, commit both.

Run from the site/ directory:  python3 scripts/build-resume-pdf.py
Requires: reportlab (pip install reportlab).

Typeface note: Times + Helvetica, deliberately. They mirror the site's
serif-display / sans-label scheme, embed everywhere, and a resume PDF gets
opened in worse viewers than a browser. Do not add novelty fonts here.
"""
import re
from pathlib import Path

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table,
    TableStyle, HRFlowable, KeepTogether,
)

ROOT = Path(__file__).resolve().parent.parent
SRC = (ROOT / "app" / "resumeData.ts").read_text()
OUT = ROOT / "public" / "anna-rovedo-resume.pdf"

# ---- parse resumeData.ts (regex, not a TS parser: the file is plain data) ----
def block(name):
    m = re.search(r"export const %s\s*=\s*\[(.*?)\n\];" % name, SRC, re.S)
    return m.group(1)

def strings(text):
    return re.findall(r'"((?:[^"\\]|\\.)*)"', text)

def entries(name):
    depth, start, out = 0, None, []
    text = block(name)
    for i, ch in enumerate(text):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                out.append(text[start + 1:i])
    return out

# Brace-walking, not a regex alternation: a first draft of this parser used a
# findall with an alternation and silently dropped the middle expertise group.
# If the PDF ever loses a section, suspect the parsing here first.
expertise = [
    (re.search(r'group: "(.*?)"', e).group(1),
     strings(re.search(r"items: \[(.*?)\]", e, re.S).group(1)))
    for e in entries("expertise")
]

experience = []
for e in entries("experience"):
    experience.append({
        "client": re.search(r'client: "(.*?)"', e).group(1),
        "role": re.search(r'role: "(.*?)"', e).group(1),
        "via": (re.search(r'via: "(.*?)"', e) or [None, None])[1],
        "bullets": strings(re.search(r"bullets: \[(.*?)\]", e, re.S).group(1)),
    })
earlier = [
    {"org": re.search(r'org: "(.*?)"', e).group(1),
     "role": re.search(r'role: "(.*?)"', e).group(1),
     "body": re.search(r'body: "(.*?)"', e).group(1)}
    for e in entries("earlier")
]
profile = strings(block("defaultProfile"))
education = [
    {"school": re.search(r'school: "(.*?)"', e).group(1),
     "detail": re.search(r'detail: "(.*?)"', e).group(1)}
    for e in entries("education")
]

def tidy(s):
    return s.replace("\\u2019", "’").replace("\\'", "'").replace("IBM's", "IBM’s")

# ---- palette: the site's tokens, print-adjusted ----
INK, BODY, MUTED, LINE, BLUE = (HexColor(c) for c in
    ("#111111", "#333333", "#555555", "#c9c9c4", "#1a365d"))

S = {
    "name":    ParagraphStyle("name", fontName="Times-Bold", fontSize=24, leading=26, textColor=INK),
    "title":   ParagraphStyle("title", fontName="Helvetica-Bold", fontSize=9, leading=13, textColor=BLUE),
    "contact": ParagraphStyle("contact", fontName="Helvetica", fontSize=8.5, leading=12, textColor=MUTED),
    "label":   ParagraphStyle("label", fontName="Helvetica-Bold", fontSize=7.5, leading=11, textColor=MUTED, spaceBefore=14, spaceAfter=5),
    "body":    ParagraphStyle("body", fontName="Times-Roman", fontSize=9.5, leading=13, textColor=BODY, spaceAfter=5),
    "role":    ParagraphStyle("role", fontName="Times-Bold", fontSize=11, leading=14, textColor=INK, spaceBefore=9),
    "via":     ParagraphStyle("via", fontName="Times-Italic", fontSize=8.5, leading=11, textColor=MUTED, spaceAfter=2),
    "bullet":  ParagraphStyle("bullet", fontName="Times-Roman", fontSize=9, leading=12, textColor=BODY, leftIndent=10, bulletIndent=2, spaceAfter=1.5),
    "cell_h":  ParagraphStyle("cell_h", fontName="Times-Bold", fontSize=9.5, leading=12, textColor=INK),
    "cell_r":  ParagraphStyle("cell_r", fontName="Helvetica", fontSize=7, leading=10, textColor=MUTED),
    "cell_b":  ParagraphStyle("cell_b", fontName="Times-Roman", fontSize=8.5, leading=11, textColor=BODY),
}
def tracked(text):
    """Fake letterspacing: gaps within words, triple gaps between them.
    A bare " ".join erases the word boundaries entirely."""
    return "&nbsp;&nbsp;&nbsp;".join(" ".join(w) for w in text.upper().split())

def label(text):
    return Paragraph(tracked(text), S["label"])

doc = BaseDocTemplate(str(OUT), pagesize=letter,
    leftMargin=52, rightMargin=52, topMargin=48, bottomMargin=44,
    title="Anna Rovedo, Principal Experience Designer",
    author="Anna Rovedo")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
doc.addPageTemplates([PageTemplate(id="p", frames=[frame])])

story = [
    Paragraph("Anna Rovedo", S["name"]),
    Spacer(1, 3),
    Paragraph(tracked("Principal Experience Designer"), S["title"]),
    Paragraph("anna.rovedo@gmail.com", S["contact"]),
    Spacer(1, 8),
    HRFlowable(width="100%", thickness=0.7, color=LINE),
    label("Profile"),
]
story += [Paragraph(tidy(p), S["body"]) for p in profile]

story.append(label("Core expertise"))
for group, items in expertise:
    story.append(Paragraph(
        '<font name="Helvetica-Bold" size="8" color="#555555">%s&nbsp;&nbsp;</font>%s'
        % (group.upper(), ", ".join(items)), S["body"]))

story.append(label("Selected experience"))
for e in experience:
    chunk = [Paragraph(
        '%s&nbsp;&nbsp;<font name="Times-Italic" size="9" color="#555555">%s</font>'
        % (e["client"], e["role"]), S["role"])]
    if e["via"]:
        chunk.append(Paragraph(tidy(e["via"]), S["via"]))
    chunk += [Paragraph(tidy(b), S["bullet"], bulletText="–") for b in e["bullets"]]
    story.append(KeepTogether(chunk))

story.append(label("Earlier selected experience"))
rows, row = [], []
for e in earlier:
    cell = [Paragraph(e["org"], S["cell_h"]),
            Paragraph(tracked(e["role"]), S["cell_r"]),
            Paragraph(tidy(e["body"]), S["cell_b"])]
    row.append(cell)
    if len(row) == 2:
        rows.append(row); row = []
if row:
    rows.append(row + [""])
t = Table(rows, colWidths=[doc.width / 2 - 6, doc.width / 2 - 6], hAlign="LEFT")
t.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 12),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
]))
story.append(t)

story.append(label("Education"))
for e in education:
    story.append(Paragraph(
        "<b>%s</b> &nbsp;–&nbsp; %s" % (e["school"], tidy(e["detail"])), S["body"]))

doc.build(story)
print("wrote", OUT)
