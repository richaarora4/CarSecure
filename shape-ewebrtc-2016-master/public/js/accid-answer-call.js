/**
 * accid-answer-call.js
 *
 * Click and Event Handlers for answering a call
 *
 * This one should be included in <script> tag
 * after accid-make-call.js
 *
 * @author RS, ATT CP&TS, DRT LTA/SDK
 */

/**
 * Event fires if there is an incoming call
 *
 */
phone.on('call:incoming', onIncomingCall);

function onIncomingCall(event) {

	  info('Answering...');

	  // Answer the call
	  //
	  phone.answer({
	    mediaType: 'video',
	    localMedia: vidLocal,
	    remoteMedia: vidRemote
	  });
}

/**
 * Answer action
 * 
 */
/*btnAnswer.onclick = function() {

  info('Answering...');

  // Answer the call
  //
  phone.answer({
    mediaType: 'video',
    localMedia: vidLocal,
    remoteMedia: vidRemote
  });
};*/