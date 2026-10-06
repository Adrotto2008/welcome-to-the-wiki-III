// Trainer stackPUSHER — puzzle a griglia con pusher, nodi stack, popper e teschi
//
// BUG CORRETTI in questa versione:
// 1) GRAVE (design): i due livelli "facile" originali erano risolvibili senza
//    MAI spostare il pusher (tutti gli stack e il popper erano già dentro la
//    sua area 3x3 di partenza). Verificato con un solver a forza bruta:
//    0 spostamenti richiesti. Il trainer, di fatto, non insegnava affatto la
//    meccanica centrale del minigioco. Livelli rifatti e verificati col
//    solver: ora richiedono almeno 1 spostamento reale del pusher.
// 2) Il livello "difficile" faceva partire il pusher ESATTAMENTE sulla stessa
//    cella del popper: l'icona del popper restava invisibile finché non si
//    spostava il pusher altrove, sembrando "sparita"/rotta. Corretto
//    separando sempre le celle di partenza di pusher/popper/stack/teschi.
// 3) Una volta selezionato un elemento (pusher o stack), non si poteva
//    cambiare selezione cliccando un altro elemento valido: bisognava per
//    forza deselezionare prima. Ora cliccare un altro elemento selezionabile
//    cambia semplicemente la selezione.
// Tutti i livelli qui sotto sono stati verificati con un solver BFS separato
// (solve_stackpusher.py) per garantire che siano risolvibili e non banali.

