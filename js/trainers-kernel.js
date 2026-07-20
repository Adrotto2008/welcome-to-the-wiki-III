// Trainer K3RN3LCOMP1L3R — digitazione delle righe evidenziate

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

  const el = {
    header: document.getElementById('k-header'),
    lines: document.getElementById('k-lines'),
    input: document.getElementById('k-input'),
    counter: document.getElementById('k-counter'),
    banner: document.getElementById('k-banner'),
    resetBtn: document.getElementById('k-reset'),
    diffButtons: document.querySelectorAll('#k-diff button')
  };

  function currentLine() {
    return blocks[blockIndex][lineIndex];
  }

  function totalBlocksLeft() {
    return blocks.length - blockIndex;
  }

  function render() {
    el.header.textContent = '0xFF' + (blockIndex * 7 + lineIndex + 3).toString(16).toUpperCase().padStart(2, '0') + 'N4';
    el.counter.textContent = totalBlocksLeft();
    const block = blocks[blockIndex];
    el.lines.innerHTML = block.map((line, i) => {
      if (i < lineIndex) return `<div class="t-line">${i}&nbsp;&nbsp;${escapeHtml(line)}</div>`;
      if (i === lineIndex) return `<div class="t-line active" id="k-active-line">${i}&nbsp;&nbsp;${renderCompare(line, typed)}</div>`;
      return `<div class="t-line" style="opacity:0.35;">${i}&nbsp;&nbsp;${escapeHtml(line)}</div>`;
    }).join('');
  }

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  }

  function renderCompare(target, input) {
    let out = '';
    let mismatchAt = -1;
    for (let i = 0; i < target.length; i++) {
      if (i >= input.length) { out += escapeHtml(target[i]); continue; }
      if (mismatchAt === -1 && input[i] !== target[i]) mismatchAt = i;
      if (mismatchAt !== -1) out += `<span class="char-bad">${escapeHtml(target[i])}</span>`;
      else out += `<span class="char-ok">${escapeHtml(target[i])}</span>`;
    }
    return out;
  }

  function showBanner(msg, type) {
    el.banner.textContent = msg;
    el.banner.className = 'banner show ' + type;
  }

  function hideBanner() {
    el.banner.className = 'banner';
  }

  function submit() {
    if (typed === currentLine()) {
      typed = '';
      lineIndex++;
      if (lineIndex >= blocks[blockIndex].length) {
        lineIndex = 0;
        blockIndex++;
        if (blockIndex >= blocks.length) {
          showBanner('HACK BLOCCATO — tutti i blocchi risolti.', 'win');
          el.input.disabled = true;
          render();
          return;
        }
      }
      hideBanner();
      render();
    } else {
      // errore già visibile via renderCompare, non si sottomette
    }
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
    el.input.value = '';
    el.input.disabled = false;
    hideBanner();
    render();
    el.input.focus();
  }

  reset();
})();
