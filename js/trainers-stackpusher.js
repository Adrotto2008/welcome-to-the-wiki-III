// Trainer stackPUSHER — puzzle a griglia con pusher, nodi stack, popper e teschi

(function () {
  const SIZE = 5;

  // Layout preimpostati (garantiti risolvibili), coordinate {r,c}
  const LEVELS = {
    easy: [
      {
        pusher: { r: 2, c: 2 },
        stacks: [{ r: 1, c: 2 }, { r: 2, c: 1 }],
        popper: { r: 2, c: 3 },
        skulls: [{ r: 0, c: 4 }]
      },
      {
        pusher: { r: 2, c: 1 },
        stacks: [{ r: 1, c: 1 }, { r: 3, c: 1 }],
        popper: { r: 2, c: 2 },
        skulls: [{ r: 0, c: 0 }]
      }
    ],
    hard: [
      {
        pusher: { r: 2, c: 2 },
        stacks: [{ r: 0, c: 2 }, { r: 4, c: 2 }, { r: 2, c: 0 }, { r: 2, c: 4 }],
        popper: { r: 2, c: 2 },
        skulls: [{ r: 1, c: 1 }, { r: 3, c: 3 }, { r: 0, c: 0 }]
      }
    ]
  };

  let level, pusher, stacks, popper, skulls, selected, solved, failed;
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

  function key(pos) { return pos.r + '_' + pos.c; }
  function sameCell(a, b) { return a.r === b.r && a.c === b.c; }

  function load() {
    const pool = LEVELS[difficulty];
    level = pool[levelIndex % pool.length];
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

  function isSkull(pos) { return skulls.some(s => sameCell(s, pos)); }
  function stackAt(pos) { return stacks.find(s => sameCell(s, pos)); }
  function within3x3(a, b) { return Math.abs(a.r - b.r) <= 1 && Math.abs(a.c - b.c) <= 1; }
  function occupied(pos) {
    return sameCell(pusher, pos) || stacks.some(s => sameCell(s, pos));
  }

  function handleClick(r, c) {
    if (solved || failed) return;
    const pos = { r, c };

    if (!selected) {
      if (sameCell(pusher, pos)) { selected = { type: 'pusher' }; render(); return; }
      const st = stackAt(pos);
      if (st && within3x3(pos, pusher)) { selected = { type: 'stack', ref: st }; render(); return; }
      return;
    }

    // something selected: clicking the same item deselects
    if (selected.type === 'pusher' && sameCell(pusher, pos)) { selected = null; render(); return; }
    if (selected.type === 'stack' && sameCell(selected.ref, pos)) { selected = null; render(); return; }

    if (selected.type === 'pusher') {
      if (occupied(pos) && !sameCell(pos, pusher)) return; // can't overlap another node
      if (isSkull(pos)) {
        failed = true;
        showBanner('Fallimento: hai posato il pusher su un teschio ridente.', 'fail');
        render();
        return;
      }
      pusher = pos;
      selected = null;
      render();
      return;
    }

    if (selected.type === 'stack') {
      if (!within3x3(pos, pusher)) return; // outside reach
      if (sameCell(pos, popper)) {
        // delivered
        stacks = stacks.filter(s => s !== selected.ref);
        selected = null;
        checkWin();
        render();
        return;
      }
      if (occupied(pos)) return;
      if (isSkull(pos)) {
        failed = true;
        showBanner('Fallimento: hai posato un nodo stack su un teschio ridente.', 'fail');
        render();
        return;
      }
      selected.ref.r = pos.r;
      selected.ref.c = pos.c;
      selected = null;
      render();
      return;
    }
  }

  function checkWin() {
    if (stacks.length === 0) {
      solved = true;
      showBanner('Puzzle risolto — tutti i nodi stack sono nel popper!', 'win');
    }
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }
  function hideBanner() {
    el.banner.className = 'banner';
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
