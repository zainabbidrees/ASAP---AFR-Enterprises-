/* =========================================================
   AFR Enterprises — Homepage SHELL behaviour
   Minimal, dependency-free interactions for the scaffold:
   mobile nav, dropdown tap, category tabs, cookie banner.
   ========================================================= */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.querySelector(".nav-toggle");
  var navList = document.getElementById("primary-nav");
  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      var open = navList.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---- Dropdown menus: tap/click to open on touch/mobile ---- */
  document.querySelectorAll(".has-dropdown > a").forEach(function (trigger) {
    trigger.addEventListener("click", function (e) {
      // Only intercept the placeholder (#) triggers so real links still work.
      if (trigger.getAttribute("href") === "#") {
        e.preventDefault();
        var li = trigger.parentElement;
        var isOpen = li.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", String(isOpen));
      }
    });
  });

  /* ---- Browse By Categories: tab switching ---- */
  var tabs = document.querySelectorAll(".tabs .tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var group = tab.closest(".browse-categories__content");
      if (!group) return;
      group.querySelectorAll(".tab").forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      group.querySelectorAll(".tab-panel").forEach(function (p) {
        p.classList.remove("is-active");
        p.hidden = true;
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      var panel = group.querySelector('.tab-panel[data-panel="' + tab.dataset.tab + '"]');
      if (panel) {
        panel.classList.add("is-active");
        panel.hidden = false;
      }
    });
  });

  /* ---- Cookie banner dismiss ---- */
  var cookieBanner = document.getElementById("cookie-banner");
  if (cookieBanner) {
    cookieBanner.querySelectorAll("[data-cookie-accept], [data-cookie-close]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        cookieBanner.classList.add("is-hidden");
      });
    });
  }
})();
