  // TODO set theme mode

  export function setDarkMode() {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
  }

  export function setLightMode() {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
  }

  export function toggleTheme(e) {
    console.log(e.target);
    if (e.target.checked) {
      setDarkMode();
    } else {
      setLightMode();
    }
  }