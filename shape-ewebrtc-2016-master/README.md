# shape-ewebrtc

## How to send/receive calls in your Raspberry Pi 3 device using AT&T Enhanced WebRTC

One of the features the AT&T API Platform offers is the Enhanced WebRTC API. This API enables you to integrate real-time audio/video calling into your Web (HTML5/JavaScript) app. After you log in with your Account ID or Virtual Number, your app can send and receive calls to and from any US domestic telephone number, AT&T Virtual Number, or another AT&T Account ID.

This article describes the prerequisites and steps necessary to make this happen. For more information on the Enhanced WebRTC API, please refer to the AT&T API Platform section of the AT&T Developer portal.

To simplify your development, the following pre-built components are provided. These can be imported into your JavaScript app project.

## Prerequisite Activity
Before you can begin coding Enhanced WebRTC functionality, you must complete the following prerequisites:

Obtain App Key and App Secret - Consult an AT&T Support Person at WebRTC Table

Node Server - Configure and start your Node Server

#### Node Server
To configure and start a Node Server using the pre-built Server App, complete the following steps on the device that contains your development environment:

* NodeJS, NPM, Chromium browser, and enhanced-webrtc SDK are already downloaded and installed on the Raspberry Pi 3 SD cards provided by AT&T Support Personnel.
* A pre-built Node Server app with AT&T server-side libraries downloaded on the provided AT&T Raspbian OS Raspberry Pi 3 SD cards.
* Change directory to `/home/pi/shape-ewebrtc-2016`.
* Pull new changes by running `git pull` in the `shape-ewebrtc-2016` folder.
* Open 'app.js' file.
* Configure this instance with the App Key, App Secret and domain name you obtained from the AT&T Developer Portal in the previous step.
* Install the Node dependencies by running `npm install`.
* Start the Node Server `npm start`.
* The pre-built Server App exposes an HTTPS endpoint for Access Token generation, and a e911id generation.

__TIP__: By default, this Server App starts at https://127.0.0.1:9001. However, this address is inaccessible to a real device. To test with a real device, select a hostname or IP address that is accessible to your test device. For more information on configuring and starting the pre-built Server App, please refer to this documentation on GitHub.


##### Demo App:
----
1. Open Chrome browser. Go to the App's [Accound Id Demo page](https://127.0.0.1:9001) at https://127.0.0.1:9001

> Why is HTTPS needed?
> * Media capture in Browsers (getUserMedia API) requires the Web Page to come from secure HTTPS host


##### Chrome SSL Alert:
----
* This demo is set up with self-generated certificate. Chrome alerts the user to such situations.
* The first time you visit the demo page, Chrome alerts you with `Your connection is not private` message
  * Error: `NET::ERR_CERT_AUTHORITY_INVALID`

![alt text][cwsc-png]
[cwsc-png]: https://github.com/attdevsupport/shape-2016/raw/master/img/chrome-warning-self-cert.png "Chrome Warning for Self-generated Certificate"

* To ignore the warning and proceed to the demo page:
  * Click `Advanced` and then
  * Click `Proceed to 127.0.0.1 (unsafe)`

![alt text][cpsc-png]
[cpsc-png]: https://github.com/attdevsupport/shape-2016/raw/master/img/chrome-proceed-with-self-cert.png "Proceed to Web Page"

##### Important:
----
* sample.cert and sample.key are provided only for quick-start convenience.
* Use these only your local machine, and only for quick-start learning on your laptop/desktop.

> DON'T use the sample.cert, sample.key anywhere else. Replace with your own secure certificate and key. Consult your Web or Security Admin for more information.

__TIP__: In case the microphone didn't work, try to select it manually from the dropdown list in the browser, by clicking on the camera icon in the address bar. Select `USB Device, USB Audio-Default Audio Device`, restart the call.

##### Node/NPM Errors:
----
* If you see errors like `Error: Cannot find module 'express'`, npm install did not happen successfully.
  * Make sure `npm install` finished with out errors.
* Stick with `127.0.0.1`. Other names like local, localhost, my-machine-name etc. may not work.
* If npm is stuttering, make sure you are connected to open, proxy-less Internet

##### WebRTC App Media Issues:
----
* Make sure you are connected to Internet without VPN or other firewall restrictions.
* If you are still not hearing audio on your Raspberry Pi 3 device, try to change the audio output by following the instructions on [Raspberry Pi Audio Configuration page](https://www.raspberrypi.org/documentation/configuration/audio-config.md).

#### You can find more information at the resources listed below.
* [AT&T Developer Platform](https://developer.att.com/)
* [Enhanced WebRTC API](https://developer.att.com/enhanced-webrtc)
* [JavaScript SDK](https://developer.att.com/enhanced-webrtc/sdk)
* [Docs](http://developer.att.com/enhanced-webrtc/docs)
* [FAQs on Enhanced WebRTC](http://developer.att.com/enhanced-webrtc/support/faqs/enhanced-webrtc-api-faqs)
* [AT&T API FAQs](http://developer.att.com/enhanced-webrtc/support/faqs)
* [Support](http://developer.att.com/support)
* [Pricing](https://developer.att.com/pricing)
