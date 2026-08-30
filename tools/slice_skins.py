# -*- coding: utf-8 -*-
"""Taglia i fogli sprite in skin/*.png nei dodici pezzi singoli.

    python tools/slice_skins.py            # tutti i set
    python tools/slice_skins.py tucano     # solo skin/tucano.png

Il foglio deve avere il layout comune a tutti i set: due righe (bianchi sopra,
neri sotto) per sei colonne, nell'ordine pedone, torre, cavallo, alfiere,
regina, re, su sfondo trasparente.

Ogni pezzo viene isolato per componente connessa e non per riquadro: becchi,
mantelli e lame che sconfinano nello spazio del vicino restano al legittimo
proprietario. Le dodici immagini escono su una tela comune, scalate riga per
riga in modo che il re tocchi il bordo alto, e appoggiate al centro della
base: cosi' il pedone resta piu' basso del re e tutti i pezzi stanno in piedi
sulla stessa linea. Il gioco puo' quindi disegnarli tutti con la stessa
regola CSS.

Produce skin/<nome>/wP.png ... bK.png piu' preview.png, la striscia usata
dal selettore in home.

Serve Pillow, NumPy e SciPy:  pip install pillow numpy scipy
"""
import glob
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

TARGET_H = 192           # altezza delle immagini finali, in pixel
PREVIEW_H = 120          # altezza della striscia di anteprima
PREVIEW_PIECES = ['wN', 'wQ', 'bK']
ORDER = ['P', 'R', 'N', 'B', 'Q', 'K']
ALPHA = 16               # sotto questa opacita' e' sfondo
MIN_COMP = 200           # componenti piu' piccole = dettagli staccati, non pezzi


def bands(flags, min_gap):
    """Intervalli [inizio, fine) di indici pieni, separati da almeno min_gap vuoti."""
    out, start, gap = [], None, 0
    for i, v in enumerate(flags):
        if v:
            if start is None:
                start = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap >= min_gap:
                out.append((start, i - gap + 1))
                start, gap = None, 0
    if start is not None:
        out.append((start, len(flags)))
    return out


def split_widest(masks):
    """Due pezzi che si toccano: taglia il piu' largo nella sua colonna piu' vuota."""
    idx = max(range(len(masks)), key=lambda i: masks[i].any(0).sum())
    m = masks[idx]
    cols = np.where(m.any(0))[0]
    x0, x1 = cols[0], cols[-1] + 1
    lo, hi = x0 + int((x1 - x0) * .35), x0 + int((x1 - x0) * .65)
    cut = lo + int(np.argmin(m[:, lo:hi].sum(0)))
    left, right = m.copy(), m.copy()
    left[:, cut:] = False
    right[:, :cut] = False
    return masks[:idx] + [left, right] + masks[idx + 1:], cut


def pieces_of_band(mask):
    """Le sei maschere della riga, ordinate da sinistra a destra."""
    lab, n = ndimage.label(mask, structure=np.ones((3, 3)))
    sizes = ndimage.sum(mask, lab, range(1, n + 1))
    masks = [lab == i + 1 for i, s in enumerate(sizes) if s >= MIN_COMP]
    if not masks:
        raise SystemExit('riga vuota: lo sfondo del foglio non e\' trasparente?')

    centres = [np.mean(np.where(m.any(0))[0]) for m in masks]
    for i, s in enumerate(sizes):                     # i frammenti minori
        if s >= MIN_COMP:                             # tornano al pezzo piu' vicino
            continue
        frag = lab == i + 1
        fc = np.where(frag.any(0))[0]
        centre = (fc[0] + fc[-1]) / 2
        masks[min(range(len(masks)), key=lambda k: abs(centre - centres[k]))] |= frag

    while len(masks) < len(ORDER):
        masks, cut = split_widest(masks)
        print('      due pezzi attaccati: taglio a x=%d' % cut)
    if len(masks) > len(ORDER):
        raise SystemExit('trovati %d pezzi invece di %d: controlla il foglio'
                         % (len(masks), len(ORDER)))
    masks.sort(key=lambda m: np.where(m.any(0))[0][0])
    return masks


