# Meine Rezepte

Web-App für den Home-Bildschirm des iPad (ausgelegt für iPad mini 4 mit iPadOS 15). Sie zeigt, wie lange der Medikamentenvorrat reicht und wann ein neues Rezept fällig ist.

- Der Vorrat zählt jeden Tag von selbst herunter.
- Ablauf je Medikament: anfordern → angefordert → erhalten → eingelöst (Bestand steigt um die Packungsgröße).
- Alle Einträge bleiben im lokalen Speicher des Geräts. Es gibt keinen Server und keine Synchronisation.
- Nach dem ersten Öffnen läuft die App ohne Internet.
- Packungen lassen sich per PZN-Barcode oder Datamatrix scannen. Gespeichert wird nur die Produktnummer. Die Scan-Bibliothek liegt unter `vendor/` ([ZXing](https://github.com/zxing-js/library), Apache-2.0).
- Hinweise erscheinen beim Öffnen der App, nicht als Hintergrundmitteilung.

## Datensicherung und Beispieldaten

Unter „Sicherung“ erstellt die App eine JSON-Datei mit allen Einträgen. „Wiederherstellen“ liest eine solche Datei ein und **ersetzt dabei alle Einträge auf dem Gerät**.

`beispieldaten.json` enthält fünf erfundene Medikamente in diesem Format, damit jeder Zustand einmal vorkommt: ausreichend, knapp, angefordert und erhalten. Ihr Bestand zählt ab dem 13.11.2026 herunter.

## Icon

`icon.svg` ist die Vorlage. Die Dateien `icon-180.png` (Home-Bildschirm des iPad) sowie `icon-192.png` und `icon-512.png` (Manifest) werden daraus erzeugt. Nach einer Änderung müssen alle drei PNGs neu erzeugt werden. iOS speichert das Icon beim Hinzufügen zum Home-Bildschirm. Ein neues Icon erscheint deshalb erst, wenn die App dort neu hinzugefügt wird. Vorher eine Sicherung erstellen.

## Updates

Bei jeder Änderung die Cache-Version in `sw.js` (`meine-rezepte-vN`) und die Version in der Fußzeile von `index.html` gemeinsam erhöhen. Die App lädt die neuen Dateien im Hintergrund und nutzt sie ab dem nächsten Start.

## Veröffentlichung

Ein Push auf `main` veröffentlicht die Dateien über GitHub Pages (`.github/workflows/pages.yml`). Der Pages-Source muss auf **GitHub Actions** stehen.

## Installation auf dem iPad

1. Die HTTPS-Adresse in Safari öffnen.
2. Teilen → Zum Home-Bildschirm.
3. Die App vom Home-Bildschirm einmal mit Internet starten, bis unten „Offline bereit“ steht.
4. Erst dort Medikamente eintragen, denn Safari und die Home-Bildschirm-App speichern getrennt.
