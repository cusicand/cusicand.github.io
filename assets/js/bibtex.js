// Show/hide a publication's BibTeX entry and copy it to the clipboard.
// The icon is a normal link to the .bib file, so it still works without JavaScript.
document.addEventListener('click', function (event) {
  var toggle = event.target.closest('.bibtex-toggle');
  if (toggle) {
    var box = toggle.closest('article').querySelector('.bibtex-box');
    if (!box) return;
    event.preventDefault();
    var pre = box.querySelector('pre');
    if (box.dataset.loaded) {
      box.hidden = !box.hidden;
      return;
    }
    fetch(toggle.getAttribute('href'))
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.text();
      })
      .then(function (text) {
        pre.textContent = text.trim();
        box.dataset.loaded = 'true';
        box.hidden = false;
      })
      .catch(function () {
        window.location.href = toggle.getAttribute('href');
      });
    return;
  }

  var copy = event.target.closest('.bibtex-copy');
  if (copy) {
    var text = copy.parentElement.querySelector('pre').textContent;
    navigator.clipboard.writeText(text).then(function () {
      copy.textContent = copy.getAttribute('data-copied') || 'Copied!';
      var label = copy.getAttribute('data-label') || copy.textContent; copy.setAttribute('data-label', label); setTimeout(function () { copy.textContent = label; }, 1500);
    });
  }
});
