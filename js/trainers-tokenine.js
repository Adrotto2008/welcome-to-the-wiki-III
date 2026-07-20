// Trainer TOKENINE — assemblare il token cliccando i pezzi giusti nell'ordine, prima che scada il tempo

(function () {
  const GLYPHS = ['↗', '↘', '↙', '↖', '⌐', '¬', '∟', '╱', '╲'];
  const TIME_LIMIT_MS = 4000;

  let palette, target, step, timerStart, timerHandle, difficulty = 'easy', running;

  const el = {
    palette: document.getElementById('tk-palette'),
    target: document.getElementById('tk-target'),
    timerFill: document.getElementById('tk-timer-fill'),
    banner: document.getElementById('tk-banner'),
    resetBtn: document.getElementById('tk-reset'),
    diffButtons: document.querySelectorAll('#tk-diff button')
  };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function newRound() {
    palette = shuffle(GLYPHS);
    const count = difficulty === 'hard' ? 4 : 2;
    target = shuffle(GLYPHS).slice(0, count);
    step = 0;
    running = true;
    startTimer();
    hideBanner();
    render();
  }

  function startTimer() {
    timerStart = Date.now();
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      if (!running) return;
      const elapsed = Date.now() - timerStart;
      const pct = Math.max(0, 100 - (elapsed / TIME_LIMIT_MS) * 100);
      el.timerFill.style.width = pct + '%';
      el.timerFill.className = 'progress-fill' + (pct < 30 ? ' danger' : '');
      if (elapsed >= TIME_LIMIT_MS) {
        running = false;
        showBanner('Tempo scaduto — selezione mancata. Riprova più veloce.', 'fail');
      }
    }, 100);
  }

  function pick(glyph, cellEl) {
    if (!running) return;
    if (glyph === target[step]) {
      cellEl.classList.add('used');
      step++;
      startTimer();
      if (step >= target.length) {
        running = false;
        showBanner('Token assemblato correttamente!', 'win');
      }
      render();
    } else {
      // token sbagliato: si ricomincia la sequenza (semplificazione didattica)
      showBanner('Pezzo sbagliato — sequenza azzerata, riprova.', 'fail');
      step = 0;
      palette = shuffle(GLYPHS);
      startTimer();
      render();
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
    el.palette.innerHTML = palette.map(g =>
      `<div class="tk-cell" data-g="${g}">${g}</div>`
    ).join('');
    el.palette.querySelectorAll('.tk-cell').forEach(cellEl => {
      cellEl.addEventListener('click', () => pick(cellEl.dataset.g, cellEl));
    });

    el.target.innerHTML = target.map((g, i) => {
      let cls = 'glyph';
      if (i < step) cls += ' done';
      else if (i === step) cls += ' next';
      return `<div class="${cls}">${g}</div>`;
    }).join('') + `<div class="piece-counter">${target.map((_, i) => `<span class="piece-dot ${i < step ? 'filled' : ''}"></span>`).join('')}</div>`;
  }

  el.resetBtn.addEventListener('click', newRound);
  el.diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      difficulty = btn.dataset.diff;
      el.diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      newRound();
    });
  });

  newRound();
})();
