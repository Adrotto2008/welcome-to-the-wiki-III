# Welcome to the Wiki III (WTTG3 Assistant) 🕵️‍♂️💻

> Una wiki non ufficiale avanzata e suite di **trainer interattivi** per il videogioco **Welcome to the Game III** (Reflect Studios).

---

## 📋 Cos'è il Progetto

**Welcome to the Wiki III** è un'applicazione web statica sviluppata interamente con tecnologie web vanilla (HTML5, CSS3, JavaScript), concepita come assistente tattico e base di conoscenza completa per sopravvivere alle minacce di *Welcome to the Game III*. 

Il progetto unisce la documentazione approfondita delle meccaniche di gioco a **mini-giochi di allenamento (trainer)** riprodotti fedelmente per permettere ai giocatori di fare pratica offline con i sistemi di hacking e difesa del gioco.

---

## ✨ Caratteristiche Principali

### 1. 🔍 Evidence Board delle Minacce (	hreats.html)
Una bacheca dossier interattiva dedicata agli antagonisti e alle minacce incontrate nel gioco (tra cui Noir, Tanner, Cletus, Lucas, il Rapitore, il Respiratore e Tucker).
- **Ricerca testuale istantanea** e filtri per stato (*Confermato* vs *Community*).
- **Modali di dettaglio** con dossier completi, indizi acustici/visivi (*cues*), fonti e contromisure difensive.

### 2. 🧠 Trainer Interattivi di Hacking (	rainers.html)
Sei stanco di fallire i minigiochi di hacking nel momento cruciale della partita? Questa sezione include **5 versioni giocabili e ottimizzate** dei minigiochi di difesa del gioco originale:
- **Kernel (	rainers-kernel.js):** Gestione dei flussi di memoria e override dei processi.
- **MemDealloc (	rainers-memdealloc.js):** Pulizia rapida dei segmenti di memoria corrotti.
- **ShiftSeq (	rainers-shiftseq.js):** Il minigioco più complesso, basato sullo spostamento tra nodi infetti (WASD) con gestione energetica e finestre temporali precise di sincronizzazione con la home.
- **StackPusher (	rainers-stackpusher.js):** Gestione dello stack e inserimento sequenziale di blocchi dati.
- **Tokenine (	rainers-tokenine.js):** Validazione di token crittografici sotto pressione temporale.

*Tutti i trainer utilizzano un motore di rendering basato su tick (100ms) ad alta efficienza che aggiorna direttamente gli elementi DOM esistenti, evitando la rigenerazione dell'HTML per preservare fluidità e animazioni CSS.*

### 3. 🌐 Guide VirtMesh e Hacking (irtmesh.html & hacks.html)
- Documentazione dettagliata dello spazio di rete in-game (**VirtMesh**), spiegazione dei comandi MOUNT/MINE e risoluzione del puzzle **INJ3KT-R**.
- Analisi approfondita dei meccanismi di difesa e delle penalità.

### 4. 📚 Sezione Research & Lore (
esearch/)
Contiene una raccolta di documenti Markdown strutturati che analizzano:
- Panoramica del gioco e lore dei personaggi.
- Economia darknet, siti e orari di attività.
- Distinzione rigorosa tra informazioni verificate in-game e ipotesi della community.

---

## 🏛️ Architettura Tecnica

Il progetto è volutamente leggero e privo di dipendenze esterne o framework pesanti:
- **Zero Build Tools / Framework:** HTML/CSS/JS puro, eseguibile ovunque.
- **Moduli JavaScript:**
  - js/app.js: Logica principale dell'hub e rendering dinamico delle card minacce da js/threats-data.js.
  - js/nav.js: Gestione della navigazione unificata.
  - js/trainers-common.js: Infrastruttura condivisa per la gestione dei tab e dei contesti di allenamento.
  - js/trainers-*.js: Moduli isolati (IIFE) per ciascun minigioco di hacking.
- **CSS Modulare:** Fogli di stile dedicati per stili globali (styles.css), navigazione (
av.css), hack (hacks.css), trainer (	rainers.css) e virtmesh (irtmesh.css).

---

## 🚀 Come Eseguire il Progetto

Trattandosi di un sito puramente statico, non richiede alcuna installazione di Node.js o configurazioni complesse:

1. Clona o scarica la repository.
2. Apri il file index.html direttamente nel tuo browser preferito (Chrome, Firefox, Edge, etc.).
   *(Opzionale)* Per un'esperienza ottimale con Live Reload, puoi aprirlo tramite estensioni come **Live Server** in VS Code.

---

## 📜 Licenza

Progetto open source sviluppato a scopo didattico e di companion gaming per la community di *Welcome to the Game III*.
