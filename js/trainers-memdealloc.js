// Trainer memDEALLOCATER — premere il tasto giusto in base alla sezione verde

(function () {
  const ROW_COUNT = 6;
  let rows = [];
  let progress = 0;
  let hardMode = false;
  let running = true;

  const el = {
    stage: document.getElementById('m-stage'),
    hint: document.getElementById('m-hint'),
    progressFill: document.getElementById('m-progress-fill'),
    banner: document.getElementById('m-banner'),
    resetBtn: document.getElementById('m-reset'),
    diffButtons: document.querySelectorAll('#m-diff button')
  };

  function randomRowType() {
    const roll = Math.random();
    if (roll < 0.4) return 'left';
    if (roll < 0.8) return 'right';
    return 'both';
  }

  function randomBits(n) {
    let s = '';
    for (let i = 0; i < n; i++) s += Math.round(Math.random());
    return s;
  }

  function makeRow() {
    return { type: randomRowType(), leftBits: randomBits(20), rightBits: randomBits(20) };
  }

  function init() {
    rows = [];
    for (let i = 0; i < ROW_COUNT; i++) rows.push(makeRow());
    progress = 0;
    running = true;
    hideBanner();
    render();
  }

  function activeRow() {
    return rows[rows.length - 1];
  }

  function requiredAction(row) {
    if (row.type === 'both') return 'skip';
    if (row.type === 'left') return 'left';
    return 'right';
  }

  function render() {
    el.stage.innerHTML = rows.map((row, i) => {
      const isActive = i === rows.length - 1;
      const leftGreen = row.type === 'left' || row.type === 'both';
      const rightGreen = row.type === 'right' || row.type === 'both';
      return `<div class="mem-row ${isActive ? 'active' : ''}">
        <div class="mem-half ${leftGreen ? 'green' : ''}">${row.leftBits}</div>
        <div class="mem-half ${rightGreen ? 'green' : ''}">${row.rightBits}</div>
      </div>`;
    }).join('');

    if (!hardMode) {
      const action = requiredAction(activeRow());
      const label = action === 'left' ? '◄ A' : action === 'right' ? 'D ►' : 'SPACE (skip)';
      el.hint.textContent = 'Tasto suggerito: ' + label;
    } else {
      el.hint.textContent = '';
    }

    el.progressFill.style.width = progress + '%';
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }
  function hideBanner() {
    el.banner.className = 'banner';
  }

  function act(action) {
    if (!running) return;
    const correct = action === requiredAction(activeRow());
    progress += correct ? 12 : -18;
    progress = Math.max(0, Math.min(100, progress));

    rows.pop();
    rows.unshift(makeRow());

    if (progress >= 100) {
      running = false;
      showBanner('Attacco bloccato — barra piena!', 'win');
    } else {
      render();
    }
    render();
  }

  window.addEventListener('keydown', (e) => {
    const panel = document.getElementById('panel-mem');
    if (!panel.classList.contains('active')) return;
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') act('left');
    else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') act('right');
    else if (e.key === ' ') { e.preventDefault(); act('skip'); }
  });

  el.resetBtn.addEventListener('click', init);
  el.diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      hardMode = btn.dataset.diff === 'hard';
      el.diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      init();
    });
  });

  init();
})();
