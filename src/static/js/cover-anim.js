var $       = require('jquery'),
    Swiper  = require('swiper');

module.exports = {

  init : function() {

    $('.cover-shape, .triangle-mod').mouseover( function() {
     $(this).toggleClass('hidden');
    });
    $('.cover-shape, .triangle-mod').click( function() {
      $(this).toggleClass('hidden');
    });
    console.log('cover anim');

    var mySwiper = new Swiper('.swiper-container', {
        speed: 500,
        slidesPerView: 2,
        centeredSlides: true,
        loop: true,
        keyboardControl: true,
        onSlideChangeStart : function() {
          $('.swiper-container').css({
            'background-color': $('.swiper-slide-active').data("color")
          });
        },
        onInit : function () {
          $('body').addClass('js-topper-is-active');
        }
    });
  }

};
