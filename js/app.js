// Logica di rendering della evidence board (dipende da THREATS definito in threats-data.js)

const board = document.getElementById('board');
const searchInput = document.getElementById('searchInput');
const filterGroup = document.getElementById('filterGroup');
let currentFilter = 'all';

function renderBoard(){
  const query = searchInput.value.trim().toLowerCase();
  const filtered = THREATS.filter(t => {
    const matchesFilter = currentFilter === 'all' || t.status === currentFilter;
    const haystack = (t.name + ' ' + (t.aka || '') + ' ' + t.origin).toLowerCase();
    const matchesQuery = haystack.includes(query);
    return matchesFilter && matchesQuery;
  });

  board.innerHTML = '';
  if (filtered.length === 0) {
    board.innerHTML = '<p style="font-family:\'IBM Plex Mono\',monospace; color:#8a8072; grid-column:1/-1; text-align:center; padding:40px 0;">Nessun dossier corrisponde alla ricerca.</p>';
    return;
  }

  filtered.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="pin"></div>
      ${t.conflict ? '<div class="conflict-flag">Da verificare</div>' : ''}
      <div class="tag-row">
        <span class="origin-tag">${t.origin}</span>
        <span class="status-stamp ${t.status}">${t.status === 'confirmed' ? 'Confermato' : 'Solo community'}</span>
      </div>
      <h3>${t.name}</h3>
      ${t.aka ? `<div class="aka">"${t.aka}"</div>` : ''}
      <p class="teaser">${t.teaser}</p>
      <span class="read-more">Apri dossier →</span>
    `;
    card.addEventListener('click', () => openModal(t.id));
    board.appendChild(card);
  });
}

function openModal(id){
  const t = THREATS.find(x => x.id === id);
  const overlay = document.getElementById('modalOverlay');
  const modal = document.getElementById('modalContent');
  modal.innerHTML = `
    <button class="close-btn" id="closeModalBtn">✕</button>
    <div class="tag-row">
      <span class="origin-tag">${t.origin}</span>
      <span class="status-stamp ${t.status}">${t.status === 'confirmed' ? 'Confermato' : 'Solo community'}</span>
    </div>
    <h2>${t.name}</h2>
    ${t.aka ? `<div class="aka">"${t.aka}"</div>` : ''}
    ${t.dossier ? `<div class="dossier-quote">${t.dossier}</div>` : ''}
    <div class="section-label">Contromisure</div>
    <ul>${t.counters.map(c => `<li>${c}</li>`).join('')}</ul>
    <div class="section-label">Cue / segnali</div>
    <p class="cue-note">${t.cue}</p>
    ${t.conflict ? `<div class="conflict-box"><b>⚠ Da verificare</b>${t.conflict}</div>` : ''}
    <div class="source-tag">Fonte: ${t.source}</div>
  `;
  overlay.classList.add('open');
  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
}

function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
}

document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'modalOverlay') closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

filterGroup.addEventListener('click', (e) => {
  if (!e.target.classList.contains('filter-btn')) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentFilter = e.target.dataset.filter;
  renderBoard();
});

searchInput.addEventListener('input', renderBoard);

renderBoard();
