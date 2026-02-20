// Premium bypass - makes extension fully free, no paid features
(function() {
  'use strict';
  var proInterval = null;
  var extDead = false;
  var PRO_DATA = {
    pro: true,
    isPro: true,
    proUser: true,
    subscription: 'active',
    premium: true,
    xtensions_pro: true,
    quick: true,
    counterFreeUnfollowsLeft: 999999,
    counterFreeFollowsLeft: 999999
  };

  function stopProBypass() {
    extDead = true;
    if (proInterval) { clearInterval(proInterval); proInterval = null; }
  }

  function setProStatus() {
    if (extDead) return;
    var c = typeof chrome !== 'undefined' ? chrome : null;
    if (!c || !c.storage || !c.storage.local) return;
    try {
      c.storage.local.get(null, function(items) {
        if (extDead) return;
        try {
          if (items && typeof items === 'object') {
            c.storage.local.set(Object.assign({}, items, PRO_DATA));
          } else {
            c.storage.local.set(PRO_DATA);
          }
        } catch (err) { stopProBypass(); }
      });
    } catch (err) { stopProBypass(); }
  }

  try {
    if (typeof chrome !== 'undefined' && chrome && chrome.storage) {
      setProStatus();
      proInterval = setInterval(setProStatus, 5000);
    }
  } catch (e) { extDead = true; }

  // Hide the PRO/Demo upgrade banner - search within extension containers only
  function hideProBanner() {
    try {
      if (typeof document === 'undefined' || !document.body) return;
      var root = document.getElementById('MY-RENDER-SPOT') || document.getElementById('MY-RENDER-SPOT-Follower') || document.body;
      if (!root || !root.querySelectorAll) return;
      var list = root.querySelectorAll('div');
      for (var i = 0; i < Math.min(list.length, 300); i++) {
        var el = list[i];
        if (el.getAttribute && el.getAttribute('data-pro-hidden') === '1') continue;
        var t = (el.innerText || el.textContent || '').toLowerCase();
        if (t.length > 40 && t.length < 400 && t.indexOf('unfollows left') !== -1 &&
            (t.indexOf('demo') !== -1 || t.indexOf('get pro') !== -1)) {
          el.style.setProperty('display', 'none', 'important');
          el.setAttribute('data-pro-hidden', '1');
        }
      }
    } catch (e) {}
  }

  if (typeof document !== 'undefined') {
    function run() { try { hideProBanner(); } catch (e) {} }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
    setTimeout(function() { setInterval(run, 3000); }, 3000);

    // Block clicks to pro/payment pages
    document.addEventListener('click', function(e) {
      try {
        var el = e.target;
        while (el && el !== document) {
          if (el.href && (el.href.indexOf('pro.html') !== -1 || (el.href.indexOf('xtensions.pro') !== -1 && el.href.indexOf('pay') !== -1))) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
          el = el.parentElement;
        }
      } catch (err) {}
    }, true);
  }
})();
