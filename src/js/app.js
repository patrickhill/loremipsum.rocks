// -----------------------------------------------------------------------------
// copy & paste
// -----------------------------------------------------------------------------

// structure for copy and paste:
// wrapper element with .copy-to-clipboard class
// 1 child element, usually a button, responsible for activating copy and paste with .clipboard-init class
// 1 child element with the content to be copied with class .clipboard-content

var codeCopy = document.querySelectorAll('.copy-to-clipboard'), i;
for (i = 0; i < codeCopy.length; ++i) {
  var copyInit = codeCopy[i].querySelector(".clipboard-init");
  copyInit.addEventListener('click', function(){
    var copyContent = this.parentNode.querySelector(".clipboard-content");
    copyToClipboardCode(copyContent); 
  }, true); 
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
  } catch(err) {  
    console.log('Oops, unable to copy');  
  }  

  // Remove the selections - NOTE: Should use
  // removeRange(range) when it is supported  
  window.getSelection().removeAllRanges();  
}
