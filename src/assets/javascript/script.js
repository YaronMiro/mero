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
 * Init the Animsition page load effect (http://git.blivesta.com/animsition/).
 *
 */
function pageLoadAnimateEffect() {
}


$(document).ready(function() {
  pageLoadAnimateEffect();
  inScrollAnimateEffect();
  testBrowser();
  toggleNavigationDisplay();
  initFloatLabel('floatl__js');
});
