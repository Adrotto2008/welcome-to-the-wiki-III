# Welcome to the Game III — Hacking, VirtMesh, DOSCoin ed economia

## Panoramica del sistema

Il sistema di hacking di WTTG3 è l'evoluzione diretta di **SkyNET** (il sistema equivalente in *Welcome to the Game II*). Il giocatore hackera più "utenti" (macchine virtuali) attraverso l'app **VirtMesh**, saltando da un utente all'altro per: cercare le chiavi nascoste nel dark net, minare DOSCoin, e vendere link/servizi. Usare troppo a lungo una singola rete/utente comporta il rischio di **perderla permanentemente**.

Le tre app di base fondamentali da acquistare per prime su DarkDrop sono:
1. **VirtMesh** — software di hacking che permette di navigare il dark net tramite macchine virtuali (50 DOSCoin)
2. **ShadowFetch** — converte URL in file MP4 scaricabili, richiesti da altri utenti su ACRS (30 DOSCoin); usato anche per "doxare" persone in vista di assassini a pagamento
3. **A.C.R.S. (Anon Chat Relay Service)** — chat globale che mette in contatto il giocatore con concorrenti, hacker, spacciatori e altri utenti del dark web (30 DOSCoin); permette di assoldare sicari/hacker e comprare/vendere link

## Come si guadagna DOSCoin

Fonti multiple concordano sulle stesse vie principali:
1. **Backdoor Hack:** contrastare con successo un attacco hacking in arrivo frutta DOSCoin (oggetto monouso, 5 DOSCoin, va riacquistato ogni volta che si consuma)
2. **Vendita di link/file:** gli NPC su ACRS chiedono periodicamente link a siti o file scaricati tramite ShadowFetch, pagando in DOSCoin (i file scaricati rendono generalmente di più dei semplici link, spesso intorno a 40 DOS)
3. **Mining su VirtMesh:** una volta hackerata una macchina virtuale, la si può impostare a minare DOSCoin nel tempo tramite **VM Crypto Miner** (50 DOSCoin, monouso); ogni utente ha un tasso di generazione diverso (vedi tabella sotto)

Completare le richieste degli NPC su ACRS costruisce anche la **Reputazione (Rep)**: alcuni "decrypter" (necessari per decifrare le chiavi) si rifiutano di parlare col giocatore se il livello di Rep è inferiore a 5. Anche respingere con successo un hack dà Rep XP. La chat ACRS si "resetta" ogni mezz'ora, quindi conviene contattare ("pingare") subito gli utenti di interesse.

## Reputazione (Rep) — dettaglio

**Come si ottiene:**
1. **Richieste NPC su A.C.R.S.** — fonte principale. Gli NPC chiedono link/URL (reperibili sul Dark Wiki, copiabili anche se il sito risulta bloccato) oppure file video, ottenuti scaricando URL `.fetch` e convertendoli in MP4 con **ShadowFetch**. Le richieste di **video rendono di più** sia in DOSCoin che in Rep rispetto ai semplici link.
2. **Contrastare con successo un hack** (uno qualsiasi dei 5 minigiochi) — dà Rep XP oltre al DOSCoin del Backdoor Hack.

**Come velocizzarla (consigli dalle guide comunitarie):**
- Dare priorità alle richieste **video** su ACRS rispetto ai semplici URL: stesso rischio/tempo, resa maggiore.
- **Pingare subito** ogni richiesta di interesse prima del reset di 30 minuti della chat: il ping apre un thread privato su CryptChat che sopravvive al reset, permettendo di completarla con calma in un secondo momento.
- Mantenere sempre un **Backdoor Hack** attivo invece di affidarsi solo ai Firewall automatici: ogni hack respinto è anche Rep, quindi bloccare gli attacchi passivamente con un firewall toglie una fonte di reputazione oltre che di reddito.
- Costruire Rep **presto**, nella prima ora prima delle 21:30, perché alcuni decrypter necessari per le chiavi si rifiutano di collaborare sotto **Rep livello 5**.
- Gli **spacciatori (dealer)** su ACRS mostrano il proprio livello Rep cliccando sul loro username: si può ottenere il loro Dealer ID (da inserire su DAREdash) solo se il proprio Rep è al loro livello o superiore; il Dealer ID non è persistente tra le run, va ripreso ogni volta.

**[COMUNITARIO]** Non risultano ancora fonti ufficiali che specifichino i valori numerici esatti di Rep XP per azione (es. quanti punti dà una richiesta video vs un hack bloccato) — dato da verificare/misurare direttamente in gioco se serve un valore preciso per il sito.

