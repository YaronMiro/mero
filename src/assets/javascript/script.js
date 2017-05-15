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
  $(".animsition").animsition({
    inClass: 'zoom-in-sm',
    outClass: 'zoom-out-sm',
    inDuration: 1000,
    outDuration: 850,
    linkElement: '.animsition-link',
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // '<img src="/images/mero-logo.svg"/>'
    timeout: false,
    timeoutCountdown: 5000,
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


$(document).ready(function() {
  pageLoadAnimateEffect();
  inScrollAnimateEffect();
  testBrowser();
  toggleNavigationDisplay();
  initFloatLabel('floatl__js');
});
