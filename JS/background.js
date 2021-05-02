/**
* Check if command is called
*/
chrome.commands.onCommand.addListener(function(command) {
  switch (command) {
      case 'tts_Function':
          ttsFunc(text);
          break;
      case 'definition_Check':
          defFunc();
          break;
      case 'synonym_Check':
          synFunc();
          break;
      default:
          console.log(`Command ${command} not found`);
  }
});



/**
* tts Function Code
*/
function ttsFunc(text, callback) {

  //  chrome.tts.speak(text);

  //  var speakListener = function(utterance, options, sendTtsEvent) {
  //    sendTtsEvent({type: 'start', charIndex: 0})
  
  //    sendTtsEvent({type: 'end', charIndex: text.length})
  //  };
  
  //  const stopListener = () => {
  //   // (stop all speech)
  //  };
  
  //  chrome.ttsEngine.onSpeak.addListener(speakListener);
  //  chrome.ttsEngine.onStop.addListener(stopListener);

}



/**
* word definition Function Code
*/
function defFunc() {
  
  console.log("Running Dictionary Function.");
  
  const selectedWord = text;

  fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${selectedWord}?key=87df3d18-6eb6-43d0-a9b0-0215a6894e19`)
  .then(response => response.json())
  .then(defInfo => {
    const dil = defInfo.length;
    let sdl = [];
    for (var i = 0; i < dil; i++) {
      sdl.push(defInfo[i].shortdef.length);
    }
  
    var j, k;
    
    console.log(`Definition of ${selectedWord}:`)

    for (j = 0; j < dil; j++) {

      if (defInfo[j].shortdef.length <= 0) {
        break;
      }

      console.log("     Definition #" + (j+1) + " ("+ defInfo[j].fl + ") :");
      
      for (k = 0; k < sdl[j]; k++) {
        console.log("          " + (k+1) + ": " + defInfo[j].shortdef[k]);
      }

    } 

  })
  .catch(error => console.error('Valid Word Not Highlighted.')); 

}



/**
* word definition Function Code
*/
function synFunc() {
  
  console.log("Running Thesaurus Function.");
  
  const selectedWord = text;

  fetch(`https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${selectedWord}?key=252e4239-5b8b-4050-98c6-8e69d790d5d7`)
  .then(response => response.json())
  .then(defInfo => {

    const dil = defInfo.length;

    for (var i = 0; i < dil; i++) {

      let synl = defInfo[i].meta.syns.length;
      let antl = defInfo[i].meta.ants.length;
      let rell = defInfo[i].def[0].sseq[0][0][1].rel_list.length;

      //Count
      console.log("Type " + i + ":");


      //Synonyms
      if (synl >= 1) {  
        console.log(`     Synonyms of ${selectedWord}` + ` (` + defInfo[i].fl + `):`);
        let synjl = [];

        for (var z = 0; z < synl; z++) {
          synjl.push(defInfo[i].meta.syns[z].length);
        }

        let count = 1;

        for (var j = 0; j < synl; j++) {
          for (var x = 0; x < synjl[j]; x++) {
            console.log("          " + (count) + ". " + defInfo[i].meta.syns[j][x]);
            count = count + 1;
          }
        }
      } 
      else if (synl <= 0) {
        console.log(`     There are no synonyms for ${selectedWord}.`)
      }

      //Antonyms
      if (antl >= 1) {  
        console.log(`     Antonyms of ${selectedWord}` + ` (` + defInfo[i].fl + `):`);
        let antjl = [];

        for (var z = 0; z < antl; z++) {
          antjl.push(defInfo[i].meta.ants[z].length);
        }

        let count = 1;

        for (var j = 0; j < antl; j++) {
          for (var x = 0; x < antjl[j]; x++) {
            console.log("          " + (count) + ". " + defInfo[i].meta.ants[j][x]);
            count = count + 1;
          }
        }

      } 
      else if (antl <= 0) {
        console.log(`     There are no antonyms for ${selectedWord}.`)
      }

      //Related Words
      let rel2l = [];

      if (rell >= 1) {
        
        console.log(`     Related words of ${selectedWord}` + ` (` + defInfo[i].fl + `):`)

        let count = 1;

        for (var j = 0; j < rell; j++) {
          rel2l.push(defInfo[i].def[0].sseq[0][0][1].rel_list[j].length);
          for (var k = 0; k < rel2l[j]; k++) {
            console.log("          " + (count) + ": " + defInfo[i].def[0].sseq[0][0][1].rel_list[j][k].wd);
            count = count + 1;
          }
        }
      }
      else if (rell <= 0) {
        console.log(`     There are no related words of ${selectedWord}.`)
      }
    }

  })
  .catch(error => console.error('Word not found.')); 

}



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("Event recieved in background");
    text = request.txt;
    sendResponse({success: true});
  }
)