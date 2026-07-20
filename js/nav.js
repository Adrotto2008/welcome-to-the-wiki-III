// Nav condivisa tra tutte le pagine del sito.
// Ogni pagina imposta <body data-page="..."> per evidenziare la voce attiva.
(function () {
  const page = document.body.dataset.page || '';
  const links = [
    { id: 'home', href: 'index.html', label: 'Hub' },
    { id: 'threats', href: 'threats.html', label: 'Minacce' },
    { id: 'virtmesh', href: 'virtmesh.html', label: 'VirtMesh' },
    { id: 'hacks', href: 'hacks.html', label: 'Minigiochi' },
    { id: 'trainers', href: 'trainers.html', label: 'Allenamenti' }
  ];
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.innerHTML = links
    .map(l => `<a href="${l.href}" class="nav-link ${l.id === page ? 'active' : ''}">${l.label}</a>`)
    .join('');
})();
