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
 * Init the float label JS code (https://github.com/richardvenneman/floatl).
 *
 */
function toggleNavigationDisplay() {
  $('#toggle-navigation-display').click(function(){
    $(this).toggleClass('nav__button__icon--hide');
    $('#main__header').find('.navigation').toggleClass('navigation--overlay');
  });
}

$(document).ready(function() {
  testBrowser();
  toggleNavigationDisplay();
  initFloatLabel('floatl__js');
});
