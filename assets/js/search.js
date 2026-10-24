/* Alastor.top v2 — 站内搜索（本地 JSON 索引，前端过滤，无外部库） */
(function () {
  'use strict';
  var input = document.getElementById('q');
  var list = document.getElementById('results');
  var meta = document.getElementById('meta');
  var empty = document.getElementById('empty');
  if (!input || !list) return;

  // 搜索页在 /search/，索引在 /api/search.json；用页面注入的地址，保证相对路径正确
  var url = window.SEARCH_INDEX_URL || '../api/search.json';
  var index = null;
  var loading = false;

  function esc(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
    });
  }
  function mark(text, terms) {
    var out = esc(text);
    terms.forEach(function (t) {
      if (t.length < 1) return;
      var re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
      out = out.replace(re, '<mark>$1</mark>');
    });
    return out;
  }

  function load() {
    if (index || loading) return;
    loading = true;
    fetch(url).then(function (r) { return r.json(); }).then(function (d) {
      index = d;
      if (meta) meta.textContent = '索引共 ' + d.length + ' 篇，输入即搜。';
      run();
    }).catch(function () {
      if (meta) meta.textContent = '索引加载失败（本地 file:// 打开时请改用 http 预览）。';
    });
  }

  function run() {
    if (!index) return;
    var q = input.value.trim().toLowerCase();
    if (!q) {
      list.innerHTML = '';
      if (empty) empty.hidden = true;
      if (meta) meta.textContent = '索引共 ' + index.length + ' 篇，输入即搜。';
      return;
    }
    var terms = q.split(/\s+/).filter(Boolean);
    var hits = [];
    index.forEach(function (p) {
      var hay = (p.title + ' ' + (p.tags || []).join(' ') + ' ' + p.text + ' ' + p.excerpt).toLowerCase();
      var ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      if (!ok) return;
      var score = 0;
      terms.forEach(function (t) {
        if (p.title.toLowerCase().indexOf(t) !== -1) score += 5;
        if ((p.tags || []).join(' ').toLowerCase().indexOf(t) !== -1) score += 3;
        score += Math.min(3, (p.text.toLowerCase().split(t).length - 1));
      });
      hits.push({ p: p, score: score });
    });
    hits.sort(function (a, b) { return b.score - a.score || (a.p.date < b.p.date ? 1 : -1); });
    if (meta) meta.textContent = '找到 ' + hits.length + ' 篇' + (hits.length > 40 ? '（显示前 40）' : '') + '。';
    if (empty) empty.hidden = hits.length !== 0;
    list.innerHTML = hits.slice(0, 40).map(function (h) {
      var p = h.p;
      return '<li><h2><a href="../' + p.url + '">' + mark(p.title, terms) + '</a></h2>' +
        (p.excerpt ? '<p>' + mark(p.excerpt, terms) + '</p>' : '') +
        '<div class="meta">' + p.date + (p.tags && p.tags.length ? ' · ' + esc(p.tags.join(' / ')) : '') + '</div></li>';
    }).join('');
  }

  var t = null;
  input.addEventListener('focus', load);
  input.addEventListener('input', function () {
    load();
    clearTimeout(t);
    t = setTimeout(run, 90);
  });
})();
