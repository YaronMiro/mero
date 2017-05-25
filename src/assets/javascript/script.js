function testBrowser() {

  function isIE11() {
    return !(window.ActiveXObject) && "ActiveXObject" in window;
  }

  function isFirefox() {
    return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  }

  function isIE10() {
    return (/*@cc_on !@*/false && (
    document.documentMode === 10)
    );
  }

  if (isIE10()) {
    document.documentElement.className += " ie10";
  }

  if (isIE11()) {
    document.documentElement.className += " ie11";
  }

  if (isFirefox()) {
    document.documentElement.className += " firefox";
  }
}

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
 * Init the mobile navigation menu button.
 *
 */
function toggleNavigationDisplay() {
  $('.main__header__menu__button').click(function() {
    $('#main-header-nav-container').toggleClass('open__mobile__navigation');
  });
}


/**
 * Init the Scroll Animsition effect (https://github.com/michalsnik/aos).
 *
 */
function inScrollAnimateEffect() {
  AOS.init();
}

/**
 * Init the Animsition page load effect.
 *
 */
function pageLoadAnimateEffect() {
}

/**
 * Init the  SVG Animsitions effect.
 *
 */
function svgLoadAnimateEffect() {
  new Vivus('svg-logo', {duration: 300}, function(){});
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


$(document).ready(function() {
  pageLoadAnimateEffect();
  svgLoadAnimateEffect();
  inScrollAnimateEffect();
  testBrowser();
  toggleNavigationDisplay();
  initFloatLabel('floatl__js');
});
