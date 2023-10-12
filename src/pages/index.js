import ThemeSwitcher from "../components/ThemeSwitcher";

import Swiper from "swiper";
import { Pagination, EffectCreative } from "swiper/modules";

Swiper.use([Pagination, EffectCreative]);
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import { scrollTrigger } from "../components/ScrollTrigger";
import "./index.scss";
import { videoTrigger } from "../components/VideoTrigger";

/** Слайдер примеров */
// Счетчик слайдов
const currentSlide = document.querySelector(".slider__current-slide");
const totalSlides = document.querySelector(".slider__total-slides");
const slides = document.querySelectorAll(".slider__slide");
const slideCount = slides.length;
totalSlides.textContent = "0" + slideCount.toString();
currentSlide.textContent = "01";

const checkDirection = function () {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  if (mediaQuery.matches) {
    swiper.changeDirection("horizontal", true);
    swiper.creativeEffect = {
      prev: {
        translate: [0, 0, 0],
      },
      next: {
        translate: [0, 0, 0],
      },
    };
  } else {
    swiper.changeDirection("vertical", true);
    swiper.effect = "creative";
    swiper.creativeEffect = {
      prev: {
        translate: [-200, -490, 350],
      },
      next: {
        translate: [200, "180%", 0],
      },
    };
  }
  swiper.update();
};

const swiper = new Swiper(".slider", {
  slideClass: "slider__slide",
  wrapperClass: "slider__wrapper",
  direction: "horizontal",
  spaceBetween: 40,
  // loop: true,
  // allowTouchMove: true,
  grabCursor: true,
  slidesPerView: 1,
  modules: Pagination,
  pagination: {
    el: ".slider__pagination",
    clickable: true,
    bulletClass: "slider__pagination-bullet",
    bulletActiveClass: "slider__pagination-bullet_active",
    verticalClass: "slider__pagination_vertical",
    horizontalClass: "slider__pagination_horizontal",
  },
  breakpoints: {
    786: {
      direction: "vertical",
    },
  },
  on: {
    resize: checkDirection,
    slideChange: () => {
      if (swiper.realIndex < 10) {
        currentSlide.textContent = `0${swiper.realIndex + 1}`;
      }
    },
    // reachEnd: () => {
    //   console.log("last");
    // },
  },
});

/**  Анимация иконок ботов  */
const bots = document.querySelectorAll(".bots__bot");
bots.forEach((bot, index) => {
  bot.addEventListener("mouseenter", () => handleFocus(event));
  bot.addEventListener("mouseleave", () => handleFocus(event));
});

function handleFocus(event) {
  bots.forEach((bot) => {
    if (event.target === bot) return;
    bot.classList.toggle("blurred");
  });
}

/**  Тригер анимации  */
//  Анимация SVG
scrollTrigger(".currency__item");

// Анимация видео
scrollTrigger(".features__video", {
  cb: function (el) {
    el.play();
  },
});

// Воспроизведение по клику
const videos = document.querySelectorAll(".features__video");
videos.forEach((video) => {
  video.addEventListener("click", () => {
    video.play();
  });
});

/** Переключатель темы  */
// На всех кнопках
const buttons = document.querySelectorAll(".button");
const theme = new ThemeSwitcher();
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    theme.toggleTheme();
  });
});
