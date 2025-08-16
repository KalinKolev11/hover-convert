let selection = null;
let match = null;//0 - full match, 1 - number, 2 - unit

document.addEventListener("mouseup", function(event) {
    selection = window.getSelection().toString();
    getMatches();
}, false);

function getMatches(){
    const regEx = "(?<!\\S)(-?\\d+(?:[.,]\\d+)?)(?:\\s*)([a-zA-Z]+)(?!\\S)";
    match = selection.match(regEx);
}
