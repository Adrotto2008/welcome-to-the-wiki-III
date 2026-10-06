// Trainer shiftSEQ — muoversi tra i nodi, distruggere quelli infetti, gestire energia e ricarica
//
// BUG CORRETTI in questa versione (il più serio dei 5 trainer):
// 1) GRAVE: ad ogni tick (10 volte al secondo) il codice ricostruiva TUTTO
//    l'HTML dello stage con innerHTML, distruggendo e ricreando anche
//    l'anello di ricarica. Un elemento DOM ricreato riparte sempre da zero
//    con qualunque animazione CSS: l'anello quindi non arrivava mai a
//    crescere/pulsare davvero, restava sempre "appena nato". Il minigioco
//    di ricarica a tempo era di fatto rotto/casuale.
//    Fix: i nodi vengono creati UNA sola volta nell'HTML della pagina; il
//    JS aggiorna solo classi/testo/stile sugli elementi esistenti, e la fase
//    dell'anello è calcolata direttamente in JS (stessa funzione usata sia
//    per disegnare l'anello sia per controllare il timing del click),
//    quindi il disegno e la logica non possono più andare fuori sync.
// 2) Il "recharge lock" usava un booleano + setTimeout: premendo Spazio più
//    volte fuori tempo si accumulavano più timeout indipendenti, e il primo
//    a scadere sbloccava la ricarica anche se un secondo tentativo era stato
//    fatto dopo — la penalità poteva quindi accorciarsi da sola. Sostituito
//    con un semplice timestamp "bloccato fino a X", niente più corse tra timer.
// 3) Muoversi era troppo rigido: da un nodo esterno serviva premere ESATTAMENTE
//    il tasto opposto per tornare alla home, senza alcun indizio a schermo.
//    Semplificato: da qualunque nodo esterno, un tasto qualsiasi riporta alla home.
// 4) L'intervallo di gioco (setInterval) non veniva mai fermato a fine partita:
//    continuava a girare a vuoto. Ora viene fermato in caso di vittoria/sconfitta.

