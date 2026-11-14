/* Site tools: dark/light theme toggle and Ctrl+K search.
   Vanilla JS, loaded at the end of <body> by _includes/scripts.html. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Theme toggle
     The initial theme is set by the inline script in _includes/head.html.
     ------------------------------------------------------------------ */
  var root = document.documentElement;
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function setTheme(theme, save) {
    root.setAttribute('data-theme', theme);
    if (save) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage blocked */ }
    }
  }

  // Follow the system setting live until the visitor makes an explicit choice.
  if (media) {
    var onSystemChange = function (e) {
      if (!savedTheme()) setTheme(e.matches ? 'dark' : 'light', false);
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.theme-toggle')) {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    }
  });

  /* ------------------------------------------------------------------
     Language menu (<details class="lang-menu">, _includes/lang-switcher.html)
     Opening/closing is native; this only closes it on outside click / Escape.
     ------------------------------------------------------------------ */
  function openLangMenus() {
    return document.querySelectorAll('details.lang-menu[open]');
  }

  document.addEventListener('click', function (e) {
    Array.prototype.forEach.call(openLangMenus(), function (menu) {
      if (!menu.contains(e.target)) menu.removeAttribute('open');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    Array.prototype.forEach.call(openLangMenus(), function (menu) {
      menu.removeAttribute('open');
      var toggle = menu.querySelector('summary');
      if (toggle && menu.contains(document.activeElement)) toggle.focus();
    });
  });

  /* ------------------------------------------------------------------
     Search
     ------------------------------------------------------------------ */
  var modal = document.getElementById('search-modal');
  if (!modal) return;

  var input = document.getElementById('search-input');
  var list = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  var scriptTag = document.querySelector('script[data-search-index]');
  var indexUrl = scriptTag ? scriptTag.getAttribute('data-search-index') : '/search.json';

  var MAX_RESULTS = 20;
  // Labels in the page language (set by _includes/search-modal.html)
  var T = {
    loading: modal.getAttribute('data-t-loading') || 'Loading…',
    unavailable: modal.getAttribute('data-t-unavailable') || 'Search is unavailable right now.',
    hint: modal.getAttribute('data-t-hint') || 'Type to search {n} pages and publications.',
    none: modal.getAttribute('data-t-none') || 'No results for “{q}”.',
    search: modal.getAttribute('data-t-search') || 'Search'
  };
  var pageLang = modal.getAttribute('data-lang') || document.documentElement.lang || 'en';
  var index = null;       // array of {title, url, type, date, venue, text, ...normalised fields}
  var loading = null;     // pending fetch promise
  var results = [];
  var active = -1;
  var lastFocus = null;

  var isMac = /Mac|iPhone|iPad/.test(
    (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || ''
  );
  if (isMac) {
    Array.prototype.forEach.call(document.querySelectorAll('.search-open__hint'), function (el) {
      el.textContent = '⌘K';
    });
    Array.prototype.forEach.call(document.querySelectorAll('.search-open'), function (el) {
      el.setAttribute('title', T.search + ' (⌘K)');
      el.setAttribute('aria-label', T.search + ' (⌘K)');
    });
  }

  // Lowercase and strip accents so "argentiere" matches "Argentière".
  function normalise(s) {
    return (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (loading) return loading;
    status.textContent = T.loading;
    loading = fetch(indexUrl)
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (data) {
        // keep this language's pages plus the language-neutral entries (papers, research pages)
        data = data.filter(function (d) { return !d.lang || d.lang === pageLang; });
        index = data.map(function (d) {
          d._title = normalise(d.title);
          d._meta = normalise([d.type, d.venue, d.date].join(' '));
          d._text = normalise(d.text);
          return d;
        });
        status.textContent = '';
        return index;
      })
      .catch(function () {
        loading = null;
        status.textContent = T.unavailable;
        return null;
      });
    return loading;
  }

  function search(query) {
    var terms = normalise(query).split(/\s+/).filter(Boolean);
    if (!terms.length || !index) return [];
    var out = [];
    index.forEach(function (d) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        var inTitle = d._title.indexOf(t) !== -1;
        var inMeta = d._meta.indexOf(t) !== -1;
        var inText = d._text.indexOf(t) !== -1;
        if (!inTitle && !inMeta && !inText) return; // every word must match
        score += (inTitle ? 10 : 0) + (inMeta ? 3 : 0) + (inText ? 1 : 0);
      }
      out.push({ doc: d, score: score, terms: terms });
    });
    out.sort(function (a, b) {
      return b.score - a.score || String(b.doc.date || '').localeCompare(String(a.doc.date || ''));
    });
    return out.slice(0, MAX_RESULTS);
  }

  // Append `text` to `parent`, wrapping occurrences of the terms in <mark>.
  // Matching is done on the normalised text; normalise() keeps one character per
  // original character for Latin text, so positions line up with the original.
  function appendHighlighted(parent, text, terms) {
    var norm = normalise(text);
    if (norm.length !== text.length) { parent.appendChild(document.createTextNode(text)); return; }
    var marks = [];
    terms.forEach(function (t) {
      var from = 0, pos;
      while ((pos = norm.indexOf(t, from)) !== -1) { marks.push([pos, pos + t.length]); from = pos + t.length; }
    });
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var cursor = 0;
    marks.forEach(function (m) {
      if (m[0] < cursor) return; // overlapping match
      if (m[0] > cursor) parent.appendChild(document.createTextNode(text.slice(cursor, m[0])));
      var mark = document.createElement('mark');
      mark.textContent = text.slice(m[0], m[1]);
      parent.appendChild(mark);
      cursor = m[1];
    });
    if (cursor < text.length) parent.appendChild(document.createTextNode(text.slice(cursor)));
  }

  function snippet(doc, terms) {
    var text = doc.text || '';
    var norm = normalise(text);
    var pos = -1;
    for (var i = 0; i < terms.length && pos === -1; i++) pos = norm.indexOf(terms[i]);
    if (pos === -1) return text.slice(0, 160) + (text.length > 160 ? '…' : '');
    var start = Math.max(0, pos - 60);
    var end = Math.min(text.length, start + 160);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }

  function render() {
    list.textContent = '';
    var query = input.value.trim();
    if (!query) {
      status.textContent = index ? T.hint.replace('{n}', index.length) : status.textContent;
      return;
    }
    status.textContent = results.length ? '' : T.none.replace('{q}', query);
    results.forEach(function (r, i) {
      var li = document.createElement('li');
      li.className = 'search-modal__item' + (i === active ? ' is-active' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === active ? 'true' : 'false');

      var a = document.createElement('a');
      a.href = r.doc.url;

      var head = document.createElement('span');
      head.className = 'search-modal__head';
      var type = document.createElement('span');
      type.className = 'search-modal__type';
      type.textContent = r.doc.type + (r.doc.date ? ' · ' + r.doc.date : '');
      var title = document.createElement('span');
      title.className = 'search-modal__title';
      appendHighlighted(title, r.doc.title || r.doc.url, r.terms);
      head.appendChild(title);
      head.appendChild(type);
      a.appendChild(head);

      var snip = snippet(r.doc, r.terms);
      if (snip) {
        var p = document.createElement('span');
        p.className = 'search-modal__snippet';
        appendHighlighted(p, snip, r.terms);
        a.appendChild(p);
      }

      a.addEventListener('mousemove', function () {
        if (active !== i) setActive(i);
      });
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function setActive(i) {
    var items = list.children;
    if (items[active]) {
      items[active].classList.remove('is-active');
      items[active].setAttribute('aria-selected', 'false');
    }
    active = i;
    if (items[active]) {
      items[active].classList.add('is-active');
      items[active].setAttribute('aria-selected', 'true');
      items[active].scrollIntoView({ block: 'nearest' });
    }
  }

  function update() {
    results = search(input.value);
    active = results.length ? 0 : -1;
    render();
  }

  function openSearch() {
    if (!modal.hidden) { input.focus(); input.select(); return; }
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('search-open-body');
    input.focus();
    input.select();
    loadIndex().then(function () { update(); });
  }

  function closeSearch() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('search-open-body');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  input.addEventListener('input', function () {
    if (index) update();
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (results.length) setActive((active + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (results.length) setActive((active - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      if (results[active]) {
        e.preventDefault();
        window.location.href = results[active].doc.url;
      }
    }
  });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.search-open')) {
      openSearch();
    } else if (e.target.closest('[data-search-close]')) {
      closeSearch();
    }
  });

  document.addEventListener('keydown', function (e) {
    var key = (e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && key === 'k') {
      e.preventDefault();
      openSearch();
    } else if (key === 'escape') {
      closeSearch();
    } else if (key === '/' && modal.hidden) {
      var el = document.activeElement;
      var typing = el && (el.isContentEditable || /^(input|textarea|select)$/i.test(el.tagName));
      if (!typing) {
        e.preventDefault();
        openSearch();
      }
    }
  });
})();