def bbox(m):
    ys, xs = np.where(m)
    return xs.min(), xs.max() + 1, ys.min(), ys.max() + 1


def base_centre(m):
    """Centro dell'appoggio: solo il 15% inferiore, cosi' un becco non sposta il pezzo."""
    y0, y1 = np.where(m.any(1))[0][[0, -1]]
    foot = m[int(y1 - (y1 - y0) * .15):y1 + 1]
    xs = np.where(foot.any(0))[0]
    return (xs[0] + xs[-1] + 1) / 2


def preview(out_dir):
    ims = []
    for code in PREVIEW_PIECES:
        im = Image.open(os.path.join(out_dir, code + '.png'))
        im.thumbnail((PREVIEW_H, PREVIEW_H), Image.LANCZOS)
        ims.append(im)
    gap = 4
    strip = Image.new('RGBA', (sum(i.width for i in ims) + gap * (len(ims) - 1), PREVIEW_H))
    x = 0
    for i in ims:
        strip.alpha_composite(i, (x, PREVIEW_H - i.height))
        x += i.width + gap
    # 256 colori: l'anteprima e' piccola e cosi' pesa un quarto
    strip.quantize(colors=256, method=Image.FASTOCTREE).save(
        os.path.join(out_dir, 'preview.png'), optimize=True)


def slice_sheet(path):
    name = os.path.splitext(os.path.basename(path))[0]
    im = Image.open(path).convert('RGBA')
    rgba = np.array(im)
    mask = rgba[..., 3] > ALPHA

    rows = bands(mask.any(1), max(4, im.height // 60))
    if len(rows) != 2:
        raise SystemExit('%s: trovate %d righe invece di 2' % (name, len(rows)))
    print('==', name, im.size)

    # prima passata: maschere, scala di riga e ingombro massimo della tela
    plan, half_w = [], 0
    for (r0, r1), colour in zip(rows, ['w', 'b']):
        masks = pieces_of_band(mask[r0:r1])
        scale = TARGET_H / max(bbox(m)[3] - bbox(m)[2] for m in masks)
        for code, m in zip(ORDER, masks):
            x0, x1, y0, y1 = bbox(m)
            cx = base_centre(m)
            half_w = max(half_w, (cx - x0) * scale, (x1 - cx) * scale)
            plan.append((colour, code, r0, m, scale, (x0, x1, y0, y1), cx))

    target_w = int(np.ceil(half_w * 2)) + 2
    out_dir = os.path.join('skin', name)
    os.makedirs(out_dir, exist_ok=True)

    for colour, code, r0, m, scale, (x0, x1, y0, y1), cx in plan:
        band = rgba[r0:r0 + m.shape[0]].copy()
        band[..., 3] = np.where(m, band[..., 3], 0)     # fuori dal pezzo: trasparente
        w = max(1, int(round((x1 - x0) * scale)))
        h = max(1, int(round((y1 - y0) * scale)))
        crop = Image.fromarray(band[y0:y1, x0:x1], 'RGBA').resize((w, h), Image.LANCZOS)

        canvas = Image.new('RGBA', (target_w, TARGET_H))
        left = int(round(target_w / 2 - (cx - x0) * scale))
        canvas.alpha_composite(crop, (max(0, min(left, target_w - w)), TARGET_H - h))
        canvas.save(os.path.join(out_dir, colour + code + '.png'), optimize=True)

    preview(out_dir)
    print('   tela %dx%d -> %s/ (12 pezzi + preview.png)' % (target_w, TARGET_H, out_dir))


def main(argv):
    sheets = [os.path.join('skin', a + '.png') for a in argv] if argv else sorted(glob.glob('skin/*.png'))
    if not sheets:
        raise SystemExit('nessun foglio trovato in skin/')
    for path in sheets:
        if not os.path.isfile(path):
            raise SystemExit('manca ' + path)
        slice_sheet(path)
    print('\nRicorda: aggiungi il nome del set a SKINS e a i18n.skins in script.js.')


main(sys.argv[1:])
