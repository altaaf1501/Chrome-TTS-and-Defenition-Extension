let color = '#3aa757';


/**
* Check if runtime.onInsatalled is called
*/
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});



/**
* Check if command is called
*/
chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
      case 'tts_Function':
          ttsFunc();
          break;
      case 'definition_Check':
          defFunc();
          break;
      default:
          console.log(`Command ${command} not found`);
  }
});



/**
* tts Function Code
*/
function ttsFunc() {
   const query = { active: true, currentWindow: true };
   chrome.tabs.query(query, (tabs) => {
       chrome.tabs.create({ url: tabs[0].url, active: false });
   });
  console.log("Running TTS Function.");
}



/**
* word definition Function Code
*/
function defFunc() {
   const query = { active: true, currentWindow: true };
   chrome.tabs.query(query, (tabs) => {
       chrome.tabs.create({ url: tabs[0].url, active: false });
   });
  console.log("Running Definition Function.");
}