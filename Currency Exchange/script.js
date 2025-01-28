const API_KEY = 'cur_live_PylysUZM6FDQQa2jXoLanjWj2zoOGLZBM46RJLaj';
const API_URL = 'https://api.currencyapi.com/v3/latest';

async function convert() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value.toUpperCase();
    const toCurrency = document.getElementById('toCurrency').value.toUpperCase();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = '';
    resultDiv.textContent = '';
    if (!amount || amount <= 0) {
        errorDiv.textContent = 'Please enter a valid amount';
        return;
    }

    if (!fromCurrency || fromCurrency.length !== 3) {
        errorDiv.textContent = 'Please enter a valid 3-letter FROM currency code';
        return;
    }

    if (!toCurrency || toCurrency.length !== 3) {
        errorDiv.textContent = 'Please enter a valid 3-letter TO currency code';
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data && data.data[toCurrency]) {
            const rate = data.data[toCurrency].value;
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            errorDiv.textContent = data.message || 'Conversion failed - check currency codes';
        }
    } catch (error) {
        errorDiv.textContent = 'Error: ' + error.message;
    }
}

function swapCurrencies() {
    const from = document.getElementById('fromCurrency');
    const to = document.getElementById('toCurrency');
    [from.value, to.value] = [to.value, from.value];
    convert();
}

document.getElementById('fromCurrency').addEventListener('input', convert);
document.getElementById('toCurrency').addEventListener('input', convert);
document.getElementById('amount').addEventListener('input', convert);