document.addEventListener("DOMContentLoaded", function() {
  const navToggles = document.querySelectorAll(".md-nav__toggle");

  navToggles.forEach(toggle => {
    const state = sessionStorage.getItem("nav-state-" + toggle.id);
    if (state === "open") {
      toggle.checked = true;
    } else if (state === "closed") {
      toggle.checked = false;
    }
  });

  navToggles.forEach(toggle => {
    toggle.addEventListener("change", function() {
      if (this.checked) {
        sessionStorage.setItem("nav-state-" + this.id, "open");
      } else {
        sessionStorage.setItem("nav-state-" + this.id, "closed");
      }
    });
  });
});