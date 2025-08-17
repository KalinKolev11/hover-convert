let selection = null;
let originalAmount = null;
let originalUnit = null

const conversions = {
    // Length units
    meters: {
        units: ["m", "m.", "meters", "meter", "metre", "metres", "метър", "метри"],
        convert: (input) => ({value: +(input * 3.28084).toFixed(2)}),
        targetUnit: "ft"
    },
    kilometers: {
        units: ["km", "km.", "kilometers", "kilometer", "kilometre", "kilometres", "kms", "километър", "километри"],
        convert: (input) => ({value: +(input * 0.621371).toFixed(2)}),
        targetUnit: "mi"
    },
    centimeters: {
        units: ["cm", "cm.", "centimeters", "centimeter", "centimetre", "centimetres", "cms", "сантиметър", "сантиметри"],
        convert: (input) => ({value: +(input / 2.54).toFixed(2)}),
        targetUnit: "in"
    },
    millimeters: {
        units: ["mm", "mm.", "millimeter", "millimeters", "millimetre", "millimetres", "милиметър", "милиметри"],
        convert: (input) => ({value: +(input / 25.4).toFixed(2)}),
        targetUnit: "in"
    },
    miles: {
        units: ["mi", "mi.", "miles", "mile", "мили"],
        convert: (input) => ({value: +(input * 1.60934).toFixed(2)}),
        targetUnit: "km"
    },
    yards: {
        units: ["yd", "yd.", "yard", "yards", "ярд", "ярда", "ярдове"],
        convert: (input) => ({value: +(input * 0.9144).toFixed(2)}),
        targetUnit: "m"
    },
    feet: {
        units: ["ft", "ft.", "foot", "feet", "'", "фут", "фута", "фута"],
        convert: (input) => ({value: +(input * 0.3048).toFixed(2)}),
        targetUnit: "m",
    },
    inches: {
        units: ["in", "in.", "inches", "inch", "\"", "инч", "инча", "инча"],
        convert: (input) => ({value: +(input * 2.54).toFixed(2)}),
        targetUnit: "cm"
    },

    // Temperature units
    celsius: {
        units: ["c", "c.", "celsius", "°c", "centigrade", "целзий", "градуса по Целзий"],
        convert: (input) => ({value: +((input * 9 / 5) + 32).toFixed(2)}),
        targetUnit: "°F"
    },
    kelvin: {
        units: ["k", "k.", "kelvin", "K", "келвин"],
        convert: (input) => ({value: +(input - 273.15).toFixed(2)}),
        targetUnit: "°C"
    },
    fahrenheit: {
        units: ["f", "f.", "fahrenheit", "°f", "фаренхайт", "градуса по Фаренхайт"],
        convert: (input) => ({value: +((input - 32) / 1.8).toFixed(2)}),
        targetUnit: "°C",
    },

    // Weight units
    kilograms: {
        units: ["kg", "kg.", "kilograms", "kilogram", "kgs", "kilogramme", "kilogrammes", "килограм", "килограма", "килограми"],
        convert: (input) => ({value: +(input * 2.20462).toFixed(2)}),
        targetUnit: "lb"
    },
    grams: {
        units: ["g", "g.", "grams", "gram", "gms", "грам", "грама", "грама"],
        convert: (input) => ({value: +(input * 0.035274).toFixed(2)}),
        targetUnit: "oz"
    },
    pounds: {
        units: ["lb", "lb.", "lbs", "lbs.", "pounds", "pound", "паунд", "паунда", "паунди"],
        convert: (input) => ({value: +(input * 0.453592).toFixed(2)}),
        targetUnit: "kg"
    },
    ounces: {
        units: ["oz", "oz.", "ounce", "ounces", "ozs", "унция", "унции"],
        convert: (input) => ({value: +(input * 28.3495).toFixed(2)}),
        targetUnit: "g"
    },
    stone: {
        units: ["st", "stone", "stones", "стун", "стунове"],
        convert: (input) => ({value: +(input * 6.35029).toFixed(2)}),
        targetUnit: "kg"
    }
};
const currencyConversions = {
    aud: ["aud", "australian dollar", "aussie dollar", "aussie dollars", "australian dollars", "австралийски долар", "австралийски долари"],
    bgn: ["bgn", "bulgarian lev","lv.","lv", "лев", "лева", "левове"],
    brl: ["brl", "brazilian real", "reais", "real", "r$", "бразилско реал", "бразилски реали"],
    cad: ["cad", "canadian dollar", "canadian dollars", "ca$", "канадски долар", "канадски долари"],
    chf: ["chf", "swiss franc", "franc", "francs", "швейцарски франк", "швейцарски франкове"],
    cny: ["cny", "yuan", "renminbi", "rmb", "cn¥", "¥", "юан", "юани"],
    czk: ["czk", "czech koruna", "koruna", "kc", "kč", "чешка крона", "чешки крони"],
    dkk: ["dkk", "danish krone", "krone", "kroner", "kr", "датска крона", "датски крони"],
    eur: ["eur", "€", "euro", "euros", "евро"],
    gbp: ["gbp", "£", "quid", "британски паунд", "паундове"],
    hkd: ["hkd", "hong kong dollar", "hong kong dollars", "hk$", "хонгконгски долар", "хонгконгски долари"],
    huf: ["huf", "hungarian forint", "forint", "унгарски форинт", "форинти"],
    idr: ["idr", "indonesian rupiah", "rupiah", "rp", "индонезийска рупия", "рупии"],
    ils: ["ils", "israeli shekel", "shekel", "shekels", "₪", "nis", "израелски шекел", "шекели"],
    inr: ["inr", "₹", "rupee", "rupees", "индийска рупия", "рупии"],
    isk: ["isk", "icelandic krona", "króna", "krónur", "kr", "исландска крона", "крони"],
    jpy: ["jpy", "¥", "yen", "йена"],
    krw: ["krw", "won", "south korean won", "₩", "южнокорейски вон", "вон"],
    mxn: ["mxn", "mexican peso", "peso", "pesos", "mex$", "мексиканско песо", "песо"],
    myr: ["myr", "malaysian ringgit", "ringgit", "rm", "малайзийски рингит", "рингит"],
    nok: ["nok", "norwegian krone", "krone", "kroner", "kr", "норвежка крона", "норвежки крони"],
    nzd: ["nzd", "new zealand dollar", "kiwi dollar", "nz$", "новозеландски долар", "новозеландски долари"],
    php: ["php", "philippine peso", "peso", "pesos", "₱", "филипинско песо", "песо"],
    pln: ["pln", "polish zloty", "zloty", "zł", "полска злота", "злоти"],
    ron: ["ron", "romanian leu", "leu", "lei", "румънски лей", "лейове"],
    rub: ["rub", "russian ruble", "ruble", "₽", "руска рубла", "рубли"],
    sek: ["sek", "swedish krona", "krona", "kronor", "kr", "шведска крона", "крони"],
    sgd: ["sgd", "singapore dollar", "singapore dollars", "s$", "сингапурски долар", "долари"],
    thb: ["thb", "thai baht", "baht", "฿", "тайландски бат", "бат"],
    try: ["try", "turkish lira", "lira", "₺", "tl", "турска лира", "лири"],
    usd: ["usd", "$","us$", "dollar", "dollars", "buck", "bucks", "американски долар", "долари"],
    zar: ["zar", "south african rand", "rand", "r", "южноафрикански ранд", "рандове"]
};

