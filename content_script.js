console.log("Script loaded.");


document.addEventListener("mouseup", select);

function select(event){
    const txt = window.getSelection().toString();
    console.log(txt)  
    chrome.runtime.sendMessage({txt}, function(response) {
        console.log(response);
    })

    if (txt === null) {
        return null;
    }
    return txt;

}