(function () {
  const SIZE = 5;

  const LEVELS = {
    easy: [
      {
        pusher: { r: 0, c: 0 },
        stacks: [{ r: 2, c: 2 }, { r: 2, c: 3 }],
        popper: { r: 2, c: 4 },
        skulls: [{ r: 4, c: 4 }]
      },
      {
        pusher: { r: 0, c: 4 },
        stacks: [{ r: 2, c: 2 }, { r: 2, c: 1 }],
        popper: { r: 2, c: 0 },
        skulls: [{ r: 4, c: 0 }]
      }
    ],
    hard: [
      {
        pusher: { r: 2, c: 0 },
        stacks: [{ r: 0, c: 2 }, { r: 4, c: 2 }, { r: 2, c: 4 }],
        popper: { r: 2, c: 2 },
        skulls: [{ r: 1, c: 2 }, { r: 3, c: 2 }, { r: 2, c: 3 }]
      },
      {
        pusher: { r: 2, c: 4 },
        stacks: [{ r: 0, c: 2 }, { r: 4, c: 2 }, { r: 2, c: 0 }],
        popper: { r: 2, c: 2 },
        skulls: [{ r: 1, c: 2 }, { r: 3, c: 2 }, { r: 2, c: 1 }]
      }
    ]
  };

  let pusher, stacks, popper, skulls, selected, solved, failed;
  let difficulty = 'easy';
  let levelIndex = 0;

  const el = {
    grid: document.getElementById('sp-grid'),
    banner: document.getElementById('sp-banner'),
    remaining: document.getElementById('sp-remaining'),
    resetBtn: document.getElementById('sp-reset'),
    nextBtn: document.getElementById('sp-next'),
    diffButtons: document.querySelectorAll('#sp-diff button')
  };

  function sameCell(a, b) { return a.r === b.r && a.c === b.c; }
  function within3x3(a, b) { return Math.abs(a.r - b.r) <= 1 && Math.abs(a.c - b.c) <= 1; }
  function isSkull(pos) { return skulls.some(s => sameCell(s, pos)); }
  function stackAt(pos) { return stacks.find(s => sameCell(s, pos)); }
  function occupied(pos) {
    return sameCell(pusher, pos) || stacks.some(s => sameCell(s, pos));
  }

  function load() {
    const pool = LEVELS[difficulty];
    const level = pool[levelIndex % pool.length];
    pusher = { ...level.pusher };
    stacks = level.stacks.map(s => ({ ...s }));
    popper = { ...level.popper };
    skulls = level.skulls.map(s => ({ ...s }));
    selected = null;
    solved = false;
    failed = false;
    hideBanner();
    render();
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }
  function hideBanner() {
    el.banner.className = 'banner';
  }

  function fail(msg) {
    failed = true;
    showBanner(msg, 'fail');
  }

  function deliver(stackRef) {
    stacks = stacks.filter(s => s !== stackRef);
    if (stacks.length === 0) {
      solved = true;
      showBanner('Puzzle risolto — tutti i nodi stack sono nel popper!', 'win');
    }
  }

  // FIX #3: modello di selezione più permissivo — cliccare un elemento diverso
  // e valido CAMBIA la selezione invece di essere ignorato.
  function handleClick(r, c) {
    if (solved || failed) return;
    const pos = { r, c };
    const clickedStack = stackAt(pos);
    const clickedPusher = sameCell(pusher, pos);

    // Click sullo stesso elemento già selezionato = deseleziona
    if (selected && selected.type === 'pusher' && clickedPusher) { selected = null; render(); return; }
    if (selected && selected.type === 'stack' && clickedStack === selected.ref) { selected = null; render(); return; }

    // Click su un elemento selezionabile diverso = cambia selezione
    if (clickedPusher) { selected = { type: 'pusher' }; render(); return; }
    if (clickedStack && within3x3(pos, pusher)) { selected = { type: 'stack', ref: clickedStack }; render(); return; }

    if (!selected) return; // niente selezionato, click a vuoto

    if (selected.type === 'pusher') {
      if (occupied(pos)) return; // non ci si può mettere sopra a uno stack
      if (isSkull(pos)) { fail('Fallimento: hai posato il pusher su un teschio ridente.'); render(); return; }
      pusher = pos;
      selected = null;
      render();
      return;
    }

    if (selected.type === 'stack') {
      if (!within3x3(pos, pusher)) return; // fuori dal raggio del pusher
      if (sameCell(pos, popper)) {
        deliver(selected.ref);
        selected = null;
        render();
        return;
      }
      if (occupied(pos)) return;
      if (isSkull(pos)) { fail('Fallimento: hai posato un nodo stack su un teschio ridente.'); render(); return; }
      selected.ref.r = pos.r;
      selected.ref.c = pos.c;
      selected = null;
      render();
      return;
    }
  }

  function render() {
    let html = '';
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const pos = { r, c };
        let cls = 'g-cell';
        let content = '';
        if (isSkull(pos)) { cls += ' skull'; content = '💀'; }
        if (sameCell(popper, pos)) { cls += ' popper'; content = '✳'; }
        if (sameCell(pusher, pos)) { cls += ' pusher'; content = '◈'; }
        const st = stackAt(pos);
        if (st) { cls += ' stack'; content = '▤'; }
        if (selected) {
          if (selected.type === 'pusher' && sameCell(pusher, pos)) cls += ' selected';
          if (selected.type === 'stack' && st === selected.ref) cls += ' selected';
        }
        html += `<div class="${cls}" style="cursor:pointer;" data-r="${r}" data-c="${c}">${content}</div>`;
      }
    }
    el.grid.style.gridTemplateColumns = `repeat(${SIZE}, 44px)`;
    el.grid.style.gridTemplateRows = `repeat(${SIZE}, 44px)`;
    el.grid.innerHTML = html;
    el.remaining.textContent = stacks.length;

    el.grid.querySelectorAll('[data-r]').forEach(cellEl => {
      cellEl.addEventListener('click', () => handleClick(+cellEl.dataset.r, +cellEl.dataset.c));
    });
  }

  el.resetBtn.addEventListener('click', load);
  el.nextBtn.addEventListener('click', () => { levelIndex++; load(); });
  el.diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      difficulty = btn.dataset.diff;
      levelIndex = 0;
      el.diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      load();
    });
  });

  load();
})();
