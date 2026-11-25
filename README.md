# Lomba Design Web AI

Website profil Al-Irsyad Al-Islamiyyah Bandung, dibuat untuk lomba desain web.

Live demo: https://lomba-website-ai.vercel.app

## Fitur

- Splash animation
- Teks animation
- Pilihan tampilan: Interaktif atau Sederhana (tersimpan di localStorage)
- Responsif untuk HP dan desktop
- Navigasi, hero, CTA, dan footer

## Menjalankan secara lokal

1. Clone repo: `git clone https://github.com/hugocopilot/lomba-website-ai.git`
2. Buka folder di VS Code / Code Editor
3. Jalankan dengan Live Server, atau buka `index.html` di browser

## Struktur folder

```
.
├── assets
│   ├── al-irsyad-logo.png
│   ├── al-irysad-logolpp.png
│   ├── itoshi_sae.jpeg
│   ├── o1.png
│   ├── o2.png
│   └── o3.png
├── css
│   ├── about.css
│   ├── contact.css
│   ├── home.css
│   ├── main.css
│   └── splash.css
├── js
│   ├── concepts.js
│   ├── doodles.js
│   ├── mode.js
│   ├── transitions.js
│   └── words.js
├── tools
│   ├── checker.py
│   └── cp437
├── about.html
├── contact.html
├── home.html
├── index.html
├── LICENSE
├── README.md
├── report.txt
└── vercel.json

5 directories, 26 files
```

## Pengecek syarat

```
python tools/check.py --live --out
```

## Teknologi

HTML, CSS, JavaScript, Python, Vercel

## Pembuat

Alfaz dan Gabriel