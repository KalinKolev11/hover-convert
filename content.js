let selection = null;
let match = null;//0 - full match, 1 - number, 2 - unit

const conversions = {
    // Length units
    meters: {
        units: ["m", "m.", "meters", "meter", "metre", "metres"],
        convert: (input) => ({ value: +(input * 3.28084).toFixed(2) }),
        targetUnit: "ft"
    },
    kilometers: {
        units: ["km", "km.", "kilometers", "kilometer", "kilometre", "kilometres", "kms"],
        convert: (input) => ({ value: +(input * 0.621371).toFixed(2) }),
        targetUnit: "mi"
    },
    centimeters: {
        units: ["cm", "cm.", "centimeters", "centimeter", "centimetre", "centimetres", "cms"],
        convert: (input) => ({value: +(input / 2.54).toFixed(2) }),
        targetUnit: "in"
    },
    millimeters: {
        units: ["mm", "mm.", "millimeter", "millimeters", "millimetre", "millimetres"],
        convert: (input) => ({ value: +(input / 25.4).toFixed(2) }),
        targetUnit: "in"
    },
    miles: {
        units: ["mi", "mi.", "miles", "mile"],
        convert: (input) => ({ value: +(input * 1.60934).toFixed(2) }),
        targetUnit: "km"
    },
    yards: {
        units: ["yd", "yd.", "yard", "yards"],
        convert: (input) => ({value: +(input * 0.9144).toFixed(2) }),
        targetUnit: "m"
    },
    feet: {
        units: ["ft", "ft.", "foot", "feet", "'"],
        convert: (input) => ({value: +(input * 0.3048).toFixed(2) }),
        targetUnit: "m",
    },
    inches: {
        units: ["in", "in.", "inches", "inch", "\""],
        convert: (input) => ({ value: +(input * 2.54).toFixed(2) }),
        targetUnit: "cm"
    },

    // Temperature units
    celsius: {
        units: ["c", "c.", "celsius", "°c", "centigrade"],
        convert: (input) => ({  value: +((input * 9/5) + 32).toFixed(2) }),
        targetUnit: "°F"
    },
    kelvin: {
        units: ["k", "k.", "kelvin", "K"],
        convert: (input) => ({ value: +(input - 273.15).toFixed(2) }),
        targetUnit: "°C"
    },
    fahrenheit: {
        units: ["f", "f.", "fahrenheit", "°f"],
        convert: (input) => ({  value: +((input - 32) / 1.8).toFixed(2) }),
        targetUnit: "°C",
    },

    // Weight units
    kilograms: {
        units: ["kg", "kg.", "kilograms", "kilogram", "kgs", "kilogramme", "kilogrammes"],
        convert: (input) => ({ value: +(input * 2.20462).toFixed(2) }),
        targetUnit: "lb"
    },
    grams: {
        units: ["g", "g.", "grams", "gram", "gms"],
        convert: (input) => ({ value: +(input * 0.035274).toFixed(2) }),
        targetUnit: "oz"
    },
    pounds: {
        units: ["lb", "lb.", "lbs", "lbs.", "pounds", "pound"],
        convert: (input) => ({ value: +(input * 0.453592).toFixed(2) }),
        targetUnit: "kg"
    },
    ounces: {
        units: ["oz", "oz.", "ounce", "ounces", "ozs"],
        convert: (input) => ({value: +(input * 28.3495).toFixed(2) }),
        targetUnit: "g"
    },
    stone: {
        units: ["st", "stone", "stones"],
        convert: (input) => ({ value: +(input * 6.35029).toFixed(2) }),
        targetUnit: "kg"
    }
};

document.addEventListener("mouseup", function(event) {
    selection = window.getSelection().toString().trim().toLowerCase();
    if(selection.length ===0) return;
    getMatches();
}, false);

function getMatches(){
    const regEx = "(?<!\\S)(-?\\d+(?:[.,]\\d+)?)(?:\\s*)([a-zA-Z]+)(?!\\S)";
    match = selection.match(regEx);
    if(match===null)return;
    convertUnit();
}

function convertUnit(){
    for(let key in conversions){
        let unit = conversions[key];
        if(unit.units.includes(match[2])){
            let resultUnit = unit.convert(match[1]).value+" "+unit.targetUnit+".";
            showTooltip(resultUnit);
            break;
        }
    }
}

function showTooltip(text) {
    const oldTooltip = document.getElementById("hover-convert-tooltip");//TODO also remove on selectionchange
    if (oldTooltip) oldTooltip.remove();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const tooltip = document.createElement("div");
    tooltip.id = "hover-convert-tooltip";
    tooltip.textContent = text;
    tooltip.style.position = "absolute";
    tooltip.style.backgroundColor = "black";
    tooltip.style.color = "white";
    tooltip.style.padding = "4px 8px";
    tooltip.style.borderRadius = "4px";
    tooltip.style.fontSize = "15px";
    tooltip.style.zIndex = 9999;

    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY - 25}px`;

    document.body.appendChild(tooltip);

    setTimeout(() => tooltip.remove(), 3000);
}
