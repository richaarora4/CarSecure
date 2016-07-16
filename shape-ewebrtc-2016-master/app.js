/**
 *---------------------------------------------------------
 * app.js
 *---------------------------------------------------------
 * Sample Express App to illustrate what a Developer needs
 * to do on the server-side.
 *
 * Server set-up is needed to facilitate HTML5/JS Web Apps
 * invoking AT&T APIs.
 *
 * This app also serves at HTTPS Web Server and hosts the
 * HTML5/JS/CSS3 for the sample web app demonstrating 
 * 'Account Id' feature of 'Enhanced WebRTC API' from
 * AT&T Developer Program (https://developer.att.com)
 *
 * Similar server-side examples are available for Java, PHP, 
 * Ruby. To know more, check out:
 *	https://github.com/attdevsupport/WebRTC-SampleApp
 *
 *----------------
 * Pre-requisites:
 *----------------
 * Before starting work on this sample, you previously:
 *
 * a) Created an app on AT&T Developer Portal with:
 *	WEBRTC scope ('Account ID' feature)
 *
 * b) Have the App Key, App Secret, eWebRTC Domain available
 * to configure here
 *
 *---------------------------------------------------------
 * This Sample server set-up shows the code needed to set 
 * up 2 routes by default.
 *---------------------------------------------------------
 *
 * 1. GET /config
 * Used by Web App client to retrieve configuration
 * from this server
 *
 * This configuration has info on important URLs
 * (Endpoint URLs to create to Access Token etc.)
 *
 * 2. POST /tokens
 * Used by Web App client JavaScript code to create 
 * Access Token 
 *
 * NOTE: If you want to set up custom routes, you can do it
 * by passing options to app.use('router', ...) method. For
 * more info, refere to documentation of att-dhs NPM module
 * at https://npmjs.org/att-dhs
 *---------------------------------------------------------
 * @author AT&T Developer Program, DRT/LTA
 *---------------------------------------------------------
 */

// ---------------------------------------------
// SECTION: Boiler-plate Express App 'require's
// ---------------------------------------------

var express = require('express');
var	fs = require('fs');
var	https = require('https');
var	favicon = require('static-favicon');
var	bodyParser = require('body-parser');

//--------------------------------------------------------
// SECTION: Configure Developer App credentials from AT&T
// Developer Portal.
//
// App Key, App Secret etc. are needed to use AT&T APIs.
//--------------------------------------------------------

var adhs_config = {};

// -- DEVELOPER TODO --
//
// Update the following 3 lines with your own 
// App Key, App Secret and eWebRTC Domain values
//
// If you are using out-of-the-box configuration,
// you don't have to write any other code to run
// run this node express app.
//

// Required for any AT&T API
//
adhs_config.app_key = 'pxtfhgm46yzmvj5updpoppqs33s5ovfm';
adhs_config.app_secret = 'e24cubo2spwam4qq7wrb0meeao9b8dc3';

// Required for AT&T eWebRTC API
//
adhs_config.ewebrtc_domain = 'attwebrtc.com';

// NO need to change anything below unless you are 
// moving your app to production. If so, use 'prod'
// in place of 'sandbox'. Sandbox key/secret cannot be
// used for Production. Check developer.att.com
// for more info on Production usage.
//

adhs_config.api_env = 'sandbox';

// Checking to see if you really did configure :) 
// your app key, app secret etc.
//
if( '<your_app_key>' === adhs_config.app_key ||
	 	'<your_app_secret>' === adhs_config.app_secret || 
		'<your_ewebrtc_domain>' === adhs_config.ewebrtc_domain 
		) { 
	console.error('Did you forget configuring app_key, app_secret, ewebrtc_domain?');
	console.error('Exiting...');
	process.exit(1);
}

console.info('-----------------------------------------------------------');
console.info('...Attempting to use configuration...');
console.info('-----------------------------------------------------------');
console.info('       App Key: ', adhs_config.app_key);
console.info('    App Secret: ', adhs_config.app_secret);
console.info('eWebRTC Domain: ', adhs_config.ewebrtc_domain);
console.info('-----------------------------------------------------------');

//--------------------------------------------------------
// SECTION: Initialize HTTPS Server configuration.
// We will use these variables towards the end of this
// file, when we start the HTTPS server.
//--------------------------------------------------------
// Just to quick start our sample, we have a self-generated
// SSL certificate and private key.
//
// WARNING:
// NEVER use self-generated SSL stuff anywhere else. If you 
// do have your own SSL private key and certificate, try
// using those.
//
// NOTE:
// When you visit web page served by this Node App in Chrome,
// it will show you a warning about this certificate. Accept
// the warning to see the actual web page.
//

var privateKey = fs.readFileSync('sample.key', 'utf8');
var certificate = fs.readFileSync('sample.cert', 'utf8');

var host = '127.0.0.1'; // Suggested for quick test on your local machine.
var port = 9001; // Arbitrary. choose any valid port you like

// Add your host, port configuration to the
// configuration object: adhs_config
//

adhs_config.host = host;
adhs_config.port = port;

// ---------------------------------------------
// BEGIN: Boiler-plate Express app set-up
// ---------------------------------------------
//


var app = express();

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/public'));



// ---------------------------------------------
// BEGIN: CUSTOM CODE for WebRTC functionality
//
// Following 3 lines set up default att-dhs routes
// in the express app.
// ---------------------------------------------

var adhs = require('att-dhs'); // Note the hyphen in require
adhs.configure(adhs_config);
adhs.use('router', {server: app}); // 2nd arg will change to {app: app} in next release

// Additional configuration options are available
// but not used in this app.
//

// If this option is not specified, logs will go 
// to console by default. If you want to use your own
// custom logger object, it should provide special 
// log methods as documented at https://npmjs.org/att-dhs
//
//
// adhs.use('logger', {logger: yourCustomLoggerObject});

// ---------------------------------------------
// BEGIN: Boiler-plate Express app route set-up
// ---------------------------------------------
//
// catch 404 and forward to error handler
//



app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// DEV error handler
// No stacktraces shown to end user.
//
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// PROD error handler
// No stacktraces shown to end user.
//
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});



// ---------------------------------------------
// BEGIN: Start HTTPS server ONLY
// ---------------------------------------------
// HTTPS is REQUIRED for WebRTC.
//
var server = https.createServer({ key: privateKey, cert: certificate }, app );
server.listen( port, host, function() {

	console.log('HTTPS server listening on host: ', server.address().address, ' at port ' , server.address().port);
	
	// NOTE 1:
	// Use the following option if you also have Android or
	// iOS clients in addition to Web App clients
	//
	// NOTE 2:
	// Not fully tested yet.
	// 
	// adhs.use('websocket.eventchannel', {server: server});
});

//-----------------------------------------------------------
// END: app.js
//-----------------------------------------------------------

