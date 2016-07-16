/**
 * accid-check-browser.js
 *
 * Check if supported browser and enable UI elements if so
 *
 * This one should be the first to be included in <script>
 * tag
 *
 * @author RS, ATT CP&TS, DRT LTA/SDK
 */


/**
 * Utility methods to show status
 *
 */
function info(msg) {
  spnStatus.textContent = msg;
  spnStatus.className = 'info';
}

function error(msg) {
  spnStatus.textContent = msg;
  spnStatus.className = 'error';
}

/**
 * Check if Browser is supported after page loading
 * is finished
 *
 */
window.onload = function() {

  if ('Supported' === ATT.browser.hasWebRTC()) {

    info('Browser support for Enhanced WebRTC detected.');

    initDhsConfig();
   

  } else {

 
    error('Browser support for Enhanced WebRTC NOT detected. Please use supporting browser like ');

    var a = document.createElement('a');
    a.href = 'https://www.google.com/chrome';
    a.innerHTML = 'Chrome on Mac, Windows or Android Devices.';

    spnStatus.appendChild(a);

  }
};