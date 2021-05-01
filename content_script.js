console.log("Script loaded.");

document.addEventListener("mouseup", select);

function select(event){
    const txt = window.getSelection().toString();
    console.log(txt)
}