(function () {
  const DIRS = ['n', 'e', 's', 'w'];
  const CYCLE_MS = 2000;
  const WINDOW_START = 0.55; // finestra "buona" per la ricarica attiva, come frazione del ciclo
  const WINDOW_END = 0.75;

  let state;
  let tickHandle;

  const el = {
    healthFill: document.getElementById('sq-health-fill'),
    healthNum: document.getElementById('sq-health-num'),
    energyFill: document.getElementById('sq-energy-fill'),
    energyNum: document.getElementById('sq-energy-num'),
    banner: document.getElementById('sq-banner'),
    resetBtn: document.getElementById('sq-reset'),
    diffButtons: document.querySelectorAll('#sq-diff button'),
    ring: document.getElementById('sq-ring'),
    nodes: {
      n: document.getElementById('sq-node-n'),
      e: document.getElementById('sq-node-e'),
      s: document.getElementById('sq-node-s'),
      w: document.getElementById('sq-node-w'),
      home: document.getElementById('sq-node-home')
    },
    health: {
      n: document.getElementById('sq-health-n'),
      e: document.getElementById('sq-health-e'),
      s: document.getElementById('sq-health-s'),
      w: document.getElementById('sq-health-w')
    }
  };

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function newState(hard) {
    const infectedCount = hard ? 3 : 2;
    const infected = shuffle(DIRS.slice()).slice(0, infectedCount);
    const nodes = {};
    DIRS.forEach(d => {
      nodes[d] = {
        infected: infected.includes(d),
        health: 3,
        cleared: false,
        pulseTimer: (hard ? 3000 : 4500) + Math.random() * 1000
      };
    });
    return {
      hard,
      nodes,
      current: 'home',
      connectionHealth: 100,
      energy: 100,
      rechargeLockedUntil: 0, // FIX #2: timestamp invece di booleano+timeout
      running: true,
      startTime: Date.now()
    };
  }

  function init(hard) {
    if (tickHandle) clearInterval(tickHandle);
    state = newState(hard || false);
    hideBanner();
    tickHandle = setInterval(tick, 100);
    renderStatic();
    render();
  }

  // Fase del ciclo di ricarica (0..1), usata SIA per disegnare l'anello SIA
  // per verificare il timing del click: essendo la stessa funzione, i due
  // non possono più andare fuori sincrono (era il bug #1).
  function ringPhase() {
    return ((Date.now() - state.startTime) % CYCLE_MS) / CYCLE_MS;
  }

  function tick() {
    if (!state.running) return;
    const speed = state.hard ? 1.6 : 1;

    DIRS.forEach(dir => {
      const node = state.nodes[dir];
      if (!node.infected || node.cleared) return;
      node.pulseTimer -= 100 * speed;
      if (node.pulseTimer <= 0) {
        node.pulseTimer = (state.hard ? 3000 : 4500) + Math.random() * 1000;
        const safe = state.current === 'home' || state.current === dir;
        if (!safe) {
          state.connectionHealth -= state.hard ? 22 : 15;
        }
      }
    });

    if (state.current === 'home' && Date.now() >= state.rechargeLockedUntil) {
      state.energy = Math.min(100, state.energy + 1.5);
    }

    if (state.connectionHealth <= 0) {
      state.running = false;
      state.connectionHealth = 0;
      clearInterval(tickHandle); // FIX #4
      showBanner('Connessione persa — la salute è arrivata a zero.', 'fail');
    }

    const allCleared = DIRS.filter(d => state.nodes[d].infected).every(d => state.nodes[d].cleared);
    if (allCleared) {
      state.running = false;
      clearInterval(tickHandle); // FIX #4
      showBanner('Attacco neutralizzato — tutti i nodi infetti distrutti!', 'win');
    }

    updateRing();
    render();
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }
  function hideBanner() {
    el.banner.className = 'banner';
  }

  // FIX #3: da un nodo esterno, QUALSIASI tasto direzionale riporta alla home.
  function move(dir) {
    if (!state.running) return;
    if (state.current === 'home') {
      state.current = dir;
    } else {
      state.current = 'home';
    }
    render();
  }

  function attack() {
    if (!state.running) return;

    if (state.current === 'home') {
      const phase = ringPhase();
      const inWindow = phase >= WINDOW_START && phase <= WINDOW_END;
      if (inWindow) {
        state.energy = 100;
        state.rechargeLockedUntil = 0;
      } else {
        state.rechargeLockedUntil = Date.now() + 2500; // FIX #2: timestamp singolo, niente race condition
      }
      render();
      return;
    }

    const node = state.nodes[state.current];
    if (!node || !node.infected || node.cleared) return;
    if (state.energy < 15) return;
    state.energy -= 15;
    node.health -= 1;
    if (node.health <= 0) node.cleared = true;
    render();
  }

  // Costruisce SOLO i contenuti che cambiano poco (health label iniziali);
  // gli elementi stessi sono già nell'HTML e non vengono mai ricreati.
  function renderStatic() {
    DIRS.forEach(dir => {
      el.nodes[dir].classList.remove('infected', 'cleared', 'player');
    });
  }

  function updateRing() {
    const phase = ringPhase();
    const scale = 0.4 + phase * 1.3;
    const opacity = 1 - phase;
    el.ring.style.transform = `scale(${scale})`;
    el.ring.style.opacity = opacity;
  }

  function render() {
    DIRS.forEach(dir => {
      const node = state.nodes[dir];
      const nodeEl = el.nodes[dir];
      nodeEl.classList.toggle('infected', node.infected && !node.cleared);
      nodeEl.classList.toggle('cleared', node.cleared);
      nodeEl.classList.toggle('player', state.current === dir);
      el.health[dir].textContent = !node.infected ? '' : (node.cleared ? 'OK' : 'HP ' + node.health);
    });
    el.nodes.home.classList.toggle('player', state.current === 'home');

    el.healthFill.style.width = Math.max(0, state.connectionHealth) + '%';
    el.energyFill.style.width = Math.max(0, state.energy) + '%';
    el.healthNum.textContent = Math.max(0, Math.round(state.connectionHealth));
    el.energyNum.textContent = Math.max(0, Math.round(state.energy));
  }

  window.addEventListener('keydown', (e) => {
    const panel = document.getElementById('panel-shiftseq');
    if (!panel.classList.contains('active')) return;
    const k = e.key.toLowerCase();
    if (k === 'w') move('n');
    else if (k === 's') move('s');
    else if (k === 'a') move('w');
    else if (k === 'd') move('e');
    else if (k === ' ') { e.preventDefault(); attack(); }
  });

  el.resetBtn.addEventListener('click', () => init(state.hard));
  el.diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      el.diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      init(btn.dataset.diff === 'hard');
    });
  });

  // Ciclo di disegno indipendente per l'anello, cosi' pulsa in modo fluido
  // anche fra un tick di gioco (100ms) e l'altro.
  function ringLoop() {
    if (state && state.running) updateRing();
    requestAnimationFrame(ringLoop);
  }

  init(false);
  requestAnimationFrame(ringLoop);
})();
