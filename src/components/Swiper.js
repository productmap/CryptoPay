let isVertical = true,
  direction = 'vertical';
let swiper = initSwiper(direction);

function initSwiper(direction) {
  return new Swiper('.swiper-container', {
    spaceBetween: 50,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    direction: direction
  });

}

function changeDirection() {
  isVertical = !isVertical;
  direction = isVertical ? 'vertical' : 'horizontal';
  let slideIndex = swiper.activeIndex;
  swiper.destroy(true, true);
  swiper = initSwiper(direction);
  swiper.slideTo(slideIndex,0);
}

