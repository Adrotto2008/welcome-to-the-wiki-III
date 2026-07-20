// Trainer shiftSEQ — muoversi tra i nodi, distruggere quelli infetti, gestire energia e ricarica

(function () {
  const DIRS = ['n', 'e', 's', 'w'];
  const OPPOSITE = { n: 's', s: 'n', e: 'w', w: 'e' };

  let state;
  let tickHandle;

  const el = {
    stage: document.getElementById('sq-stage'),
    healthFill: document.getElementById('sq-health-fill'),
    energyFill: document.getElementById('sq-energy-fill'),
    banner: document.getElementById('sq-banner'),
    resetBtn: document.getElementById('sq-reset'),
    diffButtons: document.querySelectorAll('#sq-diff button')
  };

  function newState(hard) {
    const infectedCount = hard ? 3 : 2;
    const infected = shuffle(DIRS.slice()).slice(0, infectedCount);
    const nodes = {};
    DIRS.forEach(d => {
      nodes[d] = { infected: infected.includes(d), health: 3, cleared: false, pulseTimer: 4000 + Math.random() * 1500 };
    });
    return {
      hard,
      nodes,
      current: 'home',
      connectionHealth: 100,
      energy: 100,
      recharging: true,
      rechargeLocked: false,
      running: true,
      startTime: Date.now()
    };
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function init(hard) {
    state = newState(hard || false);
    hideBanner();
    if (tickHandle) clearInterval(tickHandle);
    tickHandle = setInterval(tick, 100);
    render();
  }

  function tick() {
    if (!state.running) return;
    const speed = state.hard ? 1.6 : 1;

    // pulses on infected nodes
    Object.entries(state.nodes).forEach(([dir, node]) => {
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

    // passive energy regen at home
    if (state.current === 'home' && !state.rechargeLocked) {
      state.energy = Math.min(100, state.energy + 1.5);
    }

    if (state.connectionHealth <= 0) {
      state.running = false;
      showBanner('Connessione persa — la salute è arrivata a zero.', 'fail');
    }

    const allCleared = Object.values(state.nodes).filter(n => n.infected).every(n => n.cleared);
    if (allCleared) {
      state.running = false;
      showBanner('Attacco neutralizzato — tutti i nodi infetti distrutti!', 'win');
    }

    render();
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }
  function hideBanner() {
    el.banner.className = 'banner';
  }

  function move(dir) {
    if (!state.running) return;
    if (state.current === 'home') {
      state.current = dir;
    } else if (OPPOSITE[state.current] === dir) {
      state.current = 'home';
    }
    render();
  }

  function attack() {
    if (!state.running) return;
    if (state.current === 'home') {
      // active recharge attempt: check pulse animation phase
      const elapsed = (Date.now() - state.startTime) % 2000;
      const inWindow = elapsed > 700 && elapsed < 1100; // ~ring overlapping outline
      if (inWindow) {
        state.energy = 100;
        state.rechargeLocked = false;
      } else {
        state.rechargeLocked = true;
        setTimeout(() => { state.rechargeLocked = false; }, 2500);
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

  function render() {
    const nodeLabel = (dir) => {
      const n = state.nodes[dir];
      if (!n.infected) return '';
      if (n.cleared) return 'OK';
      return 'HP ' + n.health;
    };
    const cls = (dir) => {
      const n = state.nodes[dir];
      let c = 'sq-node ' + dir;
      if (n.infected && !n.cleared) c += ' infected';
      if (n.cleared) c += ' cleared';
      if (state.current === dir) c += ' player';
      return c;
    };

    el.stage.innerHTML = `
      <div class="${cls('n')}">N<span class="node-health">${nodeLabel('n')}</span></div>
      <div class="${cls('w')}">W<span class="node-health">${nodeLabel('w')}</span></div>
      <div class="sq-node home ${state.current === 'home' ? 'player' : ''}"><div class="recharge-ring"></div>HOME</div>
      <div class="${cls('e')}">E<span class="node-health">${nodeLabel('e')}</span></div>
      <div class="${cls('s')}">S<span class="node-health">${nodeLabel('s')}</span></div>
    `;
    el.healthFill.style.width = Math.max(0, state.connectionHealth) + '%';
    el.energyFill.style.width = Math.max(0, state.energy) + '%';
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

  init(false);
})();