## Utenti VirtMesh e tassi di mining (rete base)

**[COMUNITARIO — dati raccolti da guide di terze parti/cheat sheet, la disponibilità dei singoli utenti è RNG-dipendente da run a run]**

| Utente | DOSCoin/sec (circa) |
|---|---|
| WebTyk | 1,84 |
| UserJyx | 1,80 |
| NetVorn | 1,45 |
| CloudFuz | 1,20 |
| SysBlip | 0,87 |
| DevQuix | 0,64 |
| IT_Kwez | 0,42 |
| DataRax | 0,32 |
| WorkZap | 0,31 |
| CodePlix | 0,30 |

Guide più recenti citano anche nomi come "Pheonix" e "OpsHex" come utenti di **Tier 2** sbloccabili tramite l'upgrade "VirtMesh Scanner" — non presenti nella tabella cheat-sheet sopra, quindi probabilmente introdotti/rinominati in un aggiornamento successivo o descritti in modo diverso da fonte a fonte. **[NON VERIFICATO, da confermare col PDF ufficiale del gioco]**

## Oggetti principali su DarkDrop (mercato nero del dark web)

DarkDrop è descritto come l'equivalente di "Shadow Market"/"zeroDay Market" dei capitoli precedenti. All'apertura di una run offre circa **26 oggetti acquistabili**, molti dei quali a livelli (tier) progressivi che vanno comprati in ordine.

| Oggetto | Costo (DOSCoin) | Funzione |
|---|---|---|
| VirtMesh | 50 | Accesso base al hacking/mining |
| VM Mount Tier II | 40 | Aumenta macchine virtuali montabili contemporaneamente |
| VM Mount Tier III | 85 | Ulteriore espansione mount |
| VM Grid Tier II | 75 | Accesso a computer con internet più veloce e mining più rapido |
| ShadowFetch | 30 | Conversione URL → MP4 per richieste ACRS |
| A.C.R.S. | 30 | Chat globale/mercato nero |
| Backdoor Hack | 5 | Guadagna DOSCoin contrastando un hack (monouso) |
| VM Crypto Miner | 50 | Mining monouso su una macchina hackerata |
| NOP Sled | 15 | Salta istantaneamente un hack in corso (monouso) |
| Motion Sensor | 30 | Rileva Lucas/Tanner (serve Motion Alert per notifiche) |
| Motion Alert | 20 | Software di supporto per i motion sensor |
| Go Cam | — | Rilevamento visivo di Lucas, Tanner, Kidnapper (serve SecCam) |
| Signal Boost Monitor | 25 | — |
| Signal Booster | 200 | Connessione internet più veloce |
| Key Cue | 700 | Mostra un'icona chiave sui siti che contengono una chiave |
| Key Cue Plus | 50 | L'icona diventa oro sulla sotto-pagina esatta con la chiave |
| Firewall Tier III | 65 | Blocca intrusioni automaticamente (ma si perde il guadagno da Backdoor Hack) |
| Firewall Tier IV | 85 | — |
| Firewall Tier V | 100 | — |

**Nota strategica riportata dalle guide:** i Firewall sono generalmente considerati poco convenienti, perché il giocatore ha comunque bisogno di hack continui per costruire Rep e DOSCoin — bloccarli in automatico toglie un flusso di reddito passivo.

**Ordine di acquisto consigliato dalle guide** durante la prima ora di gioco (prima delle 21:30, quando iniziano ad attivarsi le minacce): le 3 app fondamentali (VirtMesh, ShadowFetch, ACRS) → Backdoor Hack economico → Motion Sensor + Motion Alert → Key Cue (poi Key Cue Plus) → espansione VM Mount/Grid.

## I 5 minigiochi di hacking

Ogni attacco hacking in arrivo va contrastato con uno di questi 5 minigiochi (assegnato causalmente/dal contesto):

### K3RN3LC0MP1L3R (minigioco di battitura)
- Bisogna digitare esattamente la riga di testo evidenziata, poi premere **INVIO**.
- Se corretta, si passa alla riga successiva della serie; dopo l'ultima riga l'attacco è bloccato.
- Errori di battitura vengono evidenziati in rosso sia nella riga attiva che nell'input digitato; si correggono con **BACKSPACE**.
- Versioni più difficili: più blocchi di memoria "corrotti" da contrastare in sequenza, stringhe di codice invece di semplice testo, o entrambe le cose insieme.

