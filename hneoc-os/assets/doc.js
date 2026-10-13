/* HNeoC-OS 文档站脚本：移动端菜单 + 本页目录生成与滚动高亮 */
(function () {
  "use strict";

  /* 移动端侧边栏开关 */
  var btn = document.querySelector(".menu-btn");
  var sidebar = document.querySelector(".sidebar");
  if (btn && sidebar) {
    btn.addEventListener("click", function () { sidebar.classList.toggle("open"); });
    sidebar.addEventListener("click", function (e) {
      if (e.target.tagName === "A") sidebar.classList.remove("open");
    });
  }

  /* 由文章标题生成本页目录 */
  var article = document.querySelector("article");
  var toc = document.getElementById("toc");
  if (!article || !toc) return;

  var heads = article.querySelectorAll("h2[id], h3[id]");
  if (!heads.length) { toc.parentElement.style.display = "none"; return; }

  heads.forEach(function (h) {
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent;
    if (h.tagName === "H3") a.className = "lvl3";
    toc.appendChild(a);
  });

  /* 滚动高亮当前章节 */
  var links = toc.querySelectorAll("a");
  var byId = {};
  links.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });

  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("active"); });
          var l = byId[en.target.id];
          if (l) l.classList.add("active");
        }
      });
    }, { rootMargin: "-90px 0px -70% 0px", threshold: 0 });
    heads.forEach(function (h) { obs.observe(h); });
  }
})();
