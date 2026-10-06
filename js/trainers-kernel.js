// Trainer K3RN3LCOMP1L3R — digitazione delle righe evidenziate
//
// BUG CORRETTI in questa versione:
// 1) Il campo di input non veniva mai svuotato dopo aver completato correttamente
//    una riga: il testo vecchio restava nel box e si sommava a quello nuovo,
//    rendendo impossibile completare la riga successiva senza cancellare a mano.
// 2) Al completamento dell'ULTIMO blocco, l'indice veniva incrementato oltre
//    il numero di blocchi disponibili e poi si chiamava comunque render():
//    "blocks[blockIndex]" risultava undefined e lo script andava in errore
//    (schermata che restava a metà, console con TypeError).
// Aggiunte: maxlength sul campo per non poter "sovra-digitare", e un indicatore
// visivo (bordo/colore rosso sul campo) quando il testo digitato non combacia.

(function () {
  const EASY_BLOCKS = [
    ["The sounds drew nearer.", "Three blows were struck upon the panel of the door."],
    ["Someone is testing the handle.", "The static on the line will not clear."]
  ];
  const HARD_BLOCKS = [
    ['cin.getline(line, 150);', 'while ("$binary" -ne 0); do', 'const float delay = 0.35f + jitter;'],
    ['enum Result<T, E> { Ok(T), Err(E) }', 'if (retry_count >= MAX_RETRY) break;', 'default: return Status::UNKNOWN;']
  ];

  let blocks = EASY_BLOCKS;
  let blockIndex = 0;
  let lineIndex = 0;
  let typed = '';
  let difficulty = 'easy';
  let completed = false;

  const el = {
    header: document.getElementById('k-header'),
    lines: document.getElementById('k-lines'),
    input: document.getElementById('k-input'),
    counter: document.getElementById('k-counter'),
    banner: document.getElementById('k-banner'),
    resetBtn: document.getElementById('k-reset'),
    diffButtons: document.querySelectorAll('#k-diff button')
  };

  function currentBlock() { return blocks[blockIndex]; }
  function currentLine() { return currentBlock()[lineIndex]; }
  function blocksLeft() { return completed ? 0 : blocks.length - blockIndex; }

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  // Confronta target e testo digitato carattere per carattere.
  // Ritorna anche se c'è un mismatch, così possiamo colorare pure il campo input.
  function renderCompare(target, input) {
    let out = '';
    let mismatchAt = -1;
    for (let i = 0; i < target.length; i++) {
      if (i >= input.length) { out += escapeHtml(target[i]); continue; }
      if (mismatchAt === -1 && input[i] !== target[i]) mismatchAt = i;
      out += mismatchAt !== -1
        ? `<span class="char-bad">${escapeHtml(target[i])}</span>`
        : `<span class="char-ok">${escapeHtml(target[i])}</span>`;
    }
    return { html: out, hasMismatch: mismatchAt !== -1 };
  }

  function render() {
    const block = currentBlock();
    el.header.textContent = '0xFF' + (blockIndex * 7 + lineIndex + 3).toString(16).toUpperCase().padStart(2, '0') + 'N4';
    el.counter.textContent = blocksLeft();

    el.lines.innerHTML = block.map((line, i) => {
      if (completed || i < lineIndex) {
        return `<div class="t-line">${i}&nbsp;&nbsp;${escapeHtml(line)}</div>`;
      }
      if (i === lineIndex) {
        const cmp = renderCompare(line, typed);
        el.input.classList.toggle('is-wrong', cmp.hasMismatch);
        el.input.maxLength = line.length;
        return `<div class="t-line active">${i}&nbsp;&nbsp;${cmp.html}</div>`;
      }
      return `<div class="t-line" style="opacity:0.35;">${i}&nbsp;&nbsp;${escapeHtml(line)}</div>`;
    }).join('');
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }
  function hideBanner() { el.banner.className = 'banner'; }

  function submit() {
    if (completed) return;
    if (typed !== currentLine()) return; // il colore rosso già segnala l'errore, niente da fare qui

    const block = currentBlock();

    // FIX bug #1: il campo va sempre svuotato quando si avanza di riga.
    typed = '';
    el.input.value = '';
    el.input.classList.remove('is-wrong');

    // FIX bug #2: calcoliamo se è l'ultima riga/ultimo blocco PRIMA di toccare
    // gli indici, così non finiamo mai fuori range.
    if (lineIndex < block.length - 1) {
      lineIndex++;
    } else if (blockIndex < blocks.length - 1) {
      blockIndex++;
      lineIndex = 0;
    } else {
      completed = true;
      el.input.disabled = true;
      showBanner('HACK BLOCCATO — tutti i blocchi risolti.', 'win');
      render();
      return;
    }
    hideBanner();
    render();
  }

  el.input.addEventListener('input', (e) => {
    typed = e.target.value;
    render();
  });
  el.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
  });

  el.resetBtn.addEventListener('click', reset);
  el.diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      difficulty = btn.dataset.diff;
      el.diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      reset();
    });
  });

  function reset() {
    blocks = difficulty === 'hard' ? HARD_BLOCKS : EASY_BLOCKS;
    blockIndex = 0;
    lineIndex = 0;
    typed = '';
    completed = false;
    el.input.value = '';
    el.input.disabled = false;
    el.input.classList.remove('is-wrong');
    hideBanner();
    render();
    el.input.focus();
  }

  reset();
})();