let targetCurrency = "bgn";//Default currency

chrome.storage.sync.get(['targetCurrency'], function(result) {
    if (result.targetCurrency) {
        targetCurrency = result.targetCurrency.toLowerCase();
    }
});

document.addEventListener("mouseup", function (event) {
    selection = window.getSelection().toString().trim().toLowerCase();
    if (selection.length === 0) return;
    getMatches();
}, false);

document.addEventListener("selectionchange", function (event) {
    const oldTooltip = document.getElementById("hover-convert-tooltip");
    if (oldTooltip) oldTooltip.remove();
}, false)

function getMatches() {
    const regEx = "(?<!\\S)(?:(-?\\d+(?:[.,]\\d+)?)(?:\\s*)([a-zA-Z]+|[\\$\\€\\£\\¥\\₹\\₱\\₩\\\"])|([a-zA-Z]+|[\\$\\€\\£\\¥\\₹\\₱\\₩\\\"])(?:\\s*)(-?\\d+(?:[.,]\\d+)?))(?!\\S)";
    let match = selection.match(regEx);
    if (match===null) return;

    if (match[1] && match[2]) {
        originalAmount = match[1];
        originalUnit = match[2];
    } else if (match[3] && match[4]) {
        originalAmount = match[4];
        originalUnit = match[3];
    }
    convertUnit();
}

function convertUnit() {
    let fromCurrency = null;
    for (let key in currencyConversions) {
        if (currencyConversions[key].includes(originalUnit)) {
            fromCurrency = key;
            break;
        }
    }

    if (fromCurrency != null) {
        let num = parseFloat(originalAmount.replace(',', '.'));
        if(fromCurrency===targetCurrency)return;
        convertCurrency(num, fromCurrency, targetCurrency).then(res => showTooltip(res));
        return;
    }

    for (let key in conversions) {
        let unit = conversions[key];
        if (unit.units.includes(originalUnit)) {
            let num = parseFloat(originalAmount.replace(',', '.'));
            let resultUnit = unit.convert(num).value + " " + unit.targetUnit;
            showTooltip(resultUnit);
            break;
        }
    }
}

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;
    const response = await fetch(url);
    const data = await response.json();

    let rate = data[fromCurrency][toCurrency];
    let result = (amount * rate).toFixed(2);
    return `${result} ${toCurrency.toUpperCase()}`;
}

function showTooltip(text) {
    const oldTooltip = document.getElementById("hover-convert-tooltip");
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
}
