/**
 * accid-all.js
 *
 * Contains utility methods to evaluate,
 * search, and manipulate strings
 *
 * @author RS, ATT CP&TS, DRT LTA/SDK
 */

/**
 * Check a string if it is an
 * alphanumeric with first letter caps
 */

function isAlphanumericWithFirstAlphabet(text) {
  var regexp = /^[a-zA-Z][a-zA-Z0-9.,$;]+$/;

  if (text.search(regexp) > -1) {
    return true;
  }

  return false;
}

/**
 * Reads the correct value of
 * callee and appends domain for
 * alphanumeric user ids
 *
 * @returns {String}
 */

function getCalleeId() {
  var callee  = 'gj' + '@' + 'attwebrtc.com';

  

  return callee;

}