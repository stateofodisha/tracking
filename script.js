/* =========================================================
   State of Odisha — Govt Project Tracker
   App logic (no build step — plain JS for GitHub Pages)
   ========================================================= */

(function(){
  "use strict";

  var root = document.documentElement;
  var grid = document.getElementById("grid");
  var searchInput = document.getElementById("searchInput");
  var statusFilter = document.getElementById("statusFilter");
  var viewButtons = document.querySelectorAll(".view-switch button");
  var body = document.body;

  /* ---------------- theme ---------------- */
  function applyTheme(t){
    root.setAttribute("data-theme", t);
    try{ localStorage.setItem("soo-theme", t); }catch(e){}
  }
  (function initTheme(){
    var saved;
    try{ saved = localStorage.getItem("soo-theme"); }catch(e){}
    if(!saved){
      saved = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(saved);
  })();
  var themeToggle = document.getElementById("themeToggle");
  if(themeToggle){
    themeToggle.addEventListener("click", function(){
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  /* ---------------- helpers ---------------- */
  function daysPassed(dateStr){
    var start = new Date(dateStr + "T00:00:00");
    var now = new Date();
    var diff = Math.floor((now - start) / 86400000);
    return diff < 0 ? 0 : diff;
  }
  function formatDate(dateStr){
    var d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
  }
  function statusLabel(p){
    return p.status.label || p.status.type;
  }

  /* ---------------- current view state ---------------- */
  var currentView = "cards";
  (function initView(){
    var saved;
    try{ saved = localStorage.getItem("soo-view"); }catch(e){}
    currentView = saved || "cards";
    body.className = "view-" + currentView;
    viewButtons.forEach(function(b){ b.classList.toggle("active", b.dataset.view === currentView); });
  })();

  viewButtons.forEach(function(btn){
    btn.addEventListener("click", function(){
      currentView = btn.dataset.view;
      body.className = "view-" + currentView;
      viewButtons.forEach(function(b){ b.classList.toggle("active", b === btn); });
      try{ localStorage.setItem("soo-view", currentView); }catch(e){}
      render();
    });
  });

  /* ---------------- filtering ---------------- */
  function getFiltered(){
    var q = (searchInput.value || "").trim().toLowerCase();
    var status = statusFilter.value;
    return PROJECTS.filter(function(p){
      var matchesQ = !q || (p.title + " " + p.category + " " + p.location).toLowerCase().indexOf(q) !== -1;
      var matchesStatus = status === "all" || p.status.type === status;
      return matchesQ && matchesStatus;
    });
  }
  searchInput.addEventListener("input", render);
  statusFilter.addEventListener("change", render);

  /* ---------------- card markup ---------------- */
  function cardHTML(p, layout){
    var days = daysPassed(p.announcedOn);
    var url = p.detailUrl || ("projects/project.html?id=" + encodeURIComponent(p.id));

    if(layout === "gallery"){
      return (
        '<article class="card" tabindex="0" role="link" data-url="' + url + '">' +
          '<div class="art"><span class="cat-badge">' + p.category + '</span></div>' +
          '<div class="card-body">' +
            '<span class="status-pill ' + p.status.type + '">' + statusLabel(p) + '</span>' +
            '<h3>' + p.title + '</h3>' +
            '<div class="card-row">' +
              '<div class="mini-stat"><div class="mn">' + formatDate(p.announcedOn) + '</div><div class="ml">Announced</div></div>' +
              '<div class="mini-stat days"><div class="mn">' + days + '</div><div class="ml">Days Passed</div></div>' +
            '</div>' +
          '</div>' +
        '</article>'
      );
    }

    if(layout === "list"){
      return (
        '<article class="card" tabindex="0" role="link" data-url="' + url + '">' +
          '<div class="list-main">' +
            '<span class="cat">' + p.category + '</span>' +
            '<h3>' + p.title + '</h3>' +
            '<span class="loc">' + p.location + '</span>' +
          '</div>' +
          '<div class="card-row">' +
            '<div class="mini-stat"><div class="mn">' + formatDate(p.announcedOn) + '</div><div class="ml">Announced</div></div>' +
            '<div class="mini-stat days"><div class="mn">' + days + '</div><div class="ml">Days</div></div>' +
          '</div>' +
          '<div class="card-foot"><span class="status-pill ' + p.status.type + '">' + statusLabel(p) + '</span></div>' +
        '</article>'
      );
    }

    var summary = layout === "large" ? '<p class="summary">' + p.summary + '</p>' : '';
    return (
      '<article class="card" tabindex="0" role="link" data-url="' + url + '">' +
        '<span class="cat">' + p.category + '</span>' +
        '<h3>' + p.title + '</h3>' +
        '<span class="loc">' + p.location + '</span>' +
        summary +
        '<div class="card-row">' +
          '<div class="mini-stat"><div class="mn">' + formatDate(p.announcedOn) + '</div><div class="ml">Announced On</div></div>' +
          '<div class="mini-stat days"><div class="mn">' + days + '</div><div class="ml">Days Passed</div></div>' +
        '</div>' +
        '<div class="card-foot"><span class="status-pill ' + p.status.type + '">' + statusLabel(p) + '</span></div>' +
      '</article>'
    );
  }

  /* ---------------- render ---------------- */
  function render(){
    var items = getFiltered();
    var layout = currentView === "large" ? "large" : currentView === "list" ? "list" : currentView === "gallery" ? "gallery" : "card";

    if(!items.length){
      grid.innerHTML = '<div class="empty-state">' +
        '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
        '<div>No projects match your search.</div></div>';
      return;
    }

    grid.innerHTML = items.map(function(p){ return cardHTML(p, layout); }).join("");

    grid.querySelectorAll(".card").forEach(function(card){
      var url = card.getAttribute("data-url");
      card.addEventListener("click", function(){ window.location.href = url; });
      card.addEventListener("keydown", function(e){
        if(e.key === "Enter" || e.key === " "){ e.preventDefault(); window.location.href = url; }
      });
    });

    updateStats();
  }

  /* ---------------- stat strip ---------------- */
  function updateStats(){
    var total = PROJECTS.length;
    var stuck = PROJECTS.filter(function(p){ return p.status.type === "stuck"; }).length;
    var progress = PROJECTS.filter(function(p){ return p.status.type === "progress"; }).length;
    var completed = PROJECTS.filter(function(p){ return p.status.type === "completed"; }).length;
    document.getElementById("statTotal").textContent = total;
    document.getElementById("statStuck").textContent = stuck;
    document.getElementById("statProgress").textContent = progress;
    document.getElementById("statCompleted").textContent = completed;
  }

  /* ---------------- carousel nav ---------------- */
  var prevBtn = document.getElementById("carPrev");
  var nextBtn = document.getElementById("carNext");
  if(prevBtn && nextBtn){
    prevBtn.addEventListener("click", function(){ grid.scrollBy({ left:-320, behavior:"smooth" }); });
    nextBtn.addEventListener("click", function(){ grid.scrollBy({ left:320, behavior:"smooth" }); });
  }

  render();
})();
