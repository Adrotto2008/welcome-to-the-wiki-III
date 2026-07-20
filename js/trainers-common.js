// Gestione dei tab della pagina allenamenti
(function () {
  const tabs = document.querySelectorAll('.ttab');
  const panels = document.querySelectorAll('.trainer-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });
})();
