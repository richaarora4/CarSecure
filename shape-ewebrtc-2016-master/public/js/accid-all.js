/**
 * accid-all.js
 *
 * Contains all functionality in one js. Not being used
 * in the HTML. If you want, you can replace the 4 script
 * tags with 1 script tag and this file
 *
 * @author RS, ATT CP&TS, DRT LTA/SDK
 */


/**
 * Check if Browser is supported after page loading
 * is finished
 *
 */

window.onload = function() {

  if( 'Supported' === ATT.browser.hasWebRTC() ) {

    info('Browser support for Enhanced WebRTC detected.');

    btnLogin.hidden = false;

    initDhsConfig();

  } else {

		btnLogin.hidden = true;

    error('Browser support for Enhanced WebRTC NOT detected. Please use supporting browser like ');

    var a = document.createElement('a');
    a.href = 'https://www.google.com/chrome';
    a.innerHTML = 'Chrome on Mac, Windows or Android Devices.';

    spnStatus.appendChild( a );

  }
};

function info(msg) {
	spnStatus.textContent = msg;
	spnStatus.className = 'info';
}

function error(msg) {
	spnStatus.textContent = msg;
	spnStatus.className = 'error';
}

// Global variables
//
var dhs_url = window.location.origin + '/config';

var phone = ATT.rtc.Phone.getPhone();

var ewebrtc_domain, app_tokens_url;		


/**
 * Get the Account Id domain
 *
 */

function initDhsConfig() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', dhs_url );

	xhr.onreadystatechange = function() {

		if(xhr.readyState === 4 && xhr.status === 200) {

			var dhs_config = JSON.parse(xhr.responseText);

			// Get the domain
			//
			ewebrtc_domain = dhs_config.ewebrtc_domain;
			app_tokens_url = dhs_config.app_tokens_url;
			spnAIdDomain.textContent = ewebrtc_domain;

			info('Obtained Account Id Domain.');

		} else {

			error('Unable to obtain Account Id Domain. Response: ' + xhr.responseText);
		}

	};

	xhr.send();
}


/**
 * Create access token for the User's
 * Account Id, associate it and login
 * the Phone
 */

btnLogin.onclick = function() {

  var account_id = 'hassan';

  if( account_id && account_id.length !== 0 ) {

    createAccessToken(account_id);

  } else {

    error('Account Id cannot be empty. Enter an alphanumeric string');

  }

};

/**
 * Create Access Token
 *
 */

function createAccessToken(account_id) {

  // Create AccessToken
  //
  var xhr = new XMLHttpRequest();

  xhr.open('POST', app_tokens_url );
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {

			var response_json = JSON.parse(xhr.responseText);
			var access_token= response_json.access_token;

			info('Access Token obtained. Setting up Phone... ');
			setupPhone(account_id, access_token);

		} else {

			error('Error obtaining Access Token. Please check your server.');

    }
  };

  info('Requesting Access Token...');
  xhr.send(JSON.stringify({app_scope: 'ACCOUNT_ID'}));

}

/**
 * Set up Phone
 *
 */

function setupPhone(account_id, access_token) {

  phone.associateAccessToken({
    userId: account_id,
    token: access_token,
    success: loginPhone,
    error: fnErr
  });

  /**
   * Define Inner Functions
   * needed for associateAccessToken
   *
   */

  function loginPhone() {
    phone.login({token: access_token});
  }

}

phone.on('error', fnErr);

/**
 * Error function simply updates the status
 *
 */
function fnErr(event) {

  var sdkMsg = 'Message: ' + event.ErrorMessage;
  var apiMsg = event.APIError ? (' API Error: ' + event.APIError ) : '';

  var msg = sdkMsg + apiMsg;
  error(msg);
}

phone.on('gateway:unreachable', fnGateWayUnreachable);

/**
 * Gateway Unreachable indicates temporary problem
 * with API Platform.
 *
 */
function fnGateWayUnreachable(event) {
  var msg = 'Temporary problem with API Platform. ' +
    'Please check back later. If this persists, ' +
    'contact Platform Administrator';

  error(msg);
}

phone.on('session:ready', fnSessionReady);

function fnSessionReady(event) {

	info('Login success. Phone is Ready.');

	// Toggle Login, Logout buttons
	//
	btnLogin.hidden = true;
	btnLogout.hidden = false;

	// Show Phone's controls
	//
	btnCall.hidden = false;
	btnHangup.hidden = false;
}

/**
 * When Logout button is clicked, or user moves
 * away from the page, perform steps needed to
 * hangup phone and clean up Sessions etc.
 *
 */

window.onbeforeunload = btnLogout.onclick = function() {

  info('Logging out Phone...');

	// attempt logout
	//
  phone.logout();

};

phone.on('session:disconnected', fnSessionDisconnected);

function fnSessionDisconnected() {
	// Update status
	//
	info('Logged out. Login with Account Id.');

	// Toggle Login, Logout buttons
	//
	btnLogin.hidden = false;
	btnLogout.hidden = true;

	// Hide Phone's controls
	//
	btnCall.hidden = true;
	btnHangup.hidden = true;
	btnAnswer.hidden = true;
}

btnCall.onclick = function() {

	info('Calling...');

	// Dial the number or account id
	//
	phone.dial({
		destination: phone.cleanPhoneNumber(gj),
		mediaType: 'video',
		localMedia: vidLocal,
		remoteMedia: vidRemote
	});
};

phone.on('call:connected', onCallConnected);

function onCallConnected(event) {

	info('Call connected.');

	// Show Phone's control buttons
	//
	btnHold.hidden = false;
	btnResume.hidden = false;

	btnMute.hidden = false;
	btnUnmute.hidden = false;
	
	// Hide only answer button
	//
	btnAnswer.hidden = true;

}

phone.on('call:disconnected', onCallDisconnected);

btnHangup.onclick = function() {

	info('Disconnecting...');
	
	// Hang up
	//
	phone.hangup();
};

function onCallDisconnected(event) {

	info('Call disconnected.');

	// Hide Phone's control buttons
	//
	btnHold.hidden = true;
	btnResume.hidden = true;

	btnMute.hidden = true;
	btnUnmute.hidden = true;

}

/**
 * Hold, Resume actions and callbacks
 *
 */
btnHold.onclick = function() {
	phone.hold();
};
    
btnResume.onclick = function() {
	phone.resume();
};

phone.on('call:held', fnHeld);
phone.on('call:resumed', fnResumed);

function fnHeld () {
	info('Call is on hold.');
}        

function fnResumed () {
	info('Call is resumed.');
} 

/**
 * Mute, Unmute actions and callbacks
 *
 */
btnMute.onclick = function() {
   phone.mute();
};
    
btnUnmute.onclick = function() {
   phone.unmute();
};

phone.on('call:muted', fnMuted);
phone.on('call:unmuted', fnUnmuted);

function fnMuted () {
	info('Call is muted.');
}        

function fnUnmuted () {
	info('Call is unmuted.');
}

/**
 * Event fires if there is an incoming call
 *
 */
phone.on('call:incoming', onIncomingCall);

function onIncomingCall(event) {

	info('Incoming call from: ' + event.from);

	// Show Phone's answer button
	//
	btnAnswer.hidden = false;
}

/**
 * Answer action
 * 
 */
btnAnswer.onclick = function() {

	info('Answering...');
	
	// Answer the call
	//
	phone.answer({
		mediaType: 'video',
		localMedia: vidLocal,
		remoteMedia: vidRemote
	});
};

