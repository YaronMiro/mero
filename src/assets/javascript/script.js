/**
 * Init the float label JS code (https://github.com/richardvenneman/floatl).
 *
 */
function initFloatLabel(className) {
  var fields = $('.' + className);
  $.each(fields, function(index, value) {
    new Floatl(value);
  });
}


/**
 * Init the Animsition page load effect.
 *
 */
function pageLoadAnimateEffect() {
  $(".animsition").animsition({
    inClass: 'zoom-in-sm',
    outClass: 'zoom-out-sm',
    inDuration: 500,
    outDuration: 500,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: true,
    timeoutCountdown: 250, // default was 5000
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay : false,
    overlayClass : 'animsition-overlay-slide',
    overlayParentElement : 'body',
    transition: function(url){ window.location.href = url; }
  });
}

/**
 * Menu push & slide.
 *
 */
function toggleNavigation() {
  $('#menu-button').click(function(){
    $('#menu-icon').toggleClass('open');
    $('#menu-narrow').toggleClass('menu__small__open');
    $('.container__main__content, #main__footer, .logo')
      .toggleClass('open__menu__hide__all');
  });
}


/**
 * Init the header scroll and fixed position (http://callmenick.com/post/animated-resizing-header-on-scroll).
 *
 */
function initScrollHeader(shrinkHeight) {
  var $window = $(window);
  var $document = $(document);
  var scrollClassName = 'after__scroll';
  $window.scroll(function(event){
    var distanceY = $window.pageYOffset || $document.scrollTop()
    // var $header = $('.main__header');
    var $header = $('.main__header__menu__button');
    if (distanceY > shrinkHeight) {
      $header.addClass(scrollClassName);
    }
    else if ($header.hasClass(scrollClassName)) {
      $header.removeClass(scrollClassName);
    }
  });
}

/** 
 * Adding the jquery cycle plug-in.
 * 
*/
function cycleSlideShow() {
  $('.slideshow').cycle(
    { fx: 'fade',
     speed: 1000,
     timeout: 7000
    } 
  );
};

$(document).ready(function() {
  pageLoadAnimateEffect();
  initFloatLabel('floatl__js');
  toggleNavigation();
  cycleSlideShow();
});
