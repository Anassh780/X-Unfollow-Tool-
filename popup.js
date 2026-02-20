document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('options-btn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      if (chrome.runtime && chrome.runtime.openOptionsPage) chrome.runtime.openOptionsPage();
    });
  }
});
