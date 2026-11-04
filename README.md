# Meine Rezepte

Web-App für den Home-Bildschirm des iPad (ausgelegt für iPad mini 4 mit iPadOS 15). Sie zeigt, wie lange der Medikamentenvorrat reicht und wann ein neues Rezept fällig ist.

- Der Vorrat zählt jeden Tag von selbst herunter.
- Ablauf je Medikament: anfordern → angefordert → erhalten → eingelöst (Bestand steigt um die Packungsgröße).
- Alle Einträge bleiben im lokalen Speicher des Geräts. Es gibt keinen Server und keine Synchronisation.
- Nach dem ersten Öffnen läuft die App ohne Internet.
- Packungen lassen sich per PZN-Barcode oder Datamatrix scannen. Gespeichert wird nur die Produktnummer. Die Scan-Bibliothek liegt unter `vendor/` ([ZXing](https://github.com/zxing-js/library), Apache-2.0).
- Hinweise erscheinen beim Öffnen der App, nicht als Hintergrundmitteilung.

## Veröffentlichung

Ein Push auf `main` veröffentlicht die Dateien über GitHub Pages (`.github/workflows/pages.yml`). Der Pages-Source muss auf **GitHub Actions** stehen.

## Installation auf dem iPad

1. Die HTTPS-Adresse in Safari öffnen.
2. Teilen → Zum Home-Bildschirm.
3. Die App vom Home-Bildschirm einmal mit Internet starten, bis unten „Offline bereit“ steht.
4. Erst dort Medikamente eintragen, denn Safari und die Home-Bildschirm-App speichern getrennt.
