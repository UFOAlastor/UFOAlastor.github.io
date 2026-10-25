/* KaTeX 渲染：只处理 build.py 产出的 .arithmatex 节点（math.js 随公式页按需加载）。
 * 支持 $…$ / \(…\) 行内，$$…$$ / \[…\] 块级——两者都由 arithmatex 统一成
 * <span class="arithmatex">\(…\)</span> 与 <div class="arithmatex">\[…\]</div>。 */
(function () {
  function tex(node) {
    var s = (node.textContent || '').trim();
    var disp = false;
    if (s.slice(0, 2) === '$$' && s.slice(-2) === '$$') { s = s.slice(2, -2); disp = true; }
    else if (s.slice(0, 2) === '\\[' && s.slice(-2) === '\\]') { s = s.slice(2, -2); disp = true; }
    else if (s.slice(0, 2) === '\\(' && s.slice(-2) === '\\)') { s = s.slice(2, -2); }
    else if (s.charAt(0) === '$' && s.slice(-1) === '$') { s = s.slice(1, -1); }
    if (node.tagName === 'DIV') disp = true;
    return { tex: s.trim(), display: disp };
  }

  function run() {
    var nodes = [].slice.call(document.querySelectorAll('.arithmatex'));
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node.getAttribute('data-tex-rendered')) continue;
      var src = tex(node);
      if (!src.tex) continue;
      try {
        window.katex.render(src.tex, node, {
          displayMode: src.display,
          throwOnError: false,
          strict: false,
          trust: false,
          errorColor: '#b00020',
          macros: { '\\R': '\\mathbb{R}' }
        });
        node.setAttribute('data-tex-rendered', '1');
      } catch (e) {
        node.setAttribute('data-tex-rendered', 'error');
        node.className += ' arithmatex-error';
        node.textContent = src.tex;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
