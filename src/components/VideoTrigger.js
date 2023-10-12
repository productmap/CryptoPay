export function videoTrigger(selector, options = {}) {
  const els = document.querySelectorAll(selector);
  els.forEach((el) => {
    addVideoObserver(el, options);
  });
}

function addVideoObserver(el, options) {
  if (!("IntersectionObserver" in window)) {
    if (options.cb) {
      options.cb(el);
    } else {
      el.play();
    }
    return;
  }

  const videoObserver = new IntersectionObserver((entries, videoObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (options.cb) {
          options.cb(el);
        } else {
          entry.target.play();
        }
        videoObserver.unobserve(entry.target);
      }
    });
  }, options);
  videoObserver.observe(el);
}