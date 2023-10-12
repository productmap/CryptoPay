export default class ThemeSwitcher {
  constructor(selector) {
    this._init();
  }

  _setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
  }

  _init() {
    if (localStorage.getItem("theme") === "dark") {
      this._setTheme("dark");
    } else {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this._setTheme("dark");
      } else {
        this._setTheme("light");
      }
    }
  }

  toggleTheme() {
    if (localStorage.getItem("theme") === "dark") {
      this._setTheme("light");
    } else {
      this._setTheme("dark");
    }
  }
}