### memDEALLOCATER
- Un blocco di memoria scorre dal basso verso l'alto; bisogna leggere quale sezione (sinistra/destra/entrambe) è verde e premere il tasto corrispondente **prima** che il blocco raggiunga la linea di input, non reagire "a tempo scaduto".
- **Sinistra verde → [A] / freccia sinistra**
- **Entrambe verdi → [SPAZIO]** (skip)
- **Destra verde → [D] / freccia destra**
- Input corretti riempiono una barra di progresso in alto; input sbagliati la fanno regredire. Barra piena = hack bloccato.
- Consiglio delle guide: guardare in anticipo le righe future invece di reagire riga per riga in tempo reale.
- Versioni più difficili: rimuovono il suggerimento visivo del tasto da premere e aumentano la penalità per gli errori.

### shiftSEQ
- Obiettivo: distruggere tutti i nodi infetti proteggendo il "nodo home" centrale.
- Movimento con **WASD**, attacco/distruzione del nodo infetto con **SPAZIO** (ripetuto finché la sua salute non arriva a zero).
- Il giocatore parte sempre dentro il nodo home; qui è al sicuro dagli attacchi. Se un attacco raggiunge il nodo home mentre il giocatore è fuori, la salute della connessione diminuisce (unico modo di fallire prematuramente) — muoversi tra i nodi durante un attacco in corso non è invece un problema.
- Le risorse per attaccare sono limitate (misurate da un'icona batteria in basso a destra) e vanno ricaricate tornando al nodo home: premere SPAZIO quando l'impulso in espansione si sovrappone al contorno del nodo home dà una ricarica immediata piena; un timing sbagliato disabilita temporaneamente la ricarica.
- Versioni più difficili: attacchi più veloci e frequenti, danno maggiore alla salute della connessione se non bloccati in tempo, più nodi infetti da distruggere.

### stackPUSHER (puzzle a griglia)
- Obiettivo: spostare tutti i "nodi stack" nel nodo "popper"/eliminazione.
- Si clicca (LMB) sul "nodo pusher" per attivarlo/prenderlo, poi si clicca di nuovo per posizionarlo altrove sulla griglia; lo stesso meccanismo click-prendi/click-posiziona vale per i nodi stack.
- **Importante:** un nodo stack può essere spostato solo se rientra nell'area **3×3 attorno al nodo pusher** — bisogna riposizionare il pusher quando un nodo deve muoversi oltre questo raggio.
- **Da evitare assolutamente:** posizionare qualsiasi nodo (pusher o stack) su una casella con un **teschio che ride** — causa fallimento immediato, simile a una mina di Minesweeper.
- (Adriano ha già una soluzione BFS scritta in Python — `solve_stackpusher.py` — per verificare programmaticamente i livelli di questo puzzle.)

### TOKENINE
- Obiettivo: assemblare un token di autenticazione che corrisponda a quello mostrato, cliccando (LMB) su ciascun pezzo componente.
- Il numero di pezzi necessari per il token è indicato da piccoli quadrati sotto al token target (es. 2 quadrati = servono 2 pezzi).
- Una volta scelto un pezzo, **non può essere rimosso**; se l'assemblaggio finale è sbagliato, il token si azzera e va ritentato.
- **Attenzione al tempo limite** tra una selezione di pezzo e l'altra: bisogna sempre selezionare qualcosa (anche sbagliato) entro il limite, altrimenti si fallisce automaticamente per inattività.
- Dopo un successo, si passa al token successivo della serie, se presente.
- Versioni più difficili: più token da assemblare in sequenza, distorsioni visive/glitch che alterano l'aspetto del token da copiare, e token che richiedono più pezzi per essere completati.

## Bug noti legati all'hacking (corretti in patch)

- Bug per cui, dopo aver ricevuto un hack che richiedeva input (shiftSEQ o memDEALLOC), si restava bloccati e impossibilitati a premere SPAZIO — corretto in patch.
- Crash al click del pulsante "Test Hack" nel PDF minacce in-game — corretto in patch.
- Nota di design confermata dagli sviluppatori: a differenza del capitolo precedente, in WTTG3 è possibile essere attaccati da una minaccia fisica **mentre si sta subendo un hack**, rendendo le due minacce simultanee (a differenza di WTTG2).

---
*Vedi anche: 01-panoramica-gioco.md, 03-minacce.md, 05-siti-e-orari.md, 06-fonti.md*
