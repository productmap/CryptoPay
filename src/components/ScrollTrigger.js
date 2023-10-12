export function scrollTrigger(selector, options = {}) {
  const els = document.querySelectorAll(selector);
  els.forEach((el) => {
    addObserver(el, options);
  });
}

function addObserver(el, options) {
  if (!("IntersectionObserver" in window)) {
    if (options.cb) {
      options.cb(el);
    } else {
      el.classList.add("active");
    }
    return;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (options.cb) {
          options.cb(el);
        } else {
          entry.target.classList.add("active");
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(el);
}