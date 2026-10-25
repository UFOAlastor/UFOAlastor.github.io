/* Alastor.top v2 — 交互脚本（无 jQuery、无外部依赖） */
(function () {
  'use strict';

  /* ---------- 回到顶部 ---------- */
  var topBtn = document.getElementById('go-top');
  if (topBtn) {
    var onScroll = function () {
      topBtn.classList.toggle('show', window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 建站计时（2020-04-02 起） ---------- */
  var timerEl = document.getElementById('show_date_time');
  if (timerEl) {
    var birth = new Date((timerEl.dataset.birth || '2020-04-02') + 'T00:00:01+08:00');
    var tick = function () {
      var ms = Date.now() - birth.getTime();
      var d = Math.floor(ms / 86400000);
      var h = Math.floor(ms % 86400000 / 3600000);
      var m = Math.floor(ms % 3600000 / 60000);
      var s = Math.floor(ms % 60000 / 1000);
      timerEl.textContent = '本站已愉快蹦哒' + d + '天' + h + '小时' + m + '分' + s + '秒';
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 页脚 Nyan Cat ---------- */
  var cat = document.querySelector('.footer-cat');
  if (cat) {
    cat.addEventListener('click', function () {
      location.href = cat.dataset.nyan;
    });
  }

  /* ---------- 移动端菜单：打开时锁滚动 ---------- */
  var toggle = document.getElementById('nav-toggle');
  if (toggle) {
    var closeMenu = function () { toggle.checked = false; document.body.style.overflow = ''; };
    toggle.addEventListener('change', function () {
      document.body.style.overflow = toggle.checked ? 'hidden' : '';
    });
    /* 点菜单里的链接、点菜单空白处，都要能收起 */
    var menu = document.querySelector('.menu');
    if (menu) {
      menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
      menu.addEventListener('click', function (e) { if (!e.target.closest('a')) closeMenu(); });
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- 点击爱心 ---------- */
  var hearts = [];
  var COLORS = ['#ff5d5d', '#ffb302', '#ff77a9', '#7ad1ff', '#b58cff'];
  function spawnHeart(x, y) {
    var el = document.createElement('div');
    el.className = 'heart';
    el.style.left = (x - 5) + 'px';
    el.style.top = (y - 5) + 'px';
    var color = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.background = color;
    document.body.appendChild(el);
    hearts.push({ el: el, x: x - 5, y: y - 5, scale: 1, alpha: 1, color: color });
  }
  function loop() {
    for (var i = hearts.length - 1; i >= 0; i--) {
      var h = hearts[i];
      h.y -= 1;
      h.scale += 0.004;
      h.alpha -= 0.013;
      if (h.alpha <= 0) {
        h.el.remove();
        hearts.splice(i, 1);
        continue;
      }
      h.el.style.cssText = 'left:' + h.x + 'px;top:' + h.y + 'px;opacity:' + h.alpha +
        ';background:' + h.color + ';transform:rotate(45deg) scale(' + h.scale + ',' + h.scale + ')';
    }
    requestAnimationFrame(loop);
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button, input, textarea, label')) return;
    spawnHeart(e.clientX, e.clientY);
  });
  requestAnimationFrame(loop);

  /* ---------- 一言打字机（hitokoto，失败降级） ---------- */
  var box = document.getElementById('hitokoto');
  if (box) {
    var textEl = box.querySelector('.text');
    var fromEl = document.getElementById('hitokoto-from');
    var FALLBACK = [
      ['では、ゲームを始めましょう', '本站'],
      ['愿你出走半生，归来仍是少年。', '一言'],
      ['代码写完了，天也亮了。', '本站'],
      ['生活明朗，万物可爱。', '一言'],
      ['慢一点，也没关系。', '本站']
    ];
    var type = function (str, from) {
      textEl.textContent = '';
      if (fromEl) fromEl.textContent = from ? '— ' + from : '';
      var i = 0;
      var step = function () {
        if (i > str.length) return;
        textEl.textContent = str.slice(0, i);
        i += 1;
        setTimeout(step, 70);
      };
      step();
    };
    var pick = FALLBACK[Math.floor(Math.random() * FALLBACK.length)];

    var done = false;
    var timer = setTimeout(function () {
      if (!done) { done = true; type(pick[0], pick[1]); }
    }, 3500);

    fetch('https://v1.hitokoto.cn/?encode=json&charset=utf-8', { mode: 'cors' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        var src = d.from || d.from_who || pick[1];
        type(d.hitokoto || pick[0], src);
      })
      .catch(function () {
        if (done) return;
        done = true;
        clearTimeout(timer);
        type(pick[0], pick[1]);
      });
  }
})();
