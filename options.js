document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['targetCurrency'], (result) => {
        if (result.targetCurrency) {
            document.getElementById('currency').value = result.targetCurrency;
        }
    });
});

document.getElementById('save').addEventListener('click', () => {
    const selectedCurrency = document.getElementById('currency').value;
    chrome.storage.sync.set({ targetCurrency: selectedCurrency }, () => {
        const message = document.getElementById('savedMessage');
        message.style.display = 'block';
        setTimeout(() => { message.style.display = 'none'; }, 2000);
    });
});