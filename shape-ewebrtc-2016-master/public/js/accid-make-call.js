/**
 * accid-make-call.js
 *
 * Click and Event Handlers for making a call
 *
 * This one should be included in <script> tag
 * after accid-setup-phone.js
 *
 * @author RS, ATT CP&TS, DRT LTA/SDK
 */

var initiateCall = function() {
  var callee;

  info('Calling...');

  callee = getCalleeId();

  // Dial the number or account id
  //
  phone.dial({
    destination: phone.cleanPhoneNumber(callee),
    mediaType: 'video',
    localMedia: vidLocal,
    remoteMedia: vidRemote
  });
};





