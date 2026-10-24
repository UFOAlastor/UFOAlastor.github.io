/* mermaid 按需渲染：只在正文出现 mermaid 围栏的页面加载本文件。
   配色跟站内黑白灰 + 金 #DBB302 对齐，不用默认蓝。 */
(function () {
  var nodes = [].slice.call(document.querySelectorAll('.mermaid'));
  if (!nodes.length || !window.mermaid) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    themeVariables: {
      background: '#ffffff',
      primaryColor: '#faf6e3',
      primaryBorderColor: '#DBB302',
      primaryTextColor: '#1a1a1a',
      secondaryColor: '#f2f2f2',
      secondaryBorderColor: '#c9c4b6',
      secondaryTextColor: '#1a1a1a',
      tertiaryColor: '#ffffff',
      tertiaryBorderColor: '#e0dccf',
      tertiaryTextColor: '#1a1a1a',
      lineColor: '#8a6b00',
      textColor: '#1a1a1a',
      mainBkg: '#faf6e3',
      nodeBorder: '#DBB302',
      clusterBkg: '#f7f7f5',
      clusterBorder: '#d8d4c6',
      edgeLabelBackground: '#ffffff',
      noteBkgColor: '#fffbe9',
      noteBorderColor: '#DBB302',
      actorBkg: '#faf6e3',
      actorBorder: '#DBB302',
      signalColor: '#4a4a4a',
      signalTextColor: '#1a1a1a',
      labelBoxBkgColor: '#faf6e3',
      labelBoxBorderColor: '#DBB302',
      pie1: '#DBB302', pie2: '#8a6b00', pie3: '#c9c4b6', pie4: '#4a4a4a', pie5: '#e6d9a0'
    },
    flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis' },
    sequence: { useMaxWidth: false },
    gantt: { useMaxWidth: false },
    class: { useMaxWidth: false }
  });

  /* 逐块渲染：单块出错只毁那一块，不连坐整页 */
  nodes.forEach(function (el, i) {
    var src = el.textContent;
    el.setAttribute('data-src', src);
    el.innerHTML = '';
    mermaid.render('mmd-' + i, src).then(function (res) {
      el.innerHTML = res.svg;
      if (res.bindFunctions) res.bindFunctions(el);
    }).catch(function () {
      el.classList.add('mermaid-error');
      el.textContent = src;
    });
  });
})();
