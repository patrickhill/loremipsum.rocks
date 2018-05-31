// -----------------------------------------------------------------------------
// copy & paste
// -----------------------------------------------------------------------------

// structure for copy and paste:
// wrapper element with .copy-to-clipboard class
// 1 child element, usually a button, responsible for activating copy and paste with .clipboard-init class
// 1 child element with the content to be copied with class .clipboard-content
var alertEl = document.getElementById('alert-copied');

var codeCopy = document.querySelectorAll('.copy-to-clipboard'), i;
for (i = 0; i < codeCopy.length; ++i) {
  var copyInit = codeCopy[i].querySelector(".clipboard-init");
  copyInit.addEventListener('click', function(){
    var copyContent = this.parentNode.querySelector(".clipboard-content");
    copyToClipboardCode(copyContent); 
  }, true); 
}

function triggerAnimation(el, animation) {
  el.classList.remove(animation);
  
  // -> triggering reflow /* The actual magic */
  // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
  // Oops! This won't work in strict mode. Thanks Felis Phasma!
  // element.offsetWidth = element.offsetWidth;
  // Do this instead:
  void el.offsetWidth;
  
  // -> and re-adding the class
  el.classList.add(animation);
}

function copyToClipboardCode(copyContent) {
  // sometime the ranges don't get cleared properly
  // so we make sure they are clear before making a new one
  window.getSelection().removeAllRanges();  

  var range = document.createRange();  
  range.selectNode(copyContent);  
  window.getSelection().addRange(range);  

  try {  
    // Now that we've selected the anchor text, execute the copy command  
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy text command was ' + msg);  
    if (successful) {
      triggerAnimation(alertEl,"go");
    }
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  
}
