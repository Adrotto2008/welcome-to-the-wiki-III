// Dati delle minacce di Welcome to the Game III.
// Ogni voce ha: dossier (testo ufficiale in-game, se disponibile),
// counters (contromisure), cue (segnali), conflict (note/discrepanze
// rispetto a fonti community, se presenti), source (provenienza dati).
// status: "confirmed" = dossier ufficiale disponibile, "unconfirmed" = solo fonti community.

const THREATS = [
  {
    id: "noir",
    name: "Noir",
    aka: "La coppia mascherata",
    origin: "Welcome to the Game II / Dead Signal",
    status: "confirmed",
    teaser: "Appaiono dal nulla e si muovono insieme nell'oscurità. La loro posizione decide la tua mossa: quale vedi per primo, da sinistra, cambia tutto.",
    dossier: "Questa coppia appare apparentemente dal nulla e, preferendo l'oscurità, si muove spesso insieme esigendo che tu segua le loro regole. La loro posizione deciderà la tua prossima mossa.",
    counters: [
      "Se vedi, da sinistra a destra, prima la donna più bassa e poi l'uomo più alto: puntagli contro una torcia per un momento, poi voltati completamente, conta esattamente fino a 10, quindi girati immediatamente verso il punto in cui si trovavano.",
      "Se vedi, da sinistra a destra, prima l'uomo più alto e poi la donna più bassa: fai la stessa cosa, ma conta esattamente fino a 5.",
      "Se ti ritrovi da solo con uno dei due: avvicinati semplicemente e distogli lo sguardo; dopo un momento di attesa, spariranno."
    ],
    cue: "Nessun cue sonoro specifico documentato: la minaccia si gestisce riconoscendo la loro posizione relativa (sinistra/destra) e reagendo di conseguenza.",
    conflict: null,
    source: "Dossier di gioco (utente)"
  },
  {
    id: "tanner",
    name: "Tanner Grayton",
    aka: null,
    origin: "Scrutinized",
    status: "confirmed",
    teaser: "Sei la sua prossima vittima, ma gli piace giocare: se capisce che l'hai visto, gli rovini il divertimento.",
    dossier: "Sei la sua prossima vittima, ma fortunatamente gli piace giocare.",
    counters: [
      "Metti sempre in sicurezza (chiudi a chiave) l'area in cui ti trovi: sfrutterà qualsiasi via di accesso facile.",
      "A volte basta fargli capire che l'hai riconosciuto: guardalo negli occhi usando ciò che hai intorno per rovinare ogni suo piano di imboscata.",
      "Il pulsante antipanico alla scrivania blocca le porte scorrevoli anteriori, impedendo a chiunque di entrare — ma va premuto in tempo."
    ],
    cue: "Nessun cue sonoro specifico: individuarlo è soprattutto visivo (parcheggio, dintorni della stanza).",
    conflict: "La community suggerisce anche di comprare e installare telecamere per avvistarlo prima e di controllare sempre lo spioncino prima di uscire da una stanza — non contraddice il dossier, ma aggiunge strumenti utili non menzionati nel testo ufficiale.",
    source: "Dossier di gioco (utente) + note community (Destructoid)"
  },
  {
    id: "cletus",
    name: "Cletus",
    aka: "Il ragazzo di Wade",
    origin: "Welcome to the Game III (nuovo)",
    status: "confirmed",
    teaser: "Un tossicodipendente con la smania di una dose: dagli ciò che vuole e ti lascerà stare.",
    dossier: "Un altro dei ragazzi di Wade con la smania di farsi una dose.",
    counters: [
      "C'è solo un modo per farsi benvolere da questo tossicodipendente: dargli ciò che brama di più, la metanfetamina.",
      "Una volta raccolta, non preoccuparti di doverla cercare per lui: tienila semplicemente con te, sarà lui a fiutarti quando avrà fame di un'altra dose.",
      "La meth si trova nelle stanze circostanti del motel: fanne scorta prima di rischiare un incontro."
    ],
    cue: "Non richiede un cue di riconoscimento: la gestione è puramente di inventario (avere sempre meth con sé).",
    conflict: null,
    source: "Dossier di gioco (utente)"
  },
  {
    id: "lucas",
    name: "Lucas",
    aka: "Il Sicario",
    origin: "Welcome to the Game II",
    status: "confirmed",
    teaser: "Ogni giocatore ha un sicario assegnato in attesa dell'ordine di ucciderlo. Non saprai mai quando verrà attivato.",
    dossier: "Tutti i giocatori hanno un sicario assegnato in attesa dell'ordine di ucciderli, e questo è il tuo. Essendo un killer addestrato, è furtivo, si muove nell'ombra e rimane silenzioso nella maggior parte dei casi.",
    counters: [
      "Non saprai quando il sicario verrà chiamato in azione: mettiti al sicuro prima che arrivi quel momento, non aspettare i segnali.",
      "Ci saranno pochi segnali del suo avvicinamento se non ti prepari in anticipo.",
      "Se noti la sua presenza: spegni le luci, tieni le porte chiuse a chiave e trova un posto dove nasconderti all'interno.",
      "La condizione di ansia di Simon renderà difficile rimanere in silenzio durante il nascondiglio."
    ],
    cue: "Cue audio sottile prima dell'arrivo, coerente con la sua furtività — secondo la community è amplificabile con auricolari o un motion sensor.",
    conflict: "La community aggiunge dettagli pratici non presenti nel dossier ufficiale: nasconditi preferibilmente in un carrello della biancheria piuttosto che in un armadietto, e tieni sempre chiusa la porta sul retro (inclusa quella della sala elettrica), che sembra essere il suo punto d'accesso preferito.",
    source: "Dossier di gioco (utente) + note community (Fandom/Destructoid)"
  },
  {
    id: "kidnapper",
    name: "Il Rapitore",
    aka: "The Kidnapper",
    origin: "Welcome to the Game",
    status: "confirmed",
    teaser: "Un trafficante esperto che conosce la tua posizione e ti cattura se ne ha l'occasione, parcheggiato nelle vicinanze.",
    dossier: "Questo trafficante esperto conosce la tua posizione ed è stato istruito per catturarti se se ne presenta l'opportunità mentre è parcheggiato nelle vicinanze.",
    counters: [
      "La furtività è una sua priorità: tieni sempre chiuse a chiave le porte posteriori.",
      "Se esci, controlla bene l'area della strada circostante per individuare il suo furgone bianco; se lo vedi, aspetta che se ne vada.",
      "L'uso dei soli occhi spesso non basta per individuare la posizione del suo veicolo: mettiti al sicuro in anticipo o sii cauto ogni volta che cammini all'aperto."
    ],
    cue: "Nessun cue sonoro: minaccia gestita tramite osservazione visiva e prevenzione (porte chiuse, cautela all'aperto).",
    conflict: null,
    source: "Dossier di gioco (utente)"
  },
  {
    id: "breather",
    name: "Il Respiratore",
    aka: "The Breather",
    origin: "Welcome to the Game / II / Dead Signal",
    status: "confirmed",
    teaser: "Un uomo instabile e maniacale che aspetta vicino al punto di consegna del tuo pacco segreto (dead drop).",
    dossier: "Un uomo instabile e maniacale che potrebbe aspettare intorno al luogo di consegna del tuo pacco segreto (dead drop).",
    counters: [
      "Se appare, scappa via tornando verso un'area dove ci sono altre persone.",
      "La presenza di altri individui, anche solo presunta, sarà sufficiente a fargli rinunciare all'inseguimento."
    ],
    cue: "Nessun cue sonoro specificato nel dossier ufficiale — la community ne segnala invece diversi (vedi nota sotto).",
    conflict: "Le guide della community (Fandom/Destructoid) descrivono un incontro diverso e più strutturato: il Breather insegue fino a una stanza del motel, dove bisogna tenere premuto il tasto sinistro del mouse entro mezzo secondo dagli urti alla porta (5-8 tentativi) finché non desiste, riconoscibile da passi + ascensore quando se ne va. Non è chiaro se si tratti di una fase successiva alla fuga verso altre persone (se non riesci a raggiungerle) o di informazioni relative a versioni/patch diverse. Da verificare direttamente in gioco.",
    source: "Dossier di gioco (utente) + note community (Fandom/Destructoid) — IN CONFLITTO, verificare"
  },
  {
    id: "tucker",
    name: "Tucker",
    aka: "L'Hillbilly dell'elettricità",
    origin: "Welcome to the Game III (nuovo)",
    status: "unconfirmed",
    teaser: "Corrente e internet saltano periodicamente: dovrai uscire a riparare le centraline. Se senti qualcosa alle spalle, non muoverti.",
    dossier: null,
    counters: [
      "Durante la riparazione delle centraline, se senti un rumore alle spalle non muoverti per diversi secondi.",
      "Se attiva la modalità musica dall'interfono, nasconditi finché la musica non si ferma."
    ],
    cue: "Musica trasmessa dall'interfono come segnale della modalità di attacco alternativa; altrimenti rumori nelle vicinanze durante le riparazioni.",
    conflict: "Non abbiamo ancora un dossier ufficiale per questa minaccia: i dettagli vengono solo da guide della community raccolte nei primi giorni dal rilascio. Da confermare.",
    source: "Solo note community — nessun dossier ufficiale disponibile"
  }
];
