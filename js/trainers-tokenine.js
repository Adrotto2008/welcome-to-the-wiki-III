// Trainer TOKENINE — assemblare il token cliccando i pezzi giusti nell'ordine,
// prima che scada il tempo
//
// BUG CORRETTO in questa versione (il più serio di questo trainer):
// Quando si sceglieva il pezzo giusto, il codice segnava la cella come "used"
// scrivendo direttamente sulla classe del suo elemento DOM. Ma la funzione
// render(), chiamata subito dopo per aggiornare il contatore, RICOSTRUIVA
// da zero tutta la palette con innerHTML — cancellando quella classe "used"
// perché non veniva mai salvata come dato, solo come modifica temporanea al
// DOM. Risultato: dopo ogni scelta corretta, il pezzo tornava cliccabile come
// se non fosse mai stato scelto, e ricliccandolo (magari per sbaglio) il gioco
// lo confrontava con il pezzo SUCCESSIVO nella sequenza, segnalando un errore
// che l'utente non aveva davvero commesso. Corretto tenendo la lista dei pezzi
// già usati come stato vero e proprio, non come classe CSS applicata a mano.

(function () {
  const GLYPHS = ['↗', '↘', '↙', '↖', '⌐', '¬', '∟', '╱', '╲'];
  const TIME_LIMIT_MS = 4000;

  let palette, target, step, usedGlyphs, timerStart, timerHandle, difficulty = 'easy', running;

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
    usedGlyphs = []; // FIX: stato vero, non solo una classe CSS temporanea
    running = true;
    startTimer();
    hideBanner();
    render();
  }

  function startTimer() {
    timerStart = Date.now();
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      if (!running) { clearInterval(timerHandle); return; }
      const elapsed = Date.now() - timerStart;
      const pct = Math.max(0, 100 - (elapsed / TIME_LIMIT_MS) * 100);
      el.timerFill.style.width = pct + '%';
      el.timerFill.className = 'progress-fill' + (pct < 30 ? ' danger' : '');
      if (elapsed >= TIME_LIMIT_MS) {
        running = false;
        clearInterval(timerHandle);
        showBanner('Tempo scaduto — selezione mancata. Riprova più veloce.', 'fail');
        render();
      }
    }, 100);
  }

  function pick(glyph) {
    if (!running) return;
    if (glyph === target[step]) {
      usedGlyphs.push(glyph); // FIX: salvato nello stato, non solo su classList
      step++;
      startTimer();
      if (step >= target.length) {
        running = false;
        showBanner('Token assemblato correttamente!', 'win');
      }
      render();
    } else {
      showBanner('Pezzo sbagliato — sequenza azzerata, riprova.', 'fail');
      step = 0;
      usedGlyphs = [];
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
    el.palette.classList.toggle('frozen', !running);
    // FIX: la classe "used" viene ora calcolata ogni volta da usedGlyphs,
    // quindi sopravvive a qualunque ricostruzione dell'HTML.
    el.palette.innerHTML = palette.map(g => {
      const isUsed = usedGlyphs.includes(g);
      return `<div class="tk-cell ${isUsed ? 'used' : ''}" data-g="${g}">${g}</div>`;
    }).join('');
    el.palette.querySelectorAll('.tk-cell').forEach(cellEl => {
      cellEl.addEventListener('click', () => pick(cellEl.dataset.g));
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
